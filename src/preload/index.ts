import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('wrytedown', {
  // Will be populated in later tasks
})
