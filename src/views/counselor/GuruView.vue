<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import AppPagination from '@/components/AppPagination.vue'
import AppTable from '@/components/AppTable.vue'
import { useSearch } from '@/composables/useSearch'

const { keyword, setProvider, clearProvider } = useSearch()

const rows = [
  { id: 1, nama: 'Drs. H. Ahmad Subarjo', nip: '196804121994031001', mapel: 'Matematika', wali: 'XI IPA 1', status: 'Aktif' },
  { id: 2, nama: 'Siti Aminah, S.Pd.', nip: '197205102000032002', mapel: 'Bahasa Indonesia', wali: 'X IPS 2', status: 'Aktif' },
  { id: 3, nama: 'Budi Hartono, S.Pd.', nip: '198001152005011003', mapel: 'Fisika', wali: 'XII IPS 1', status: 'Aktif' },
  { id: 4, nama: 'Dewi Anggraeni, M.Pd.', nip: '198503222010012004', mapel: 'Biologi', wali: 'XI IPA 3', status: 'Aktif' },
  { id: 5, nama: 'Rizky Kurniawan, S.Pd.', nip: '199001102014011005', mapel: 'Kimia', wali: 'X IPA 2', status: 'Aktif' },
  { id: 6, nama: 'Nabila Rahmawati, S.Pd.', nip: '199206182015022006', mapel: 'Bahasa Inggris', wali: '', status: 'Cuti' },
  { id: 7, nama: 'Fajar Setiawan, S.Pd.', nip: '198811052013011007', mapel: 'Sejarah', wali: 'XII IPA 2', status: 'Aktif' },
  { id: 8, nama: 'Ayu Lestari, S.Pd.', nip: '199404202017012008', mapel: 'Ekonomi', wali: 'X IPS 1', status: 'Aktif' },
  { id: 9, nama: 'Hendra Gunawan, S.Pd.', nip: '198609142012011009', mapel: 'Penjaskes', wali: 'XI IPS 2', status: 'Aktif' },
  { id: 10, nama: 'Maya Sari, S.Pd.', nip: '199107072016012010', mapel: 'Sosiologi', wali: 'X IPA 1', status: 'Aktif' },
  { id: 11, nama: 'Dimas Prasetyo, S.Pd.', nip: '199309232018011011', mapel: 'Geografi', wali: 'XII IPS 1', status: 'Aktif' },
  { id: 12, nama: 'Rina Marlina, S.Pd.', nip: '199501122019012012', mapel: 'Seni Budaya', wali: '', status: 'Nonaktif' },
]

const statusClass = { Aktif: 'success', Cuti: 'warning', Nonaktif: 'danger' }

const guruColumns = [
  { key: 'nama', label: 'Nama', class: 'cell-name' },
  { key: 'nip', label: 'NIP', class: 'cell-mono' },
  { key: 'mapel', label: 'Mata Pelajaran' },
  { key: 'wali', label: 'Wali Kelas', formatter: (v) => v || '—' },
  { key: 'status', label: 'Status', align: 'right' },
]

const kpi = computed(() => {
  const count = (s) => rows.filter((r) => r.status === s).length
  const mapel = new Set(rows.map((r) => r.mapel)).size
  return [
    { key: 'primary', icon: 'graduation', label: 'Total Guru', value: String(rows.length), pill: 'flat', pillText: 'terdata', compare: 'semua mapel' },
    { key: 'primary', icon: 'book', label: 'Mata Pelajaran', value: String(mapel), pill: 'flat', pillText: 'mapel', compare: 'diampu' },
    { key: 'success', icon: 'users', label: 'Wali Kelas', value: String(rows.filter((r) => r.wali).length), pill: 'up', pillText: 'aktif', compare: 'dari total guru' },
    { key: 'warning', icon: 'alert', label: 'Cuti / Nonaktif', value: String(count('Cuti') + count('Nonaktif')), pill: 'down', pillText: 'tidak bertugas', compare: 'perlu pengganti' },
  ]
})

const mapelOptions = computed(() => ['Semua', ...new Set(rows.map((r) => r.mapel))])

const mapel = ref('Semua')
const page = ref(1)
const perPage = ref(10)

const filtered = computed(() => {
  const term = keyword.value.trim().toLowerCase()
  return rows.filter((r) => {
    const okMapel = mapel.value === 'Semua' || r.mapel === mapel.value
    const okTerm = !term || r.nama.toLowerCase().includes(term) || r.nip.includes(term) || r.mapel.toLowerCase().includes(term)
    return okMapel && okTerm
  })
})

const paged = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filtered.value.slice(start, start + perPage.value)
})

watch([keyword, mapel], () => {
  page.value = 1
})

onMounted(() => {
  setProvider('Guru', (q) => {
    const term = q.trim().toLowerCase()
    return rows
      .filter(
        (r) =>
          r.nama.toLowerCase().includes(term) ||
          r.nip.includes(term) ||
          r.mapel.toLowerCase().includes(term)
      )
      .slice(0, 50)
      .map((r) => ({ key: r.id, title: r.nama, subtitle: `${r.mapel} · ${r.wali || 'Bukan wali kelas'}` }))
  })
})
onUnmounted(clearProvider)
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-main">
        <div class="hero-icon">
          <AppIcon name="graduation" :size="24" />
        </div>
        <div class="hero-text">
          <span class="eyebrow">Data</span>
          <h1 class="hero-title">Daftar <span class="accent">Guru</span></h1>
        </div>
      </div>
    </section>

    <section class="kpi-grid" aria-label="Statistik guru">
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
            <h2 class="card-title">Guru &amp; Mata Pelajaran</h2>
          </div>
          <span class="badge primary">{{ filtered.length }} GURU</span>
        </div>

        <div class="data-toolbar">
          <div class="data-toolbar-right">
            <select v-model="mapel" class="select" aria-label="Filter mata pelajaran">
              <option v-for="m in mapelOptions" :key="m" :value="m">{{ m }}</option>
            </select>
          </div>
        </div>

        <AppTable :columns="guruColumns" :rows="paged" empty-text="Tidak ada guru.">
          <template #cell-status="{ row }">
            <span class="badge" :class="statusClass[row.status]">{{ row.status }}</span>
          </template>
        </AppTable>

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

:deep(.cell-mono) {
  color: var(--t-muted, #64748b);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
}
</style>
