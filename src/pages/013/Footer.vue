<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'

</script>
<template>
  <section class="footer" data-scroll-section>
    <SectionHeader title="Made in" />
    <h1 id="location-text" class="location">
      Chong Qing
    </h1>
  </section>
</template>

<style scoped lang="less">
.footer{
  text-align: center;
  padding-bottom: 200px;
  .location{
    font-size: 18vw;
    text-transform: uppercase;
    font-family: 'Bodoni Moda',sans-serif;
    color: black;
  }
}
</style>
