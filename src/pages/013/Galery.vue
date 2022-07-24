<script setup lang="ts">
import GalleryItem from './GalleryItem.vue'
const galeryData = [
  {
    src: 'https://images.unsplash.com/photo-1658261783616-c0f76cdddaf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Golden Photos',
    subtitle: 'Living Room',
    category: 'Shooting / Adv.Campaing',
  },
  {
    src: 'https://images.unsplash.com/photo-1657905041924-ffa7ab898773?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1533&q=80',
    title: 'Golden Photos',
    subtitle: 'Living Room',
    category: 'Shooting / Adv.Campaing',
  },
  {
    src: 'https://images.unsplash.com/photo-1532775946639-ebb276eb9a1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Golden Photos',
    subtitle: 'Living Room',
    category: 'Shooting / Adv.Campaing',
  },
  {
    src: 'https://images.unsplash.com/photo-1652110770901-e4a4f279951c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    title: 'Golden Photos',
    subtitle: 'Living Room',
    category: 'Shooting / Adv.Campaing',
  },
]
const activeImage = ref(0)
</script>
<template>
  <section class="section-wrapper gallery-wrap" data-scroll-section>
    <div class="gallery" relative>
      <div class="gallery-counter">
        <span>{{ activeImage }}</span>
        <div class="divider" />
        <span>{{ galeryData.length }}</span>
      </div>
      <GalleryItem
        v-for="(item, index) in galeryData" :key="item.src" :src="item.src" :category="item.category"
        :title="item.title" :subtitle="item.subtitle" :index="index"
        @update-active-image="(index) => activeImage = index + 1"
      />
    </div>
  </section>
</template>

<style scoped lang="less">
.gallery-wrap {
  background-color: #d53f41;
  margin-left: -5vw;
  margin-right: -5vw;

  .gallery-counter {
    position: absolute;
    top: 10%;
    left: 100px;
    z-index: 1;
    mix-blend-mode: difference;
    line-height: 16px;
    color: #dbd8d6;
    font-family: 'Bai Jamjuree', sans-serif;
    font-weight: 600;
    font-size: 16px;
    display: inline-block;

    .divider {
      content: "";
      background-color: white;
      width: 6.25vw;
      margin: 7px 10px;
      height: 1px;
      display: block;
    }
  }
  .gallery{
    height: 80vh;
    padding: 10vh 0;
    width: 400%;
    display: flex;
    flex-wrap: nowrap;
  }

}
</style>
