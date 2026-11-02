<script setup>
import ErrorView from './ErrorView.vue'
</script>

<template>
  <ErrorView
    code="429"
    eyebrow="Error 429"
    title="Terlalu banyak permintaan"
    sub="Kamu mengirim terlalu banyak permintaan. Tunggu sebentar lalu coba lagi."
  />
</template>
