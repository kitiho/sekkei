<script setup lang="ts">
import Navbar from './Navbar.vue'
import Header from './Header.vue'
import CustomCursor from './CustomCursor.vue'
import Featured from './Featured.vue'
import About from './About.vue'
import Galery from './Galery.vue'
import Footer from './Footer.vue'

const preloader = ref(true)
const timer = ref(3)
const id = ref()
function clear() {
  window.clearInterval(id.value)
  preloader.value = false
}
watch(timer, (value) => {
  if (value === 0)
    clear()
})
onMounted(() => {
  id.value = window.setInterval(() => {
    timer.value = timer.value - 1
  }, 1000)
})
</script>
<template>
  <CustomCursor />
  <div v-if="preloader" class="loader-wrapper" fixed top-0 right-0 bottom-0 left-0 bg-dark z-1>
    <h1>Flirty flowers</h1>
    <h2>Chong Qing</h2>
  </div>
  <div v-else class="main-container" bg="#f5f0ec" data-scroll-container>
    <Navbar />
    <Header />
    <Featured />
    <About />
    <Galery />
    <Footer />
  </div>
</template>

<style scoped lang="less">
.main-container {
  padding: 0 5vw;
}
</style>
<style lang="less">
section {
  padding: 100px 0;

  .section-header {
    margin-bottom: 50px;
  }
}

.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #191919;
  color: #dbd8b6;

  h1 {
    font-size: 1.5vw;
    text-transform: uppercase;
    font-family: 'Bai Jamjuree', sans-serif;
    font-weight: 600;
  }

  h2 {
    font-size: 1.5vw;
    text-transform: uppercase;
    font-family: 'Bodoni Moda', sans-serif;
    font-style: italic;
    margin-top: 10px;
  }
}
</style>
