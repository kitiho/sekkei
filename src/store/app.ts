import { defineStore } from 'pinia'
import { projects } from '~/constants'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      projects,
    }
  },
})
