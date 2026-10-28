import { defineNuxtPlugin } from 'nuxt/app'
import { createVirtualFileSystem } from '@owdproject/fs'
import { watch } from 'vue'
import { useDesktopShellIdentity } from 'nuxt-desktop/runtime/composables/useDesktopShellIdentity'

export default defineNuxtPlugin({
  name: 'desktop-plugin-fs',
  async setup(nuxtApp) {
    const desktopConfig = nuxtApp.$config.public.desktop as Record<string, any>
    const config = (desktopConfig?.fs ?? {}) as Record<string, any>

    const baseURL =
      (typeof nuxtApp.$config?.app?.baseURL === 'string' && nuxtApp.$config.app.baseURL) ||
      '/'

    const vfs = await createVirtualFileSystem({
      mounts: config.mounts,
      folders: config.folders,
      explorerFolders: desktopConfig.explorer,
      fileAssociations: config.fileAssociations,
      baseURL,
      fetchFn: typeof fetch !== 'undefined' ? fetch : undefined,
    })

    const { userHome } = useDesktopShellIdentity()

    // Prepare initial folders
    await vfs.prepareFoldersForHome(userHome.value)

    // Watch for future userHome updates (e.g. login)
    watch(userHome, async (newHome) => {
      if (newHome) {
        await vfs.prepareFoldersForHome(newHome)
      }
    })

    return {
      provide: {
        vfs,
      },
    }
  },
})
