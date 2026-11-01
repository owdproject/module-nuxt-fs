import assert from 'node:assert/strict'
import { test } from 'node:test'
import { chromium } from 'playwright'

test('standalone desktop reads and persists a browser filesystem file', { timeout: 60_000 }, async () => {
  const url = process.env.OWD_FS_TEST_URL
  assert.ok(url, 'Set OWD_FS_TEST_URL to the isolated playground URL; see tests/README.md')
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.OWD_TEST_BROWSER ? { executablePath: process.env.OWD_TEST_BROWSER } : {}),
    ...(process.env.OWD_TEST_NO_SANDBOX === '1' ? { args: ['--no-sandbox'] } : {}),
  })
  try {
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    const waitForStatus = async (expected) => {
      await page.waitForFunction((value) => {
        const status = document.querySelector('[data-test="status"]')?.textContent ?? ''
        return status === value || status.startsWith('error:')
      }, expected, { timeout: 20_000 })
      assert.equal(await page.locator('[data-test="status"]').innerText(), expected)
    }

    await page.goto(url, { waitUntil: 'load' })
    await waitForStatus('ready')
    const contents = `OWD filesystem smoke ${Date.now()}`
    await page.locator('[data-test="content"]').fill(contents)
    await page.locator('[data-test="save"]').click()
    await waitForStatus('saved')
    await page.reload({ waitUntil: 'load' })
    await waitForStatus('ready')
    assert.equal(await page.locator('[data-test="content"]').inputValue(), contents)
    await page.locator('[data-test="content"]').fill('unsaved change')
    await page.locator('[data-test="read"]').click()
    await waitForStatus('ready')
    assert.equal(await page.locator('[data-test="content"]').inputValue(), contents)
    await page.getByRole('button', { name: /Applications/ }).click()
    await page.getByRole('menuitem', { name: 'About' }).click()
    await page.getByRole('heading', { name: 'Open Web Desktop' }).waitFor({ state: 'visible', timeout: 10_000 })
    assert.deepEqual(errors, [], `Browser errors: ${errors.join('; ')}`)
  } finally {
    await browser.close()
  }
})
