<script setup>
import { ref, computed, watch } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import AppPagination from '@/components/AppPagination.vue'

const rows = [
  { id: 1, nama: 'Terlambat masuk', deskripsi: 'Datang setelah bel masuk berbunyi', tingkat: 'Ringan', poin: 5, jumlah: 18 },
  { id: 2, nama: 'Tidak mengerjakan tugas', deskripsi: 'Tidak menyelesaikan tugas yang diberikan', tingkat: 'Ringan', poin: 5, jumlah: 12 },
  { id: 3, nama: 'Atribut tidak lengkap', deskripsi: 'Seragam atau atribut sekolah tidak lengkap', tingkat: 'Ringan', poin: 5, jumlah: 9 },
  { id: 4, nama: 'Tidak mengikuti upacara', deskripsi: 'Tidak hadir saat upacara bendera', tingkat: 'Ringan', poin: 5, jumlah: 4 },
  { id: 5, nama: 'Keluar kelas tanpa izin', deskripsi: 'Meninggalkan kelas tanpa izin guru', tingkat: 'Sedang', poin: 10, jumlah: 7 },
  { id: 6, nama: 'Menggunakan HP saat pelajaran', deskripsi: 'Memakai ponsel tanpa keperluan belajar', tingkat: 'Sedang', poin: 10, jumlah: 6 },
  { id: 7, nama: 'Membuat keributan di kelas', deskripsi: 'Mengganggu ketenangan proses belajar', tingkat: 'Sedang', poin: 15, jumlah: 5 },
  { id: 8, nama: 'Berkata kasar / tidak sopan', deskripsi: 'Menggunakan bahasa tidak pantas', tingkat: 'Sedang', poin: 15, jumlah: 3 },
  { id: 9, nama: 'Membolos pelajaran', deskripsi: 'Tidak masuk sekolah tanpa keterangan', tingkat: 'Berat', poin: 25, jumlah: 5 },
  { id: 10, nama: 'Merokok di lingkungan sekolah', deskripsi: 'Merokok atau membawa rokok', tingkat: 'Berat', poin: 50, jumlah: 2 },
  { id: 11, nama: 'Membawa barang terlarang', deskripsi: 'Membawa benda yang dilarang sekolah', tingkat: 'Berat', poin: 50, jumlah: 1 },
  { id: 12, nama: 'Merusak fasilitas sekolah', deskripsi: 'Mengakibatkan kerusakan pada properti sekolah', tingkat: 'Berat', poin: 50, jumlah: 1 },
]

const tingkatClass = { Ringan: 'info', Sedang: 'warning', Berat: 'danger' }
const tingkatOptions = ['Semua', 'Ringan', 'Sedang', 'Berat']

const kpi = computed(() => {
  const count = (t) => rows.filter((r) => r.tingkat === t).length
  return [
    { key: 'primary', icon: 'tag', label: 'Total Kategori', value: String(rows.length), pill: 'flat', pillText: 'aktif', compare: 'semua tingkat' },
    { key: 'info', icon: 'info', label: 'Ringan', value: String(count('Ringan')), pill: 'flat', pillText: 'kategori', compare: 'poin 5' },
    { key: 'warning', icon: 'alert', label: 'Sedang', value: String(count('Sedang')), pill: 'flat', pillText: 'kategori', compare: 'poin 10–15' },
    { key: 'danger', icon: 'error', label: 'Berat', value: String(count('Berat')), pill: 'flat', pillText: 'kategori', compare: 'poin 25–50' },
  ]
})

const q = ref('')
const tingkat = ref('Semua')
const page = ref(1)
const perPage = ref(10)

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  return rows.filter((r) => {
    const okTingkat = tingkat.value === 'Semua' || r.tingkat === tingkat.value
    const okTerm = !term || r.nama.toLowerCase().includes(term) || r.deskripsi.toLowerCase().includes(term)
    return okTingkat && okTerm
  })
})

const paged = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filtered.value.slice(start, start + perPage.value)
})

