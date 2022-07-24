<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
const title = computed(() => props.title)
</script>
<template>
  <h6 class="section-header">
    {{ title }}
  </h6>
</template>

<style scoped lang="less">
.section-header {
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  font-family: 'Syncopate', sans-serif;
  color: #626262;
  margin-bottom: 30px;
}
</style>
