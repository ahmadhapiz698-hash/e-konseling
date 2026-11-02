<script setup>
import ErrorView from './ErrorView.vue'
</script>

<template>
  <ErrorView
    code="504"
    eyebrow="Error 504"
    title="Gateway timeout"
    sub="Server lain tidak merespons tepat waktu. Coba lagi nanti."
  />
</template>
