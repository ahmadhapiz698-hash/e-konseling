<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'
import './teacher-pages.css'

// TODO: ganti data dummy ini dengan data dari services/ (API)
const kategori = [
  { nama: 'Terlambat', poin: 5, warna: '#f59e0b', tema: 'amber' },
  { nama: 'Tidak mengerjakan tugas', poin: 5, warna: '#3b82f6', tema: '' },
  { nama: 'Bolos', poin: 15, warna: '#ef4444', tema: 'red' },
  { nama: 'Atribut tidak lengkap', poin: 3, warna: '#10b981', tema: 'green' },
]

const muridList = ['Andi Pratama', 'Siti Rahma', 'Budi Santoso', 'Dewi Lestari', 'Rizky Maulana', 'Nadia Putri']

const data = ref([
  { id: 1, tanggal: '2026-11-03', murid: 'Andi Pratama', kelas: 'XI IPA 1', kategori: 'Terlambat', catatan: 'Datang pukul 07.25' },
  { id: 2, tanggal: '2026-11-02', murid: 'Budi Santoso', kelas: 'XII IPS 1', kategori: 'Bolos', catatan: 'Tidak masuk jam ke-3 sampai ke-5' },
  { id: 3, tanggal: '2026-11-02', murid: 'Rizky Maulana', kelas: 'X IPS 2', kategori: 'Tidak mengerjakan tugas', catatan: 'Tugas Ekonomi' },
  { id: 4, tanggal: '2026-10-30', murid: 'Dewi Lestari', kelas: 'XI IPA 1', kategori: 'Atribut tidak lengkap', catatan: 'Tidak memakai dasi' },
])

const filter = ref('Semua')
const q = ref('')
const showForm = ref(false)
const form = reactive({ murid: '', kategori: '', catatan: '' })
const error = ref('')

const poinOf = (nama) => kategori.find((k) => k.nama === nama)?.poin ?? 0
const warnaOf = (nama) => kategori.find((k) => k.nama === nama)?.warna ?? '#94a3b8'

const rows = computed(() =>
  data.value
    .filter((d) => filter.value === 'Semua' || d.kategori === filter.value)
    .filter((d) => d.murid.toLowerCase().includes(q.value.toLowerCase())),
)

const ringkasan = computed(() =>
  kategori.map((k) => ({ ...k, jumlah: data.value.filter((d) => d.kategori === k.nama).length })),
)

const formatTanggal = (t) =>
  new Date(t).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

function openForm() {
  Object.assign(form, { murid: '', kategori: '', catatan: '' })
  error.value = ''
  showForm.value = true
}

function simpan() {
  if (!form.murid || !form.kategori) {
    error.value = 'Pilih murid dan kategori pelanggaran terlebih dahulu.'
    return
  }
  data.value.unshift({
    id: Date.now(),
    tanggal: new Date().toISOString().slice(0, 10),
    murid: form.murid,
    kelas: '-', // TODO: ambil dari data murid
    kategori: form.kategori,
    catatan: form.catatan || '-',
  })
  showForm.value = false
}

function hapus(id) {
  if (confirm('Hapus catatan pelanggaran ini?')) {
    data.value = data.value.filter((d) => d.id !== id)
  }
}

function onKey(e) {
  if (e.key === 'Escape') showForm.value = false
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="content">
    <div class="tp-stack">
      <section class="hero">
        <div class="hero-text">
          <span class="eyebrow">Pelanggaran Murid</span>
          <h1 class="hero-title">Pelanggaran</h1>
          <p class="hero-sub">Catat dan pantau pelanggaran murid.</p>
        </div>
        <div class="hero-actions">
          <button class="btn btn--primary" type="button" @click="openForm">Tambah pelanggaran</button>
        </div>
      </section>

      <div class="tp-stats">
        <button
          v-for="k in ringkasan"
          :key="k.nama"
          type="button"
          class="tp-stat"
          :class="[k.tema && `tp-stat--${k.tema}`, { 'is-active': filter === k.nama }]"
          @click="filter = filter === k.nama ? 'Semua' : k.nama"
        >
          <div class="tp-stat-label">
            <span class="tp-dot" :style="{ background: k.warna }" />
            {{ k.nama }}
          </div>
          <div class="tp-stat-value">{{ k.jumlah }}</div>
          <div class="tp-stat-note">{{ k.poin }} poin per kejadian</div>
        </button>
      </div>

      <section class="tp-card">
        <div class="tp-toolbar">
          <input v-model="q" class="tp-input" type="search" placeholder="Cari nama murid..." />
          <div class="tp-small tp-muted">
            Filter: <strong>{{ filter }}</strong>
            <button v-if="filter !== 'Semua'" class="tp-link" type="button" style="margin-left: 8px" @click="filter = 'Semua'">
              Reset
            </button>
          </div>
        </div>

        <div class="tp-table-wrap">
          <table class="tp-table">
            <thead>
              <tr>
                <th><span>Tanggal</span></th>
                <th><span>Murid</span></th>
                <th><span>Kategori</span></th>
                <th><span>Poin</span></th>
                <th><span>Catatan</span></th>
                <th><span class="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="d in rows" :key="d.id">
                <td class="tp-muted tp-nowrap">{{ formatTanggal(d.tanggal) }}</td>
                <td>
                  <div class="tp-strong">{{ d.murid }}</div>
                  <div class="tp-small tp-muted">{{ d.kelas }}</div>
                </td>
                <td>
                  <span class="tp-with-dot">
                    <span class="tp-dot" :style="{ background: warnaOf(d.kategori) }" />
                    {{ d.kategori }}
                  </span>
                </td>
                <td class="tp-strong">{{ poinOf(d.kategori) }}</td>
                <td class="tp-muted">{{ d.catatan }}</td>
                <td class="tp-right">
                  <button class="tp-link tp-link--danger" type="button" @click="hapus(d.id)">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-if="!rows.length" class="tp-empty">Belum ada pelanggaran yang tercatat untuk filter ini.</p>
        </div>
      </section>
    </div>

    <!-- Form tambah pelanggaran -->
    <div v-if="showForm" class="tp-backdrop" @click.self="showForm = false">
      <div class="tp-modal" role="dialog" aria-modal="true" aria-labelledby="judul-form">
        <h2 id="judul-form">Tambah pelanggaran</h2>

        <label class="tp-field">
          <span>Murid</span>
          <select v-model="form.murid" class="tp-select">
            <option value="" disabled>Pilih murid</option>
            <option v-for="m in muridList" :key="m" :value="m">{{ m }}</option>
          </select>
        </label>

        <label class="tp-field">
          <span>Kategori</span>
          <select v-model="form.kategori" class="tp-select">
            <option value="" disabled>Pilih kategori</option>
            <option v-for="k in kategori" :key="k.nama" :value="k.nama">{{ k.nama }} ({{ k.poin }} poin)</option>
          </select>
        </label>

        <label class="tp-field">
          <span>Catatan (opsional)</span>
          <textarea v-model="form.catatan" class="tp-textarea" rows="3" />
        </label>

        <p v-if="error" class="tp-error">{{ error }}</p>

        <div class="tp-modal-actions">
          <button class="btn" type="button" @click="showForm = false">Batal</button>
          <button class="btn btn--primary" type="button" @click="simpan">Simpan pelanggaran</button>
        </div>
      </div>
    </div>
  </div>
</template>
