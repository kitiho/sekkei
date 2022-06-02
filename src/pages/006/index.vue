<script setup lang="ts">

</script>

<template>
  <div class="outer" bg-dark>
    <div class="wrapper">
      <div class="curtain">
        <div class="invertCurtain">
          <h2 class="title">
            Section title
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper {
  overflow: auto;
  width: 800px;
  height: var(--minh);
}

.wrapper::-webkit-scrollbar {
  display: none;
}

.curtain {
  /** create the "split" background **/
  background-image: linear-gradient(to bottom, var(--color2) 50%, var(--color1) 50%);
}

.curtain::after {
  content: "";
  display: block;
  min-height: var(--minh);
}

.invertCurtain {
  position: sticky;
  top: 0px;
  mix-blend-mode: difference;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--minh);
}

.title {
  color: var(--color1);
  font-size: 40px;
}
</style>
<style>
:root {
  --minh: 500px;
  --color1: wheat;
  --color2: midnightblue;
}
</style>
