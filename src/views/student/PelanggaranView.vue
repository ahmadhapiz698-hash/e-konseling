<script setup>
const kpi = [
  { label: 'Total Poin', value: '15', tone: 'warning' },
  { label: 'Total Pelanggaran', value: '3', tone: 'danger' },
  { label: 'Ringan', value: '2', tone: 'info' },
  { label: 'Sedang', value: '1', tone: 'purple' },
]

const rows = [
  { tanggal: '12 Okt 2026', jenis: 'Terlambat masuk', kategori: 'Ringan', poin: 5, oleh: 'Guru Piket', status: 'Disetujui' },
  { tanggal: '05 Okt 2026', jenis: 'Tidak mengerjakan tugas', kategori: 'Ringan', poin: 5, oleh: 'Bu Sri', status: 'Disetujui' },
  { tanggal: '28 Sep 2026', jenis: 'Membuat keributan di kelas', kategori: 'Sedang', poin: 5, oleh: 'Pak Andi', status: 'Diproses' },
]

const kategoriClass = { Ringan: 'info', Sedang: 'warning', Berat: 'danger' }
const statusClass = { Diproses: 'warning', Disetujui: 'success', Ditolak: 'danger' }
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-text">
        <span class="eyebrow">Pelanggaran Saya</span>
        <h1 class="hero-title">Daftar Pelanggaran</h1>
        <p class="hero-sub">Seluruh catatan pelanggaran dan poin yang kamu kumpulkan.</p>
      </div>
    </section>

    <section class="kpi-grid">
      <article v-for="k in kpi" :key="k.label" class="kpi-card" :class="`c-${k.tone}`">
        <div class="kpi-top">
          <div class="kpi-identity">
            <div class="kpi-label">{{ k.label }}</div>
          </div>
        </div>
        <div class="kpi-value">{{ k.value }}</div>
      </article>
    </section>

    <div class="grid">
      <section class="col-12 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Riwayat</span>
            <h2 class="card-title">Catatan Pelanggaran</h2>
          </div>
          <span class="badge primary">{{ rows.length }} RECORDS</span>
        </div>
        <div class="table-scroll">
          <table class="table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Jenis Pelanggaran</th>
                <th>Kategori</th>
                <th>Dicatat oleh</th>
                <th>Poin</th>
                <th style="text-align: right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rows" :key="r.tanggal">
                <td class="cell-date">{{ r.tanggal }}</td>
                <td class="cell-name">{{ r.jenis }}</td>
                <td><span class="badge" :class="kategoriClass[r.kategori]">{{ r.kategori }}</span></td>
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
