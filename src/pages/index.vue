<script setup lang="ts">
import { useAppStore } from '~/store'
const appStore = useAppStore()
const projects = computed(() => appStore.projects)

// 格式化Id，添加零
function formatId(id: number) {
  return id < 10 ? `00${id}` : id < 100 ? `0${id}` : id
}
const title = 'sekkei（設計）１００'
</script>
<template>
  <div>
    <Cloud />
    <div absolute left-0 top-0 w-full h-full p-40 z-2>
      <div w-full text="left" font-mono mb-2 mb-4 text-2xl font-bold>
        {{ title }}
      </div>
      <div flex="~" flex-wrap justify-between text-xl class="w-500px">
        <a
          v-for="project in projects" :key="project.id" w-full block mr-4 mb-3 font-400 cursor-pointer class="group"
          :href="`/${formatId(project.id)}`"
        >
          <span group-hover:text-gray-500 text="black/80" mr-2 font-mono transition>{{ formatId(project.id) }}</span>
          <b group-hover:text-gray-500 text="black/80" transition>{{ project.name }}</b>
        </a>
      </div>
    </div>
  </div>
</template>
<style  scoped>
</style>
