<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  word: string
  correctLetters: string[]
  addLetter: (letter: string) => void
  isDisplayInput: boolean
}

const { word, correctLetters, addLetter, isDisplayInput } = defineProps<Props>()

// const inputLetter = ref<string>('')
// const maxInputLength = 1
// const onInput = () => {
//   if (inputLetter.value.length === maxInputLength) {
//     addLetter(inputLetter.value)
//     inputLetter.value = ''
//   }
// }

const letter = ref<null | string>(null)

const isMobileOrTablet = ref<boolean>(false)

onMounted(() => {
  isMobileOrTablet.value =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(hover: none)').matches
})

watch(letter, (newValue) => {
  if (!newValue) return
  const firstLetter = newValue.slice(0, 1)
  addLetter(firstLetter)
  letter.value = null
})
</script>

<template>
  <div class="word">
    <span v-for="(letter, index) in word" :key="index" class="letter">
      {{ correctLetters.includes(letter) ? letter : '' }}
    </span>

    <div v-if="isMobileOrTablet && isDisplayInput" class="input-container">
      <input type="text" maxlength="1" placeholder="'а'" class="input" v-model="letter" />
    </div>
  </div>
</template>
