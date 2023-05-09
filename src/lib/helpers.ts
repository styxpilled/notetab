import { persisted } from 'svelte-local-storage-store'

export interface Tabs {
  [key: string]: Tab
}

export interface Tab {
  // key: string,
  value: string
}

export const tabs = persisted<Tabs>('tabs', {})

export const currentTab = persisted('current', '');