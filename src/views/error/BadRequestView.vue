<script setup>
import ErrorView from './ErrorView.vue'
</script>

<template>
  <ErrorView
    code="400"
    eyebrow="Error 400"
    title="Permintaan tidak valid"
    sub="Permintaanmu tidak dapat diproses karena datanya tidak valid atau tidak lengkap."
  />
</template>
