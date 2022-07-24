<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  updateActiveImage: {
    type: Function,
    default: (index: number) => { },
  },
  index: {
    type: Number,
    default: 0,
  },
})
// const {src,subtitle} = toRefs(props)
</script>
<template>
  <div class="gallery-item-wrapper" data-scroll-section>
    <div />
    <div class="gallery-item">
      <div class="gallery-item-info">
        <h1 class="gallery-info-title">
          {{ title }}
        </h1>
        <h6 class="gallery-info-subtitle">
          {{ subtitle }}
        </h6>
        <p class="gallery-info-category">
          {{ category }}
        </p>
      </div>
      <div class="gallery-item-image" :style="{ backgroundImage: `url(${src})` }" />
    </div>
  </div>
</template>

<style scoped lang="less">
.gallery-item {
  width: 100%;
  height: 100%;
  position: relative;
  will-change: transform;
}

.gallery-item-info {
  position: absolute;
  bottom: 10%;
  z-index: 1;
  transform: translateX(-20%);
  color: #dbd8d6;

  .gallery-info-title {
    line-height: 6vw;
    font-family: 'Bai jamjuree', sans-serif;
    font-weight: 600;
    font-size: 6vw;
  }

  .gallery-info-subtitle {
    position: relative;
    line-height: 6vw;
    font-family: 'Bodoni Moda', sans-serif;
    color: transparent;
    font-weight: 400;
    font-size: 6vw;
    -webkit-text-stroke: 2px #dbd8d6;
  }

  .gallery-info-category {
    position: relative;
    line-height: 24px;
    font-family: 'Bai Jamjuree', sans-serif;
    font-weight: 400;
    font-size: 24px;
    margin-top: 2vh;
  }
}

.gallery-item-wrapper {
  aspect-ratio: 16/9;
  height: 100%;
  display: grid;
  grid-template-columns: 20vw 1fr 200px;
  width: 100vw;
}

.gallery-item-image {
  background-size: cover;
  background-position: center;
  transform-origin: center;
  width: 100%;
  height: 100%;
  will-change: transform;
  transform: scale(1);
}
</style>
