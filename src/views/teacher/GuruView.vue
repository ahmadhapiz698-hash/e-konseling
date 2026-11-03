<script setup>
import { ref, computed } from 'vue'
import './teacher-pages.css'

// TODO: ganti data dummy ini dengan data dari services/ (API)
const guru = ref([
  { id: 1, nama: 'Ibu Ratna Wulandari', peran: 'Guru BK', waliKelas: '-', mapel: 'Bimbingan Konseling', email: 'ratna@sekolah.sch.id' },
  { id: 2, nama: 'Pak Hendra Saputra', peran: 'Wali Kelas', waliKelas: 'XI IPA 1', mapel: 'Matematika', email: 'hendra@sekolah.sch.id' },
  { id: 3, nama: 'Ibu Sari Anggraini', peran: 'Wali Kelas', waliKelas: 'X IPS 2', mapel: 'Sosiologi', email: 'sari@sekolah.sch.id' },
  { id: 4, nama: 'Pak Dimas Prakoso', peran: 'Wali Kelas', waliKelas: 'XII IPS 1', mapel: 'Ekonomi', email: 'dimas@sekolah.sch.id' },
  { id: 5, nama: 'Ibu Maya Kusuma', peran: 'Guru Mapel', waliKelas: '-', mapel: 'Bahasa Indonesia', email: 'maya@sekolah.sch.id' },
])

const q = ref('')
const rows = computed(() =>
  guru.value.filter(
    (g) =>
      g.nama.toLowerCase().includes(q.value.toLowerCase()) ||
      g.mapel.toLowerCase().includes(q.value.toLowerCase()),
  ),
)

const inisial = (nama) =>
  nama
    .replace(/^(Ibu|Pak|Bapak)\s/i, '')
    .split(' ')
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase()

const badge = {
  'Guru BK': 'tp-badge--violet',
  'Wali Kelas': 'tp-badge--info',
  'Guru Mapel': 'tp-badge--muted',
}
</script>

<template>
  <div class="content">
    <div class="tp-stack">
      <section class="hero">
        <div class="hero-text">
          <span class="eyebrow">Data Guru</span>
          <h1 class="hero-title">Guru</h1>
          <p class="hero-sub">Guru BK, wali kelas, dan guru mata pelajaran.</p>
        </div>
        <div class="hero-actions">
          <input v-model="q" class="tp-input" type="search" placeholder="Cari nama atau mapel..." />
        </div>
      </section>

      <div class="tp-people">
        <article v-for="g in rows" :key="g.id" class="tp-card">
          <div class="tp-person-head">
            <div class="tp-avatar">{{ inisial(g.nama) }}</div>
            <div style="min-width: 0">
              <div class="tp-person-name">{{ g.nama }}</div>
              <span class="tp-badge" :class="badge[g.peran]">{{ g.peran }}</span>
            </div>
          </div>

          <dl class="tp-dl">
            <div><dt>Mapel</dt><dd>{{ g.mapel }}</dd></div>
            <div><dt>Wali kelas</dt><dd>{{ g.waliKelas }}</dd></div>
            <div><dt>Email</dt><dd>{{ g.email }}</dd></div>
          </dl>
        </article>
      </div>

      <p v-if="!rows.length" class="tp-empty">Guru tidak ditemukan. Coba kata kunci lain.</p>
    </div>
  </div>
</template>
