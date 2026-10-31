import { defineDesktopConfig } from '@owdproject/nuxt'

export default defineDesktopConfig({
  theme: '@owdproject/nuxt-theme-paper',
  modules: ['@owdproject/nuxt-module-fs', '@owdproject/nuxt-module-pinia-persistence'],
  apps: ['@owdproject/nuxt-app-classic-audioplayer'],
  systemBar: { enabled: true, startButton: true },
  fs: {
    mounts: {
      '/mnt/test': '/test-small.zip',
    },
  },
})
