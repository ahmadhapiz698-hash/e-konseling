<script setup>
import ErrorView from './ErrorView.vue'
</script>

<template>
  <ErrorView
    code="405"
    eyebrow="Error 405"
    title="Metode tidak diizinkan"
    sub="Permintaan ke halaman ini memakai metode yang tidak diizinkan."
  />
</template>
