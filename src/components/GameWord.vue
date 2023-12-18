<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Props {
  word: string;
  correctLetters: string[];
  addLetter: (letter: string) => void;
  isDisplayInput: boolean;
}

const { word, correctLetters, addLetter, isDisplayInput } =
  defineProps<Props>();

const inputLetter = ref<string>("");
const maxInputLength = 1;
const onInput = () => {
  if (inputLetter.value.length === maxInputLength) {
    addLetter(inputLetter.value);
    inputLetter.value = "";
  }
};

const isMobileOrTablet = ref<boolean>(false);

onMounted(() => {
  isMobileOrTablet.value =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
});
</script>

<template>
  <div class="word">
    <span v-for="(letter, index) in word" :key="index" class="letter">
      {{ correctLetters.includes(letter) ? letter : "" }}
    </span>

    <div v-if="isMobileOrTablet && isDisplayInput" class="input-container">
      <input
        type="text"
        :value="inputLetter"
        @input="onInput"
        maxlength="1"
        placeholder="'ж'"
        class="input"
      />
    </div>
  </div>
</template>
