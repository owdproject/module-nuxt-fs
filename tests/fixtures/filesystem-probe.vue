<script setup lang="ts">
const content = ref('OWD filesystem test')
const status = ref('initializing')
const path = '/home/Guest/Documents/owd-filesystem-smoke.txt'
const nuxtApp = useNuxtApp()

async function load() {
  try {
    const vfs = (nuxtApp as any).$vfs
    if (!vfs?.isInitialized) throw new Error('VFS unavailable')
    if (await vfs.exists(path)) content.value = String(await vfs.readFile(path, 'utf8'))
    status.value = 'ready'
  } catch (error) {
    status.value = 'error: ' + String(error)
  }
}

async function save() {
  try {
    const vfs = (nuxtApp as any).$vfs
    await vfs.mkdir('/home/Guest/Documents', { recursive: true })
    await vfs.writeFile(path, content.value)
    status.value = 'saved'
  } catch (error) {
    status.value = 'error: ' + String(error)
  }
}

onMounted(load)
</script>

<template>
  <Desktop />
  <section style="position:fixed;z-index:99999;right:16px;top:16px;padding:16px;background:white;color:black;border:2px solid #222;max-width:360px">
    <strong>Filesystem test</strong>
    <p data-test="status">{{ status }}</p>
    <input v-model="content" data-test="content" aria-label="Test file content">
    <button data-test="save" @click="save">Save file</button>
    <button data-test="read" @click="load">Read file</button>
    <p>Test file: {{ path }}</p>
  </section>
</template>
