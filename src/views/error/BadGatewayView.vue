<script setup>
import ErrorView from './ErrorView.vue'
</script>

<template>
  <ErrorView
    code="502"
    eyebrow="Error 502"
    title="Gateway bermasalah"
    sub="Server menerima respons yang tidak valid dari server lain. Coba beberapa saat lagi."
  />
</template>
