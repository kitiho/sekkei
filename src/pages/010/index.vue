<script setup lang="ts">
import type { CursorLook } from '~/composables/cursor'
import { useCustomCursor } from '~/composables/cursor'
const state = useCustomCursor().state
const cursorRef = ref()
const secondaryCursorRef = ref()
const positonRef = ref({
  mouseX: 0,
  mouseY: 0,
  destinationX: 0,
  destinationY: 0,
  distanceX: 0,
  distanceY: 0,
  key: -1,
})
onMounted(() => {
  document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event
    const mouseX = clientX - cursorRef.value.clientWidth / 2
    const mouseY = clientY - cursorRef.value.clientHeight / 2
    positonRef.value.mouseX = clientX - secondaryCursorRef.value.clientWidth / 2
    positonRef.value.mouseY = clientY - secondaryCursorRef.value.clientHeight / 2
    cursorRef.value.style.transform = `translate3d(${mouseX}px, ${mouseY}px,0)`
  })

  const followMouse = () => {
    positonRef.value.key = requestAnimationFrame(followMouse)
    const { mouseX, mouseY, destinationX, destinationY, distanceX, distanceY } = positonRef.value
    if (!destinationX || !destinationY) {
      positonRef.value.destinationX = mouseX
      positonRef.value.destinationY = mouseY
    }
    else {
      positonRef.value.distanceX = (mouseX - destinationX) * 0.1
      positonRef.value.distanceY = (mouseY - destinationY) * 0.1
      if (Math.abs(positonRef.value.distanceX) + Math.abs(positonRef.value.distanceY) < 0.1) {
        positonRef.value.destinationX = mouseX
        positonRef.value.destinationY = mouseY
      }
      else {
        positonRef.value.destinationX += distanceX
        positonRef.value.destinationY += distanceY
      }
    }
    secondaryCursorRef.value.style.transform = `translate3d(${positonRef.value.destinationX}px, ${positonRef.value.destinationY}px,0)`
  }
  followMouse()
})
function handleMouseEnter(type: CursorLook) {
  state.type = type
}
function handleMouseLeave() {
  state.type = 'default'
}
</script>
<template>
  <div ref="cursorRef" :class="`cursor ${state.type}`">
    <div class="cursorBg" />
  </div>
  <div ref="secondaryCursorRef" :class="`secondaryCursor ${state.type}`">
    <div class="secondaryCursorBg" />
  </div>
  <div
    class="triggerItem" w-60 h-60 bg-pink @mouseenter="handleMouseEnter('hamburger')"
    @mouseleave="handleMouseLeave"
  />
  <div class="triggerItem" w-60 h-60 bg-blue @mouseenter="handleMouseEnter('drag')" @mouseleave="handleMouseLeave" />
</template>

<style scoped lang="less">
.cursor {

  position: fixed;
  pointer-events: none;
  z-index: 1000;
  transform: translate3d(0, 0, 0);
  transition: opacity 1s cubic-bezier(0.77, 0, 0.175, 1);
  animation: fadeIn 1s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;

  .cursorBg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: black;
    mix-blend-mode: difference;

    &:after,
    &:before {
      content: '';
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: white;
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      animation: fadeOut 0.75s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;
    }

    &:before {
      left: 10px
    }

    &:after {
      right: 10px
    }
  }

}

.secondaryCursor {
  position: fixed;
  pointer-events: none;
  overflow: hidden;
  z-index: 1000;
  transform: translate3d(0, 0, 0);

  .secondaryCursorBg {
    width: 80px;
    height: 80px;
    border: 1px solid black;
    border-radius: 50%;
    position: relative;

  }
}

.hamburger {
  .secondaryCursorBg {
    animation: fadeOut 1s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;
  }

  .cursorBg {
    animation: scaleUp 1s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;
  }
}

.drag {
  .cursorBg {
    animation: scaleUp 1s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;

    &:after {
      animation: bgUp 1s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards, translateRightDot 1s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;
    }
    &:before {
      animation: bgUp 1s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards, translateLeftDot 1s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;
    }
  }

  .secondaryCursorBg {
    animation: fadeOut 1s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;
  }

}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes scaleUp {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.3);
  }
}

@keyframes bgUp {
  from {
    background-color: transparent;
  }

  to {
    background-color: white;
  }
}

@keyframes translateLeftDot {
  from {
    transform: translate(20px, -50%);
  }

  to {
    transform: translate(0, -50%);
  }
}

@keyframes translateRightDot {
  from {
    transform: translate(-20px, -50%);
  }

  to {
    transform: translate(0, -50%);
  }
}
</style>
