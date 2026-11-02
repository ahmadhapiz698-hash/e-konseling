<script setup>
import ErrorView from './ErrorView.vue'
</script>

<template>
  <ErrorView
    code="503"
    eyebrow="Error 503"
    title="Layanan tidak tersedia"
    sub="Layanan sedang sibuk atau dalam perbaikan. Silakan coba beberapa saat lagi."
  />
</template>
