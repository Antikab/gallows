window.addEventListener('keydown', ({ key }) => {
  if (isLose.value || isWin.value) {
    return
  }

  if (letters.value.includes(key)) {
    showNotification()
    return
  }

  addLetter(key)
})
