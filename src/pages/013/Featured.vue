
<script setup lang="ts">

</script>
<template>
  <section class="featured-section" data-scroll-section>
    <div class="featured-row-layout">
      <h6>green</h6>
      <img src="https://images.unsplash.com/photo-1543459176-4426b37223ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="">
    </div>
    <div class="featured-column-layout">
      <h6>lily</h6>
      <img src="https://images.unsplash.com/photo-1531875456634-3f5418280d20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="">
    </div>
  </section>
</template>

<style scoped lang="less">
.featured-section{
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  img{
    clip-path: inset(0 0 0 0);
  }
  h6{
    color: black;
    font-size: 22px;
    text-transform: uppercase;
    font-weight: 500;
  }
  .featured-row-layout,
  .featured-column-layout{
   display: grid;
   gap: 10px;
  }
  .featured-row-layout{
    grid-template-rows: repeat(2,auto);
    img{
      width: 100%;
      object-fit: cover;
    }
  }
  .featured-column-layout{
    grid-template-columns: 100px auto;
    align-items: flex-end;
    img{
      width: 100%;
      height: 125vh;
      object-fit: cover;
    }
    h6{
      transform: translateX(100%) rotate(-90deg);
      transform-origin: left bottom;
      justify-self: self-end;
    }
  }
}
</style>
