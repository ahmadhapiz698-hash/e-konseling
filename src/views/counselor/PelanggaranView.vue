<script setup>
import { ref, computed, watch } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import AppPagination from '@/components/AppPagination.vue'
import AppModal from '@/components/AppModal.vue'

const kpi = [
  { key: 'primary', icon: 'alert', label: 'Total Pelanggaran', value: '37', pill: 'down', pillText: '-8%', compare: 'turun dari 40 bulan lalu' },
  { key: 'warning', icon: 'clipboard', label: 'Menunggu Verifikasi', value: '12', pill: 'flat', pillText: 'perlu dicek', compare: 'oleh tim BK' },
  { key: 'success', icon: 'check', label: 'Disetujui', value: '21', pill: 'up', pillText: '+3', compare: 'dari pekan lalu' },
  { key: 'danger', icon: 'error', label: 'Ditolak', value: '4', pill: 'flat', pillText: 'bulan ini', compare: 'data tidak valid' },
]

const rows = [
  { id: 1, nama: 'Ahmad Fauzi', kelas: 'XI IPA 1', jenis: 'Terlambat masuk', poin: 5, tanggal: '12 Okt 2026', oleh: 'Guru Piket', status: 'Diproses' },
  { id: 2, nama: 'Siti Nurhaliza', kelas: 'X IPS 2', jenis: 'Tidak mengerjakan tugas', poin: 10, tanggal: '12 Okt 2026', oleh: 'Bu Sri', status: 'Disetujui' },
  { id: 3, nama: 'Budi Santoso', kelas: 'XII IPS 1', jenis: 'Bolos pelajaran', poin: 25, tanggal: '11 Okt 2026', oleh: 'Pak Andi', status: 'Disetujui' },
  { id: 4, nama: 'Dewi Lestari', kelas: 'XI IPA 3', jenis: 'Tidak memakai atribut', poin: 5, tanggal: '11 Okt 2026', oleh: 'Guru Piket', status: 'Diproses' },
  { id: 5, nama: 'Rizky Pratama', kelas: 'X IPA 2', jenis: 'Membuat keributan', poin: 15, tanggal: '10 Okt 2026', oleh: 'Pak Andi', status: 'Ditolak' },
  { id: 6, nama: 'Nabila Putri', kelas: 'XI IPA 1', jenis: 'Terlambat masuk', poin: 5, tanggal: '10 Okt 2026', oleh: 'Guru Piket', status: 'Disetujui' },
  { id: 7, nama: 'Fajar Nugroho', kelas: 'XII IPA 2', jenis: 'Keluar kelas tanpa izin', poin: 10, tanggal: '09 Okt 2026', oleh: 'Bu Sri', status: 'Disetujui' },
  { id: 8, nama: 'Ayu Wulandari', kelas: 'X IPS 1', jenis: 'Tidak mengerjakan tugas', poin: 5, tanggal: '09 Okt 2026', oleh: 'Bu Sri', status: 'Diproses' },
  { id: 9, nama: 'Hendra Wijaya', kelas: 'XI IPS 2', jenis: 'Bolos pelajaran', poin: 25, tanggal: '08 Okt 2026', oleh: 'Pak Andi', status: 'Disetujui' },
  { id: 10, nama: 'Maya Sari', kelas: 'X IPA 1', jenis: 'Tidak memakai atribut', poin: 5, tanggal: '08 Okt 2026', oleh: 'Guru Piket', status: 'Disetujui' },
  { id: 11, nama: 'Dimas Setiawan', kelas: 'XII IPS 1', jenis: 'Membuat keributan', poin: 15, tanggal: '07 Okt 2026', oleh: 'Pak Andi', status: 'Diproses' },
  { id: 12, nama: 'Rina Marlina', kelas: 'XI IPA 2', jenis: 'Terlambat masuk', poin: 5, tanggal: '07 Okt 2026', oleh: 'Guru Piket', status: 'Ditolak' },
]

const statusClass = { Diproses: 'warning', Disetujui: 'success', Ditolak: 'danger' }
const statusOptions = ['Semua', 'Diproses', 'Disetujui', 'Ditolak']

