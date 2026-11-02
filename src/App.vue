<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppToast from '@/components/AppToast.vue'

// Pengaman: pastikan atribut tema selalu ada walau script di index.html tidak jalan
function ensureTheme() {
  if (document.documentElement.getAttribute('data-theme')) return
  let t = 'light'
  try {
    t = localStorage.getItem('pelanggaran-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  } catch {}
  document.documentElement.setAttribute('data-theme', t)
}

onMounted(ensureTheme)
</script>

<template>
  <RouterView />
  <AppToast />
</template>
