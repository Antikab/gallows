<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  word: string
  correctLetters: string[]
  addLetter: (letter: string) => void
  isDisplayInput: boolean
}

const { word, correctLetters, addLetter, isDisplayInput } = defineProps<Props>()

const inputLetter = ref<string>('')
const maxInputLength = 1
const onInput = () => {
  // Не делаем ничего при каждом вводе, дожидаемся события change
}

const onChange = () => {
  if (inputLetter.value.length === maxInputLength) {
    addLetter(inputLetter.value)
    inputLetter.value = ''
  }
}

const isMobileOrTablet = ref<boolean>(false)

onMounted(() => {
  isMobileOrTablet.value =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(hover: none)').matches
})
</script>

<template>
  <div class="word">
    <span v-for="(letter, index) in word" :key="index" class="letter">
      {{ correctLetters.includes(letter) ? letter : '' }}
    </span>

    <div v-if="isMobileOrTablet && isDisplayInput" class="input-container">
      <input
        type="text"
        :value="inputLetter"
        @input="onInput"
        @change="onChange"
        maxlength="1"
        placeholder="'а'"
        class="input"
      />
    </div>
  </div>
</template>
