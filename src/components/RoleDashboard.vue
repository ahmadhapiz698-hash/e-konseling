<script setup>
import { ref, computed } from 'vue'
import { getSession } from '@/services/authService'
import { titleCase } from '@/utils/format'
import AppIcon from '@/components/AppIcon.vue'
import AppPagination from '@/components/AppPagination.vue'

defineProps({
  roleLabel: { type: String, default: 'Guru' },
})

const session = getSession()

// Nama guru yang sedang login (bukan username), huruf awal tiap kata dibesarkan.
const displayName = titleCase(session?.name || session?.username || '') || 'Pengguna'

const kpis = [
  { key: 'purple', icon: 'users', label: 'Total Murid', value: '1.248', pill: 'flat', pillText: 'aktif', compare: 'semester ini' },
  { key: 'danger', icon: 'alert', label: 'Pelanggaran Bulan Ini', value: '37', pill: 'down', pillText: '-8%', compare: 'turun dari 40 bulan lalu' },
  { key: 'warning', icon: 'star', label: 'Poin Terkumpul', value: '412', pill: 'flat', pillText: 'steady', compare: 'stabil dari pekan lalu' },
  { key: 'success', icon: 'check', label: 'Murid Bersih', value: '1.198', pill: 'up', pillText: '+5', compare: 'naik dari 1.193 pekan lalu' },
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

const rows = [
  { nama: 'Ahmad Fauzi', kelas: 'XI IPA 1', jenis: 'Terlambat masuk', poin: 5, tanggal: '12 Okt', status: 'Diproses' },
  { nama: 'Siti Nurhaliza', kelas: 'X IPS 2', jenis: 'Tidak mengerjakan tugas', poin: 10, tanggal: '12 Okt', status: 'Disetujui' },
  { nama: 'Budi Santoso', kelas: 'XII IPS 1', jenis: 'Bolos pelajaran', poin: 25, tanggal: '11 Okt', status: 'Disetujui' },
  { nama: 'Dewi Lestari', kelas: 'XI IPA 3', jenis: 'Tidak memakai atribut', poin: 5, tanggal: '11 Okt', status: 'Diproses' },
  { nama: 'Rizky Pratama', kelas: 'X IPA 2', jenis: 'Membuat keributan', poin: 15, tanggal: '10 Okt', status: 'Ditolak' },
]

const statusClass = { Diproses: 'warning', Disetujui: 'success', Ditolak: 'danger' }

// Tombol refresh: tampilkan animasi berputar selama data dimuat ulang.
const refreshing = ref(false)
async function handleRefresh() {
  if (refreshing.value) return
  refreshing.value = true
  try {
    page.value = 1
    await new Promise((resolve) => setTimeout(resolve, 800))
  } finally {
    refreshing.value = false
  }
}

// Pagination tabel "Pelanggaran Terakhir"
const page = ref(1)
const perPage = ref(10)
const pagedRows = computed(() => {
  const start = (page.value - 1) * perPage.value
  return rows.slice(start, start + perPage.value)
})
</script>

<template>
  <div class="content">
    <section class="hero hero--accent">
      <div class="hero-main">
        <div class="hero-icon">
          <AppIcon name="shield" :size="24" />
        </div>
        <div class="hero-text">
          <span class="eyebrow">Dashboard {{ roleLabel }}</span>
          <h1 class="hero-title">Selamat datang, <span class="accent">{{ displayName }}</span></h1>
        </div>
      </div>

      <div class="hero-actions">
        <button
          class="icon-btn hero-refresh"
          :class="{ spinning: refreshing }"
          type="button"
          aria-label="Muat ulang"
          :title="refreshing ? 'Memuat ulang...' : 'Muat ulang'"
          :disabled="refreshing"
          @click="handleRefresh"
        >
          <AppIcon name="refresh" />
        </button>
      </div>
    </section>

    <section class="kpi-grid" aria-label="Statistik pelanggaran">
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
      <section class="col-6 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Distribusi</span>
            <h2 class="card-title">Kategori Pelanggaran</h2>
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
            <span class="eyebrow">Per Kelas</span>
            <h2 class="card-title">Kelas Paling Sering</h2>
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
            <span class="eyebrow">Terbaru</span>
            <h2 class="card-title">Pelanggaran Terakhir</h2>
          </div>
          <span class="badge primary">{{ rows.length }} RECORDS</span>
        </div>
        <div class="table-scroll">
          <table class="table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Jenis Pelanggaran</th>
                <th>Poin</th>
                <th>Tanggal</th>
                <th style="text-align: right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in pagedRows" :key="r.nama">
                <td class="cell-name">{{ r.nama }}</td>
                <td>{{ r.kelas }}</td>
                <td>{{ r.jenis }}</td>
                <td class="cell-price">{{ r.poin }}</td>
                <td class="cell-date">{{ r.tanggal }}</td>
                <td style="text-align: right">
                  <span class="badge" :class="statusClass[r.status]">{{ r.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-foot">
          <AppPagination v-model="page" v-model:per-page="perPage" :total="rows.length" show-info />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.card-foot {
  border-top: 1px solid var(--border-soft, #eef1f5);
  margin-top: 16px;
  padding-top: 14px;
}

.hero.hero--accent {
  border-left: 4px solid var(--primary, #2563eb);
}

.kpi-card {
  border-left: 4px solid currentColor;
}

.hero-main {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  flex: 1 1 auto;
}

.hero {
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
}

.hero-actions {
  flex-wrap: nowrap;
}

.hero-icon {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--primary-soft, #eff6ff);
  color: var(--primary, #2563eb);
}

@media (max-width: 720px) {
  .hero-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
  }

  .hero-title {
    font-size: 20px;
    line-height: 1.25;
    margin-bottom: 4px;
  }
}

@media (max-width: 420px) {
  .hero-title {
    font-size: 17px;
  }
}

.hero-refresh {
  background: var(--bg-card, #fff);
  border: 1px solid var(--border, #e5e7eb);
}

.hero-refresh:hover:not(:disabled) {
  background: var(--bg-hover, #f3f4f6);
  color: var(--t-base, #111827);
}

.hero-refresh:disabled {
  cursor: default;
}

.hero-refresh.spinning :deep(svg) {
  animation: hero-spin 0.8s linear infinite;
}

@keyframes hero-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
