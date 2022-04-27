<script setup lang="ts">
import { isDark } from '~/composables'

const init = () => {
  const featuresEl = document.querySelector('.features')
  const featureEls = document.querySelectorAll('.feature')
  featuresEl!.addEventListener('pointermove', (ev) => {
    featureEls.forEach((featureEl) => {
      const rect = featureEl.getBoundingClientRect();
      (featureEl as HTMLElement).style.setProperty('--x', `${(ev as MouseEvent).clientX - rect.left}`);
      (featureEl as HTMLElement).style.setProperty('--y', `${(ev as MouseEvent).clientY - rect.top}`)
    })
  })
}
onMounted(() => {
  isDark.value = true
  init()
})
</script>
<template>
  <div w-full h-full flex="~" items-center justify-center>
    <div class="features">
      <div class="feature">
        <a href="#" class="feature-content">
          <strong>Some feature</strong>
          <span>Description of the awesome feature</span>
        </a>
      </div>
      <div class="feature">
        <a href="#" class="feature-content">
          <strong>Some feature</strong>
          <span>Description of the awesome feature</span>
        </a>
      </div>
      <div class="feature">
        <a href="#" class="feature-content">
          <strong>Some feature</strong>
          <span>Description of the awesome feature</span>
        </a>
      </div>
      <div class="feature">
        <a href="#" class="feature-content">
          <strong>Some feature</strong>
          <span>Description of the awesome feature</span>
        </a>
      </div>
      <div class="feature">
        <a href="#" class="feature-content">
          <strong>Some feature</strong>
          <span>Description of the awesome feature</span>
        </a>
      </div>
      <div class="feature">
        <a href="#" class="feature-content">
          <strong>Some feature</strong>
          <span>Description of the awesome feature</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.features {
  width: 75vw;
  height: 50vh;
  display: grid;
  grid-column-gap: 0.3rem;
  grid-row-gap: 0.3rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.feature {
  --x-px: calc(var(--x) * 1px);
  --y-px: calc(var(--y) * 1px);
  --border: 2px;
  background: rgba(255, 255, 255, 0.125);
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.feature:before,
.feature:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  inset: 0px;
  border-radius: inherit;
  background: radial-gradient(800px circle at var(--x-px) var(--y-px),
      rgba(255, 255, 255, 0.3),
      transparent 40%);
}

.feature:before {
  z-index: 1;
}

.feature:after {

  opacity: 0;
  z-index: 2;
  transition: opacity 0.4s ease;
}

.feature:hover:after {
  opacity: 1;
}

.feature-content {
  background: rgb(19, 19, 21);
  border-radius: inherit;
  color: white;
  text-decoration: none;
  z-index: 1;
  position: absolute;
  inset: var(--border);
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 0.5rem;
  padding: 0 1rem 0 2rem;
}

.feature-content>strong {
  align-self: self-end;
  font-size: 125%;
}

.feature-content>span {
  opacity: 0.7;
}
</style>
