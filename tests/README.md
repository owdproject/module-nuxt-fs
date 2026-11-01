# Browser filesystem smoke test

Run this against an isolated Nuxt 4 playground using local packed snapshots from Verdaccio. Its dependency graph must contain `@owdproject/nuxt`, `@owdproject/nuxt-module-fs`, a compatible Paper theme and the About app; it must not contain either desktop distribution. Configure the theme, filesystem module and About app in `desktop.config.ts`.

Copy `fixtures/filesystem-probe.vue` into the temporary playground's `app/pages/index.vue` and render `<NuxtPage />` in `app/app.vue`. Start the playground, then from this repository run:

```sh
OWD_FS_TEST_URL=http://127.0.0.1:4177/ npm run test:browser
```

Install the repository's dev dependencies and a Playwright Chromium browser first. If necessary, set `OWD_TEST_BROWSER` to a local Chromium-compatible executable. `OWD_TEST_NO_SANDBOX=1` is available for isolated environments that require it.

The test writes a disposable virtual file, reloads the same browser profile, reads it again and opens the About window. It uses a fresh browser context and closes it afterwards. It does not verify a file-manager app, real OS files, other themes or published npm versions.
