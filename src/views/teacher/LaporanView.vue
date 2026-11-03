<script setup>
import { ref, computed } from 'vue'
import './teacher-pages.css'

// TODO: ganti data dummy ini dengan data dari services/ (API)
const semua = [
  { tanggal: '2026-11-03', murid: 'Andi Pratama', kelas: 'XI IPA 1', kategori: 'Terlambat', poin: 5 },
  { tanggal: '2026-11-02', murid: 'Budi Santoso', kelas: 'XII IPS 1', kategori: 'Bolos', poin: 15 },
  { tanggal: '2026-11-02', murid: 'Rizky Maulana', kelas: 'X IPS 2', kategori: 'Tidak mengerjakan tugas', poin: 5 },
  { tanggal: '2026-10-30', murid: 'Dewi Lestari', kelas: 'XI IPA 1', kategori: 'Atribut tidak lengkap', poin: 3 },
  { tanggal: '2026-10-21', murid: 'Andi Pratama', kelas: 'XI IPA 1', kategori: 'Terlambat', poin: 5 },
  { tanggal: '2026-09-14', murid: 'Budi Santoso', kelas: 'XII IPS 1', kategori: 'Bolos', poin: 15 },
  { tanggal: '2026-09-08', murid: 'Rizky Maulana', kelas: 'X IPS 2', kategori: 'Terlambat', poin: 5 },
  { tanggal: '2026-08-19', murid: 'Budi Santoso', kelas: 'XII IPS 1', kategori: 'Atribut tidak lengkap', poin: 3 },
]

const periode = ref('semester')
const sekarang = new Date('2026-11-03')

const data = computed(() => {
  if (periode.value === 'semester') return semua
  const batas = new Date(sekarang)
  if (periode.value === 'bulan') batas.setMonth(batas.getMonth() - 1)
  if (periode.value === 'minggu') batas.setDate(batas.getDate() - 7)
  return semua.filter((d) => new Date(d.tanggal) >= batas)
})

function rekap(key) {
  const map = {}
  data.value.forEach((d) => {
    map[d[key]] ??= { nama: d[key], jumlah: 0, poin: 0 }
    map[d[key]].jumlah++
    map[d[key]].poin += d.poin
  })
  return Object.values(map).sort((a, b) => b.jumlah - a.jumlah)
}

const perKategori = computed(() => rekap('kategori'))
const perKelas = computed(() => rekap('kelas'))
const perMurid = computed(() => rekap('murid').sort((a, b) => b.poin - a.poin).slice(0, 5))

const total = computed(() => ({
  kejadian: data.value.length,
  poin: data.value.reduce((s, d) => s + d.poin, 0),
  murid: new Set(data.value.map((d) => d.murid)).size,
}))

const maks = (list) => Math.max(1, ...list.map((i) => i.jumlah))

function cetak() {
  window.print()
}

function ekspor() {
  const header = ['Tanggal', 'Murid', 'Kelas', 'Kategori', 'Poin']
  const baris = data.value.map((d) => [d.tanggal, d.murid, d.kelas, d.kategori, d.poin])
  const csv = [header, ...baris].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `laporan-pelanggaran-${periode.value}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="content">
    <div class="tp-stack">
      <section class="hero">
        <div class="hero-text">
          <span class="eyebrow">Laporan</span>
          <h1 class="hero-title">Laporan Pelanggaran</h1>
          <p class="hero-sub">Rekap pelanggaran berdasarkan kategori, kelas, dan murid.</p>
        </div>
        <div class="hero-actions tp-actions tp-no-print">
          <select v-model="periode" class="tp-select" aria-label="Periode laporan">
            <option value="minggu">7 hari terakhir</option>
            <option value="bulan">1 bulan terakhir</option>
            <option value="semester">Semester ini</option>
          </select>
          <button class="btn" type="button" @click="ekspor">Ekspor CSV</button>
          <button class="btn btn--primary" type="button" @click="cetak">Cetak laporan</button>
        </div>
      </section>

      <div class="tp-stats">
        <div class="tp-stat tp-stat--red">
          <div class="tp-stat-label">Total pelanggaran</div>
          <div class="tp-stat-value">{{ total.kejadian }}</div>
        </div>
        <div class="tp-stat tp-stat--amber">
          <div class="tp-stat-label">Total poin</div>
          <div class="tp-stat-value">{{ total.poin }}</div>
        </div>
        <div class="tp-stat tp-stat--violet">
          <div class="tp-stat-label">Murid terlibat</div>
          <div class="tp-stat-value">{{ total.murid }}</div>
        </div>
      </div>

      <div class="tp-two">
        <section class="tp-card">
          <h2 class="tp-card-title">Kategori pelanggaran</h2>
          <ul class="tp-bars">
            <li v-for="k in perKategori" :key="k.nama">
              <div class="tp-bar-head">
                <span>{{ k.nama }}</span>
                <span class="tp-muted">{{ k.jumlah }}x &middot; {{ k.poin }} poin</span>
              </div>
              <div class="tp-bar-track">
                <div class="tp-bar-fill" :style="{ width: (k.jumlah / maks(perKategori)) * 100 + '%' }" />
              </div>
            </li>
          </ul>
          <p v-if="!perKategori.length" class="tp-empty">Belum ada data pada periode ini.</p>
        </section>

        <section class="tp-card">
          <h2 class="tp-card-title">Kelas dengan pelanggaran terbanyak</h2>
          <ul class="tp-bars">
            <li v-for="k in perKelas" :key="k.nama">
              <div class="tp-bar-head">
                <span>{{ k.nama }}</span>
                <span class="tp-muted">{{ k.jumlah }}x &middot; {{ k.poin }} poin</span>
              </div>
              <div class="tp-bar-track">
                <div class="tp-bar-fill tp-bar-fill--violet" :style="{ width: (k.jumlah / maks(perKelas)) * 100 + '%' }" />
              </div>
            </li>
          </ul>
          <p v-if="!perKelas.length" class="tp-empty">Belum ada data pada periode ini.</p>
        </section>
      </div>

      <section class="tp-card">
        <h2 class="tp-card-title">Murid dengan poin tertinggi</h2>
        <div class="tp-table-wrap">
          <table class="tp-table">
            <thead>
              <tr>
                <th><span>Nama</span></th>
                <th><span>Jumlah pelanggaran</span></th>
                <th><span>Total poin</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in perMurid" :key="m.nama">
                <td class="tp-strong">{{ m.nama }}</td>
                <td>{{ m.jumlah }}</td>
                <td class="tp-strong">{{ m.poin }}</td>
              </tr>
            </tbody>
          </table>
          <p v-if="!perMurid.length" class="tp-empty">Belum ada data pada periode ini.</p>
        </div>
      </section>
    </div>
  </div>
</template>
