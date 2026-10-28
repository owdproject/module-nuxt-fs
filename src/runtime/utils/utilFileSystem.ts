import { useRuntimeConfig } from 'nuxt/app'
import {
  getAppByFilename as getAppByFilenameCore,
  getFilename as getFilenameCore,
  getFileExtension,
} from '@owdproject/fs'

export function getAppByFilename(filename: string): string | null {
  const runtimeConfig = useRuntimeConfig()
  const desktop = runtimeConfig.public.desktop as {
    fs?: { fileAssociations?: Record<string, string> }
  }
  const associations = desktop?.fs?.fileAssociations ?? {}

  return getAppByFilenameCore(filename, associations)
}

export function getFilename(path: string): string | null {
  return getFilenameCore(path)
}

export { getFileExtension }
