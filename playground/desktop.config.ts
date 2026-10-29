import { defineDesktopConfig } from '@owdproject/nuxt'

export default defineDesktopConfig({
  theme: '@owdproject/theme-nuxt-nova',
  modules: ['@owdproject/module-nuxt-fs', '@owdproject/module-nuxt-pinia-persistence'],
  apps: ['@owdproject/app-nuxt-classic-audioplayer'],
  systemBar: { enabled: true, startButton: true },
  fs: {
    mounts: {
      '/mnt/test': '/test-small.zip',
    },
  },
})
