<script setup lang="ts">
import GameHeader from './components/GameHeader.vue'
import GameFigure from './components/GameFigure.vue'
import GameWrongLetters from './components/GameWrongLetters.vue'
import GameWord from './components/GameWord.vue'
import GamePopap from './components/GamePopap.vue'
import GameNotification from './components/GameNotification.vue'
import { ref, watch } from 'vue'
import { useRandomWord } from './composables/useRandomWord'
import { useLetters } from './composables/useLetters'
import { useNotification } from './composables/useNotification'

const { word, getRandomWord } = useRandomWord()
const { letters, correctLetters, wrongLetters, isLose, isWin, addLetter, resetLetters } =
  useLetters(word)

const { notification, showNotification } = useNotification()
const popup = ref<InstanceType<typeof GamePopap> | null>(null)
const restart = async () => {
  await getRandomWord()
  resetLetters()
  popup.value?.close()
  isDisplayInput.value = true
}
const isDisplayInput = ref<boolean>(true)

watch(wrongLetters, () => {
  if (isLose.value) {
    popup.value?.open('lose')
    isDisplayInput.value = false
  }
})

watch(correctLetters, () => {
  if (isWin.value) {
    popup.value?.open('win')
    isDisplayInput.value = false
  }
})

window.addEventListener('keydown', ({ key }) => {
  const lowerCaseKey = key.toLowerCase()
  const isMobileOrTablet = ref<boolean>(false)

  if (isMobileOrTablet.value) {
    return
  }

  if (isLose.value || isWin.value) {
    return
  }

  if (letters.value.includes(lowerCaseKey)) {
    showNotification()
    return
  }

  addLetter(lowerCaseKey)
})
</script>

<template>
  <GameHeader />
  <div>
    <div class="game-container">
      <GameFigure :wrong-letters-count="wrongLetters.length" />
      <GameWord
        :add-letter="addLetter"
        :word="word"
        :correct-letters="correctLetters"
        :is-display-input="isDisplayInput"
      />
      <GameWrongLetters :wrong-letters="wrongLetters" />
    </div>
    <GamePopap ref="popup" :word="word" @restart="restart" />
    <GameNotification ref="notification" />
  </div>
</template>
