export type { FsRecentFileEntry } from '@owdproject/fs'
export {
  vfsDirname,
  vfsBasename,
  resolveRecentFilesPath,
  readRecentFilesRegistry,
  writeRecentFilesRegistry,
  buildRecentEntry,
  upsertRecentEntry,
  filterRecentEntries,
} from '@owdproject/fs'
