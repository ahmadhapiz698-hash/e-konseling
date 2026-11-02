<script setup>
import AppIcon from '@/components/AppIcon.vue'

const kpi = [
  { key: 'primary', icon: 'alert', label: 'Total Pelanggaran', value: '37', pill: 'down', pillText: '-8%', compare: 'turun dari 40 bulan lalu' },
  { key: 'warning', icon: 'star', label: 'Total Poin', value: '412', pill: 'flat', pillText: 'steady', compare: 'stabil dari pekan lalu' },
  { key: 'success', icon: 'check', label: 'Disetujui', value: '21', pill: 'up', pillText: '+3', compare: 'dari pekan lalu' },
  { key: 'danger', icon: 'error', label: 'Ditolak', value: '4', pill: 'flat', pillText: 'bulan ini', compare: 'data tidak valid' },
]

const kategori = [
  { nama: 'Terlambat', jumlah: 18, pct: 48, color: 'var(--warning)' },
  { nama: 'Tidak mengerjakan tugas', jumlah: 12, pct: 32, color: 'var(--info)' },
  { nama: 'Bolos', jumlah: 5, pct: 14, color: 'var(--danger)' },
  { nama: 'Atribut tidak lengkap', jumlah: 2, pct: 6, color: 'var(--success)' },
]

const kelas = [
  { nama: 'XI IPA 1', jumlah: 9, pct: 60, color: 'var(--purple)' },
  { nama: 'X IPS 2', jumlah: 6, pct: 40, color: 'var(--primary)' },
  { nama: 'XII IPS 1', jumlah: 5, pct: 33, color: 'var(--info)' },
]

const rekap = [
  { bulan: 'Okt 2026', pelanggaran: 37, poin: 412, disetujui: 21, ditolak: 4 },
  { bulan: 'Sep 2026', pelanggaran: 40, poin: 455, disetujui: 25, ditolak: 6 },
  { bulan: 'Agu 2026', pelanggaran: 28, poin: 301, disetujui: 18, ditolak: 3 },
  { bulan: 'Jul 2026', pelanggaran: 15, poin: 160, disetujui: 10, ditolak: 2 },
  { bulan: 'Jun 2026', pelanggaran: 33, poin: 372, disetujui: 20, ditolak: 5 },
  { bulan: 'Mei 2026', pelanggaran: 41, poin: 488, disetujui: 27, ditolak: 7 },
]
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-main">
        <div class="hero-icon">
          <AppIcon name="chart" :size="24" />
        </div>
        <div class="hero-text">
          <span class="eyebrow">Analitik</span>
          <h1 class="hero-title">Laporan <span class="accent">Pelanggaran</span></h1>
        </div>
      </div>
      <div class="hero-actions">
        <button class="btn btn--ghost" type="button">
          <AppIcon name="download" />
          Ekspor
        </button>
      </div>
    </section>

    <section class="kpi-grid" aria-label="Ringkasan laporan">
      <article v-for="k in kpi" :key="k.label" class="kpi-card" :class="`c-${k.key}`">
        <div class="kpi-top">
          <div class="kpi-identity">
            <div class="kpi-icon" :class="k.key">
              <AppIcon :name="k.icon" />
            </div>
            <div class="kpi-label">{{ k.label }}</div>
          </div>
          <span class="kpi-pill" :class="k.pill">
            <AppIcon :name="k.pill === 'up' ? 'arrow-up-right' : k.pill === 'down' ? 'arrow-down-right' : 'minus'" />
            {{ k.pillText }}
          </span>
        </div>
        <div class="kpi-value">{{ k.value }}</div>
        <div class="kpi-compare">{{ k.compare }}</div>
      </article>
    </section>

    <div class="grid">
      <section class="col-6 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Distribusi</span>
            <h2 class="card-title">Per Kategori</h2>
          </div>
        </div>
        <div class="sv-regions">
          <div v-for="k in kategori" :key="k.nama" class="sv-region">
            <div class="sv-region-head">
              <span class="marker" :style="{ background: k.color }"></span>
              {{ k.nama }}
            </div>
            <div class="sv-region-value">{{ k.jumlah }}<span class="pct">{{ k.pct }}%</span></div>
            <div class="sv-region-bar">
              <div class="sv-region-bar-fill" :style="{ width: k.pct + '%', background: k.color }"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="col-6 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Distribusi</span>
            <h2 class="card-title">Per Kelas</h2>
          </div>
        </div>
        <div class="sv-regions">
          <div v-for="k in kelas" :key="k.nama" class="sv-region">
            <div class="sv-region-head">
              <span class="marker" :style="{ background: k.color }"></span>
              {{ k.nama }}
            </div>
            <div class="sv-region-value">{{ k.jumlah }}<span class="pct">{{ k.pct }}%</span></div>
            <div class="sv-region-bar">
              <div class="sv-region-bar-fill" :style="{ width: k.pct + '%', background: k.color }"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="col-12 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Rekap</span>
            <h2 class="card-title">Ringkasan Bulanan</h2>
          </div>
          <span class="badge primary">{{ rekap.length }} BULAN</span>
        </div>
        <div class="table-scroll">
          <table class="table">
            <thead>
              <tr>
                <th>Periode</th>
                <th style="text-align: right">Pelanggaran</th>
                <th style="text-align: right">Poin</th>
                <th style="text-align: right">Disetujui</th>
                <th style="text-align: right">Ditolak</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rekap" :key="r.bulan">
                <td class="cell-name">{{ r.bulan }}</td>
                <td class="cell-price">{{ r.pelanggaran }}</td>
                <td class="cell-price">{{ r.poin }}</td>
                <td class="cell-price pos">{{ r.disetujui }}</td>
                <td class="cell-price neg">{{ r.ditolak }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>
