<script setup lang="ts">
const scrollYPos = ref((window.scrollY || window.pageYOffset) as number)
onMounted(() => {
  function onScroll() {
    scrollYPos.value = (window.scrollY || window.pageYOffset) as number
  }
  window.addEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="page-wrapper" bg-dark text-white w-100vw h-200vh overflow-hidden relative>
    <div class="text-parent">
      <h1 :style="`transform: translate3d(-${scrollYPos / 2}px,-${scrollYPos * 0.1}px,0px)`">
        Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Possimus, temporibus.
      </h1>
      <h1 :style="`transform: translate3d(${scrollYPos / 2}px,-${scrollYPos * 0.1}px,0px)`">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda molestias consequuntur similique animi
        corrupti?
      </h1>
    </div>
    <img
      :style="`transform: translate3d(-50%,calc(-${scrollYPos * 0.9}px - 50%),0px)`"
      src="https://images.unsplash.com/photo-1658328083158-ef20b9fa9446?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      alt=""
    >
    <div class="text-parent">
      <h1 class="outlineText" :style="`transform: translate3d(-${scrollYPos / 2}px,-${scrollYPos * 0.1}px,0px)`">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, temporibus.
      </h1>
      <h1 class="outlineText" :style="`transform: translate3d(${scrollYPos / 2}px,-${scrollYPos * 0.1}px,0px)`">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda molestias consequuntur similique animi
        corrupti?
      </h1>
    </div>
  </div>
</template>

<style scoped lang="less">
.page-wrapper {
  img {
    position: absolute;
    min-height: 50%;
    object-fit: contain;
    top: 45%;
    left: 50%;
    z-index: 2;
  }

  .text-parent {
    position: absolute;
    top: 25%;

    &:first-of-type {
      z-index: 1;
    }

    &:last-of-type {
      z-index: 3;
    }
  }

  h1 {
    line-height: 110%;
    font-size: 8.1vw;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.01rem;
    font-weight: bold;
    font-family: sequel, sans-serif;

    &.outlineText {
      color: transparent;
      -webkit-text-stroke: 3px #fff;
    }

    &:last-of-type {
      margin-left: -30%;
    }
  }
}
</style>
