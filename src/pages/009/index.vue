<script setup lang="ts">

</script>
<template>
  <div class="wrapper">
    <h1 class="text" font-mono text-8xl mt-50 flex items-center justify-center>
      Hello World
    </h1>
    <h1 class="text clone" font-mono text-8xl mt-50 flex items-center justify-center>
      Hello World
    </h1>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  position: relative;
}

.text {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;

  &.clone {
    pointer-events: none;
    color: black;
    clip-path: inset(0 100% 0 0);
    transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);

  }

  &:not(.clone) {
    -webkit-text-stroke: 1px rgba(0, 0, 0, .25);
    color: transparent;

    &:hover {
      cursor: pointer;

      ~.clone {
        clip-path: inset(0 0 0 0);
      }
    }
  }
}
</style>
