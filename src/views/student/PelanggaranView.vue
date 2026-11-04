<script setup>
import { computed } from 'vue'
import { getSession } from '@/services/authService'
import { kejadianTerlihat, poinSiswa, tahapPoin, aturanById } from '@/services/store'

const id = getSession()?.studentId
const rows = computed(() => kejadianTerlihat())
const total = computed(() => poinSiswa(id))
const kat = { Ringan: 'info', Sedang: 'warning', Berat: 'danger' }
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-text">
        <span class="eyebrow">Poin Saya</span>
        <h1 class="hero-title">Catatan dan Poin</h1>
        <p class="hero-sub">Poin membantu sekolah mendampingimu, bukan untuk menghukum.</p>
      </div>
    </section>
    <section class="card" style="margin-bottom:16px">
      <div class="kpi-value">{{ total }} poin</div>
      <p class="note" v-if="total === 0">Belum ada poin pelanggaran. Pertahankan!</p>
      <p class="note" v-else>Langkah yang bisa kamu ambil: {{ tahapPoin(total)?.tahap }}. Kamu bisa mengajukan konseling kapan saja bila ingin bercerita atau mencari solusi bersama.</p>
    </section>
    <section class="card">
      <div class="table-scroll">
        <table class="table">
          <thead><tr><th>Tanggal</th><th>Jenis</th><th>Kategori</th><th>Poin</th></tr></thead>
          <tbody>
            <tr v-for="k in rows" :key="k.id"><td class="cell-date">{{ k.tanggal }}</td><td>{{ aturanById(k.aturanId)?.nama }}</td><td><span class="badge" :class="kat[aturanById(k.aturanId)?.kategori]">{{ aturanById(k.aturanId)?.kategori }}</span></td><td>{{ k.poin }}</td></tr>
            <tr v-if="!rows.length"><td colspan="4" class="table-empty">Tidak ada catatan.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
