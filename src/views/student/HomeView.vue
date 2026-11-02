<script setup>
import { useRouter } from 'vue-router'
import { logout, getSession } from '@/services/authService'
import AppIcon from '@/components/AppIcon.vue'

const router = useRouter()
const session = getSession()

const kpis = [
  { key: 'warning', icon: 'star', label: 'Total Poin', value: '15', pill: 'down', pillText: '-', compare: 'dari batas 100 poin' },
  { key: 'danger', icon: 'alert', label: 'Total Pelanggaran', value: '3', pill: 'flat', pillText: 'bulan ini', compare: '2 ringan · 1 sedang' },
  { key: 'success', icon: 'check', label: 'Kehadiran', value: '95%', pill: 'up', pillText: '+2%', compare: 'dari pekan lalu' },
  { key: 'primary', icon: 'user', label: 'Kelas', value: 'XI IPA 1', pill: 'flat', pillText: 'aktif', compare: 'wali: Bu Sri' },
]

const riwayat = [
  { tanggal: '12 Okt 2026', jenis: 'Terlambat masuk', poin: 5, oleh: 'Guru Piket', status: 'Disetujui' },
  { tanggal: '05 Okt 2026', jenis: 'Tidak mengerjakan tugas', poin: 5, oleh: 'Bu Sri', status: 'Disetujui' },
  { tanggal: '28 Sep 2026', jenis: 'Atribut tidak lengkap', poin: 5, oleh: 'Pak Andi', status: 'Diproses' },
]

const statusClass = { Diproses: 'warning', Disetujui: 'success', Ditolak: 'danger' }

function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-text">
        <span class="eyebrow">Dashboard Murid</span>
        <h1 class="hero-title">Halo, <span class="accent">{{ session?.username || 'Murid' }}</span></h1>
        <p class="hero-sub">Lihat rekap poin dan riwayat pelanggaranmu di sini.</p>
      </div>
      <div class="hero-actions">
        <button class="btn btn--ghost" type="button" @click="handleLogout">
          <AppIcon name="logout" />
          Keluar
        </button>
      </div>
    </section>

    <section class="kpi-grid" aria-label="Statistik saya">
      <article v-for="k in kpis" :key="k.label" class="kpi-card" :class="`c-${k.key}`">
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
      <section class="col-12 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Riwayat</span>
            <h2 class="card-title">Pelanggaran Saya</h2>
          </div>
          <span class="badge primary">{{ riwayat.length }} RECORDS</span>
        </div>
        <div class="table-scroll">
          <table class="table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Jenis Pelanggaran</th>
                <th>Dicatat oleh</th>
                <th>Poin</th>
                <th style="text-align: right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in riwayat" :key="r.tanggal">
                <td class="cell-date">{{ r.tanggal }}</td>
                <td class="cell-name">{{ r.jenis }}</td>
                <td>{{ r.oleh }}</td>
                <td class="cell-price">{{ r.poin }}</td>
                <td style="text-align: right">
                  <span class="badge" :class="statusClass[r.status]">{{ r.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>