const q = ref('')
const status = ref('Semua')
const page = ref(1)
const perPage = ref(10)

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  return rows.filter((r) => {
    const okStatus = status.value === 'Semua' || r.status === status.value
    const okTerm =
      !term ||
      r.nama.toLowerCase().includes(term) ||
      r.kelas.toLowerCase().includes(term) ||
      r.jenis.toLowerCase().includes(term)
    return okStatus && okTerm
  })
})

const paged = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filtered.value.slice(start, start + perPage.value)
})

watch([q, status], () => {
  page.value = 1
})

const formOpen = ref(false)
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-main">
        <div class="hero-icon">
          <AppIcon name="alert" :size="24" />
        </div>
        <div class="hero-text">
          <span class="eyebrow">Manajemen</span>
          <h1 class="hero-title">Data <span class="accent">Pelanggaran</span></h1>
        </div>
      </div>
      <div class="hero-actions">
        <button class="btn btn--primary" type="button" @click="formOpen = true">
          <AppIcon name="plus" />
          Catat Pelanggaran
        </button>
      </div>
    </section>

    <section class="kpi-grid" aria-label="Statistik pelanggaran">
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
      <section class="col-12 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Daftar</span>
            <h2 class="card-title">Catatan Pelanggaran</h2>
          </div>
          <span class="badge primary">{{ filtered.length }} RECORDS</span>
        </div>

        <div class="data-toolbar">
          <div class="data-toolbar-left">
            <div class="input-icon">
              <span class="ico"><AppIcon name="search" /></span>
              <input
                v-model="q"
                class="input"
                type="text"
                placeholder="Cari nama, kelas, atau jenis pelanggaran..."
              >
            </div>
          </div>
          <div class="data-toolbar-right">
            <select v-model="status" class="select" aria-label="Filter status">
              <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
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
                <th>Dicatat Oleh</th>
                <th style="text-align: right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in paged" :key="r.id">
                <td class="cell-name">{{ r.nama }}</td>
                <td>{{ r.kelas }}</td>
                <td>{{ r.jenis }}</td>
                <td class="cell-price">{{ r.poin }}</td>
                <td class="cell-date">{{ r.tanggal }}</td>
                <td>{{ r.oleh }}</td>
                <td style="text-align: right">
                  <span class="badge" :class="statusClass[r.status]">{{ r.status }}</span>
                </td>
              </tr>
              <tr v-if="!paged.length">
                <td colspan="7" class="table-empty">Tidak ada data pelanggaran.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card-foot">
          <AppPagination v-model="page" v-model:per-page="perPage" :total="filtered.length" show-info />
        </div>
      </section>
    </div>

    <AppModal v-model="formOpen" title="Catat Pelanggaran" size="md">
      <div class="field">
        <label class="field-label" for="m-murid">Nama murid</label>
        <input id="m-murid" class="input" type="text" placeholder="Cari nama murid...">
      </div>
      <div class="field">
        <label class="field-label" for="m-jenis">Jenis pelanggaran</label>
        <select id="m-jenis" class="select">
          <option>Terlambat masuk</option>
          <option>Tidak mengerjakan tugas</option>
          <option>Atribut tidak lengkap</option>
        </select>
      </div>
      <div class="field">
        <label class="field-label" for="m-catatan">Catatan</label>
        <textarea id="m-catatan" class="textarea" rows="3" placeholder="Keterangan tambahan..."></textarea>
      </div>

      <template #footer>
        <button class="btn btn--ghost" type="button" @click="formOpen = false">Batal</button>
        <button class="btn btn--primary" type="button" @click="formOpen = false">
          <AppIcon name="check" />
          Simpan
        </button>
      </template>
    </AppModal>
  </div>
</template>

<style scoped>
.card-foot {
  border-top: 1px solid var(--border-soft, #eef1f5);
  margin-top: 16px;
  padding-top: 14px;
}

.table-empty {
  color: var(--t-muted, #64748b);
  padding: 24px 0;
  text-align: center;
}

.field {
  display: grid;
  gap: 6px;
  margin-bottom: 14px;
}

.field:last-child {
  margin-bottom: 0;
}

.field-label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--t-muted, #64748b);
}
</style>
