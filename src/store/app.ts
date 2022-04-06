import { defineStore } from 'pinia'
interface Project {
  id: number
  name: string
}
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      projects: [
        {
          id: 1,
          name: 'plum blossom',
        },
        {
          id: 2,
          name: 'Risograph Grain Light Effect',
        },
      ] as Project[],
    }
  },
})
