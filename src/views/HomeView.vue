<script setup>
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-text">
        <span class="eyebrow">Pelanggaran Murid</span>
        <h1 class="hero-title">Halaman Beranda</h1>
        <p class="hero-sub">Sistem pencatatan dan pemantauan pelanggaran murid.</p>
      </div>
      <div class="hero-actions">
        <RouterLink class="btn btn--primary" to="/login">
          Masuk
          <AppIcon name="arrow-right" />
        </RouterLink>
      </div>
    </section>
  </div>
</template>
