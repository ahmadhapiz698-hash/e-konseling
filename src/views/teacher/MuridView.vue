<script setup>
import { ref, computed } from 'vue'
import './teacher-pages.css'

// TODO: ganti data dummy ini dengan data dari services/ (API)
const murid = ref([
  { nis: '2024001', nama: 'Andi Pratama', kelas: 'XI IPA 1', poin: 15 },
  { nis: '2024002', nama: 'Siti Rahma', kelas: 'X IPS 2', poin: 0 },
  { nis: '2024003', nama: 'Budi Santoso', kelas: 'XII IPS 1', poin: 40 },
  { nis: '2024004', nama: 'Dewi Lestari', kelas: 'XI IPA 1', poin: 5 },
  { nis: '2024005', nama: 'Rizky Maulana', kelas: 'X IPS 2', poin: 25 },
  { nis: '2024006', nama: 'Nadia Putri', kelas: 'XII IPS 1', poin: 0 },
])

const q = ref('')
const kelas = ref('Semua')

const daftarKelas = computed(() => ['Semua', ...new Set(murid.value.map((m) => m.kelas))])

const rows = computed(() =>
  murid.value.filter(
    (m) =>
      (kelas.value === 'Semua' || m.kelas === kelas.value) &&
      (m.nama.toLowerCase().includes(q.value.toLowerCase()) || m.nis.includes(q.value)),
  ),
)

const stat = computed(() => ({
  total: murid.value.length,
  bersih: murid.value.filter((m) => m.poin === 0).length,
  perhatian: murid.value.filter((m) => m.poin >= 25).length,
}))

function status(poin) {
  if (poin === 0) return { label: 'Bersih', cls: 'tp-badge--ok' }
  if (poin < 25) return { label: 'Ringan', cls: 'tp-badge--warn' }
  return { label: 'Perlu perhatian', cls: 'tp-badge--bad' }
}
</script>

<template>
  <div class="content">
    <div class="tp-stack">
      <section class="hero">
        <div class="hero-text">
          <span class="eyebrow">Data Murid</span>
          <h1 class="hero-title">Murid</h1>
          <p class="hero-sub">Pantau murid beserta total poin pelanggarannya.</p>
        </div>
      </section>

      <div class="tp-stats">
        <div class="tp-stat tp-stat--violet">
          <div class="tp-stat-label">Total murid</div>
          <div class="tp-stat-value">{{ stat.total }}</div>
        </div>
        <div class="tp-stat tp-stat--green">
          <div class="tp-stat-label">Tanpa pelanggaran</div>
          <div class="tp-stat-value">{{ stat.bersih }}</div>
        </div>
        <div class="tp-stat tp-stat--red">
          <div class="tp-stat-label">Perlu perhatian</div>
          <div class="tp-stat-value">{{ stat.perhatian }}</div>
        </div>
      </div>

      <section class="tp-card">
        <div class="tp-toolbar">
          <input v-model="q" class="tp-input" type="search" placeholder="Cari nama atau NIS..." />
          <select v-model="kelas" class="tp-select" aria-label="Filter kelas">
            <option v-for="k in daftarKelas" :key="k" :value="k">{{ k }}</option>
          </select>
        </div>

        <div class="tp-table-wrap">
          <table class="tp-table">
            <thead>
              <tr>
                <th><span>NIS</span></th>
                <th><span>Nama</span></th>
                <th><span>Kelas</span></th>
                <th><span>Poin</span></th>
                <th><span>Status</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in rows" :key="m.nis">
                <td class="tp-muted">{{ m.nis }}</td>
                <td class="tp-strong">{{ m.nama }}</td>
                <td>{{ m.kelas }}</td>
                <td class="tp-strong">{{ m.poin }}</td>
                <td>
                  <span class="tp-badge" :class="status(m.poin).cls">{{ status(m.poin).label }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-if="!rows.length" class="tp-empty">
            Tidak ada murid yang cocok. Coba ubah kata kunci atau filter kelas.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