watch([q, tingkat], () => {
  page.value = 1
})
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-main">
        <div class="hero-icon">
          <AppIcon name="tag" :size="24" />
        </div>
        <div class="hero-text">
          <span class="eyebrow">Master Data</span>
          <h1 class="hero-title">Kategori <span class="accent">Pelanggaran</span></h1>
        </div>
      </div>
      <div class="hero-actions">
        <button class="btn btn--primary" type="button">
          <AppIcon name="plus" />
          Tambah Kategori
        </button>
      </div>
    </section>

    <section class="kpi-grid" aria-label="Statistik kategori">
      <article v-for="k in kpi" :key="k.label" class="kpi-card" :class="`c-${k.key}`">
        <div class="kpi-top">
          <div class="kpi-identity">
            <div class="kpi-icon" :class="k.key">
              <AppIcon :name="k.icon" />
            </div>
            <div class="kpi-label">{{ k.label }}</div>
          </div>
          <span class="kpi-pill" :class="k.pill">
            <AppIcon name="minus" />
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
            <h2 class="card-title">Kategori Pelanggaran</h2>
          </div>
          <span class="badge primary">{{ filtered.length }} KATEGORI</span>
        </div>

        <div class="data-toolbar">
          <div class="data-toolbar-left">
            <div class="input-icon">
              <span class="ico"><AppIcon name="search" /></span>
              <input
                v-model="q"
                class="input"
                type="text"
                placeholder="Cari nama atau deskripsi kategori..."
              >
            </div>
          </div>
          <div class="data-toolbar-right">
            <select v-model="tingkat" class="select" aria-label="Filter tingkat">
              <option v-for="t in tingkatOptions" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
        </div>

        <div class="table-scroll">
          <table class="table">
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Deskripsi</th>
                <th>Tingkat</th>
                <th style="text-align: right">Poin</th>
                <th style="text-align: right">Pelanggaran</th>
                <th style="text-align: right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in paged" :key="r.id">
                <td class="cell-name">{{ r.nama }}</td>
                <td class="cell-desc">{{ r.deskripsi }}</td>
                <td><span class="badge" :class="tingkatClass[r.tingkat]">{{ r.tingkat }}</span></td>
                <td class="cell-price">{{ r.poin }}</td>
                <td class="cell-price">{{ r.jumlah }}</td>
                <td style="text-align: right">
                  <div class="row-actions">
                    <button class="row-btn" type="button" aria-label="Ubah"><AppIcon name="pencil" /></button>
                    <button class="row-btn danger" type="button" aria-label="Hapus"><AppIcon name="trash" /></button>
                  </div>
                </td>
              </tr>
              <tr v-if="!paged.length">
                <td colspan="6" class="table-empty">Tidak ada kategori.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card-foot">
          <AppPagination v-model="page" v-model:per-page="perPage" :total="filtered.length" show-info />
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

.cell-desc {
  color: var(--t-muted, #64748b);
  font-size: 12.5px;
}

.table-empty {
  color: var(--t-muted, #64748b);
  padding: 24px 0;
  text-align: center;
}

.row-actions {
  display: inline-flex;
  gap: 4px;
  justify-content: flex-end;
}

.row-btn {
  align-items: center;
  border-radius: 7px;
  border: 1px solid var(--border, #e4e8ef);
  background: var(--bg-card, #fff);
  color: var(--t-muted, #64748b);
  display: grid;
  height: 30px;
  width: 30px;
  place-items: center;
  cursor: pointer;
  transition: background-color 0.16s ease, color 0.16s ease, border-color 0.16s ease;
}

.row-btn svg {
  width: 15px;
  height: 15px;
}

.row-btn:hover {
  border-color: var(--t-light, #94a3b8);
  color: var(--t-base, #1e293b);
}

.row-btn.danger:hover {
  border-color: var(--danger, #ef4444);
  background: var(--danger-soft, #fef2f2);
  color: var(--danger, #ef4444);
}
</style>
