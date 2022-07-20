<script setup lang="ts">
/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
const EasingFunctions = {
  // no easing, no acceleration
  linear: t => t,
  // accelerating from zero velocity
  easeInQuad: t => t * t,
  // decelerating to zero velocity
  easeOutQuad: t => t * (2 - t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  // accelerating from zero velocity
  easeInCubic: t => t * t * t,
  // decelerating to zero velocity
  easeOutCubic: t => (--t) * t * t + 1,
  // acceleration until halfway, then deceleration
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // accelerating from zero velocity
  easeInQuart: t => t * t * t * t,
  // decelerating to zero velocity
  easeOutQuart: t => 1 - (--t) * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  // accelerating from zero velocity
  easeInQuint: t => t * t * t * t * t,
  // decelerating to zero velocity
  easeOutQuint: t => 1 + (--t) * t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuint: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
}

function getValue(start, end, elapsed, duration, easeMethod) {
  if (elapsed > duration) return end
  return start + (end - start) * EasingFunctions[easeMethod](elapsed / duration)
}

function animate({
  fromValue,
  toValue,
  onUpdate,
  onComplete,
  duration = 600,
  easeMethod = 'linear',
}) {
  const startTime = performance.now()
  const tick = () => {
    const elapsed = performance.now() - startTime
    requestAnimationFrame(() => {
      return onUpdate(
        getValue(fromValue, toValue, elapsed, duration, easeMethod),
        // callback
        elapsed <= duration ? tick : onComplete,
      )
    })
  }
  tick()
}
let opacity = $ref(1)
function handleOpacity() {
  animate({
    fromValue: 0,
    toValue: 1,
    onUpdate: (newValue, callback) => {
      opacity = newValue
      callback()
    },
    onComplete: () => { },
    duration: 600,
    easeMethod: 'easeInOutCubic',
  })
}
</script>
<template>
  <div flex flex-col justify-center items-center pt-16>
    <div btn mb-4 @click="handleOpacity">
      animate
    </div>
    <div :style="{ opacity }" w-30 h-30 bg-green />
  </div>
</template>

<style scoped>
</style>
