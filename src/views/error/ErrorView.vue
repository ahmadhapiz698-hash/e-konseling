<script setup>
import { useRouter } from 'vue-router'
import { APP_NAME } from '@/config'
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
  code: { type: [String, Number], default: '500' },
  eyebrow: { type: String, default: '' },
  title: { type: String, default: 'Terjadi kesalahan' },
  sub: { type: String, default: '' },
})

const router = useRouter()

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/')
}
</script>

<template>
  <div class="error-shell">
    <section class="error-card" role="alert">
      <span class="error-eyebrow">{{ eyebrow || `Error ${props.code}` }}</span>
      <div class="error-code">{{ props.code }}</div>
      <h1 class="error-title">{{ title }}</h1>
      <p class="error-sub">{{ sub }}</p>

      <div class="error-actions">
        <RouterLink class="btn btn--primary" to="/">
          <AppIcon name="home" />
          Ke beranda
        </RouterLink>
        <button class="btn btn--ghost" type="button" @click="goBack">
          <AppIcon name="arrow-left" />
          Kembali
        </button>
      </div>

      <div class="error-meta">
        <span><strong>Aplikasi</strong> {{ APP_NAME }}</span>
        <span><strong>Status</strong> {{ props.code }}</span>
      </div>
    </section>
  </div>
</template>
