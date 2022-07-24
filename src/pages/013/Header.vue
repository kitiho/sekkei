<script setup lang="ts">

</script>
<template>
  <section class="header-container" data-scroll-section>
    <ul class="header-menu">
      <li>Intro</li>
      <li>About</li>
      <li>Featured</li>
    </ul>
    <h1 id="header-text">
      Art Objects
    </h1>
  </section>
</template>

<style scoped lang="less">
.header-container {
  position: relative;

  .header-menu {
    position: absolute;
    left: 0;
    top: 100px;
    letter-spacing: 1px;
    font-family: 'Syncopate', sans-serif;
    color: #626262;
    text-transform: uppercase;
    font-weight: 600;
    li {
      margin: 10px 0;
    }
  }

  #header-text {
    color: black;
    font-size: 20vw;
    text-transform: uppercase;
    text-align: center;
    font-family: 'Bai Jamjuree', sans-serif;
    font-weight: 600;
    line-height: 1;
  }
}

</style>
