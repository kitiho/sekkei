<script setup lang="ts">
let items = $ref([
  {
    id: 1,
    name: '111',
    age: 20,
  },
  {
    id: 2,
    name: '222',
    age: 30,
  },
  {
    id: 3,
    name: '333',
    age: 40,
  },
  {
    id: 4,
    name: '444',
    age: 50,
  },

])
const menuItemsRef = ref()
function cloneItems() {
  const itemHeight = menuItemsRef.value.children[0].offsetHeight
  const fitMax = Math.ceil(window.innerHeight / itemHeight)
  const clonedItems = [...items].filter((item, index) => index < fitMax)
  items = [...items, ...clonedItems]
  return clonedItems.length * itemHeight
}
function getScollPos() {
  return (menuItemsRef.value.pageYOffset || menuItemsRef.value.scrollTop) - (menuItemsRef.value.clientTop || 0)
}
function setScrollPos(pos: number) {
  menuItemsRef.value.scrollTop = pos
}
function initScroll() {
  const scrollPos = getScollPos()
  if (scrollPos <= 0)
    setScrollPos(1)
}
onMounted(() => {
  const clonesHeight = cloneItems()
  menuItemsRef.value.style.scrollBehavior = 'unset'

  function scrollUpdate() {
    const scrollPos = getScollPos()
    if (clonesHeight + scrollPos >= menuItemsRef.value.scrollHeight)
      setScrollPos(1)
    else if (scrollPos <= 0)
      setScrollPos(menuItemsRef.value.scrollHeight - clonesHeight - 1)
  }
  menuItemsRef.value.addEventListener('scroll', scrollUpdate)
  initScroll()
})
</script>
<template>
  <ul ref="menuItemsRef" class="container">
    <li v-for="item in items" :key="item.id" class="item">
      {{ item.name }}
    </li>
  </ul>
</template>

<style scoped>
.item {
  height: 300px;
  font-size: 30px;
  padding: 20px;
  background-color: antiquewhite;
}

.item:nth-child(2n) {
  background-color: lightblue;
}

.container {
  min-width: 100vw;
  height: 100vh;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  display: none;
}
</style>
