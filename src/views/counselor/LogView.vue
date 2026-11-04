<script setup>
import { computed } from 'vue'
import { logTerlihat } from '@/services/store'
const rows = computed(() => logTerlihat())
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-text"><span class="eyebrow">Pengaturan</span><h1 class="hero-title">Log Aktivitas</h1><p class="hero-sub">Penetapan, koreksi, dan pembukaan catatan sensitif tercatat di sini.</p></div>
    </section>
    <section class="card">
      <div class="table-scroll">
        <table class="table">
          <thead><tr><th>Waktu</th><th>Pengguna</th><th>Aktivitas</th></tr></thead>
          <tbody>
            <tr v-for="l in rows" :key="l.id"><td class="cell-date">{{ l.waktu }}</td><td>{{ l.pengguna }}</td><td>{{ l.aksi }}</td></tr>
            <tr v-if="!rows.length"><td colspan="3" class="table-empty">Belum ada aktivitas tercatat.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
