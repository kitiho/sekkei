import { defineStore } from 'pinia'
interface Project {
  id: number
  name: string
}
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      projects: [{
        id: 1,
        name: 'plum blossom',
      }] as Project[],
    }
  },
})
