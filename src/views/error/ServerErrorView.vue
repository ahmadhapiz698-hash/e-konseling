<script setup>
import ErrorView from './ErrorView.vue'
</script>

<template>
  <ErrorView
    code="500"
    eyebrow="Error 500"
    title="Terjadi kesalahan pada server"
    sub="Ada masalah di sisi server saat memproses permintaanmu. Silakan coba beberapa saat lagi."
  />
</template>
