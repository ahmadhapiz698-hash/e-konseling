<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import AppPagination from '@/components/AppPagination.vue'
import { getPublicSiswa } from '@/services/siswaService'
import { useSearch } from '@/composables/useSearch'
import { isDemoSession } from '@/services/authService'
import { demoSiswa } from '@/services/demoData'

const { keyword, setProvider, clearProvider } = useSearch()

// Ambil tingkat (X / XI / XII) dari nama rombel, mis. "Kelas X TO2" -> "X".
function tingkatOf(nama) {
  const token = String(nama || '')
    .split(/\s+/)
    .find((t) => /^X(I{0,2})$/i.test(t))
  return token ? token.toUpperCase() : ''
}

const rows = ref([])
const loading = ref(false)
const error = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    if (isDemoSession()) {
      const data = demoSiswa
      rows.value = data.map((s) => ({
        id: s.id,
        nama: s.nama || '-',
        nisn: s.nisn || '-',
        nipd: s.nipd || '-',
        kelas: s.nama_rombel || s.rombel || '-',
        tingkat: tingkatOf(s.nama_rombel || s.rombel),
        jenis_kelamin: s.jenis_kelamin || '',
      }))
      return
    }
    const res = await getPublicSiswa()
    const data = Array.isArray(res?.data) ? res.data : []
    rows.value = data.map((s) => ({
      id: s.id,
      nama: s.nama || '-',
      nisn: s.nisn || '-',
      nipd: s.nipd || '-',
      kelas: s.nama_rombel || '-',
      tingkat: tingkatOf(s.nama_rombel),
      jenis_kelamin: s.jenis_kelamin || '',
    }))
  } catch (err) {
    error.value = err?.message || 'Gagal memuat data murid.'
    rows.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  load()
  setProvider('Murid', (q) => {
    const term = q.trim().toLowerCase()
    return rows.value
      .filter(
        (r) =>
          r.nama.toLowerCase().includes(term) ||
          r.nisn.toLowerCase().includes(term) ||
          r.nipd.toLowerCase().includes(term) ||
          r.kelas.toLowerCase().includes(term)
      )
      .slice(0, 50)
      .map((r) => ({ key: r.id, title: r.nama, subtitle: `${r.kelas} · NISN ${r.nisn}` }))
  })
})
onUnmounted(clearProvider)

const jkLabel = { L: 'Laki-laki', P: 'Perempuan' }
const jkClass = { L: 'info', P: 'purple' }

const TINGKAT_ORDER = ['X', 'XI', 'XII']
const tingkatOptions = computed(() =>
  [...new Set(rows.value.map((r) => r.tingkat).filter(Boolean))].sort(
    (a, b) => TINGKAT_ORDER.indexOf(a) - TINGKAT_ORDER.indexOf(b)
  )
)

const kelasOptions = computed(() => {
  const counts = new Map()
  for (const r of rows.value) {
    if (!r.kelas) continue
    if (tingkat.value !== 'Semua' && r.tingkat !== tingkat.value) continue
    counts.set(r.kelas, (counts.get(r.kelas) || 0) + 1)
  }
  return [...counts.entries()]
    .map(([nama, count]) => ({ nama, count }))
    .sort((a, b) => a.nama.localeCompare(b.nama, 'id', { numeric: true, sensitivity: 'base' }))
})

const tingkat = ref('Semua')
const kelas = ref('Semua')
const page = ref(1)
const perPage = ref(10)

// Data hanya ditampilkan bila sudah ada filter (tingkat/kelas) atau pencarian.
const hasFilter = computed(
  () => tingkat.value !== 'Semua' || kelas.value !== 'Semua' || keyword.value.trim() !== ''
)

const filtered = computed(() => {
  if (!hasFilter.value) return []
  const term = keyword.value.trim().toLowerCase()
  return rows.value.filter((r) => {
    const okTingkat = tingkat.value === 'Semua' || r.tingkat === tingkat.value
    const okKelas = kelas.value === 'Semua' || r.kelas === kelas.value
    const okTerm =
      !term ||
      r.nama.toLowerCase().includes(term) ||
      r.nisn.toLowerCase().includes(term) ||
      r.nipd.toLowerCase().includes(term) ||
      r.kelas.toLowerCase().includes(term)
    return okTingkat && okKelas && okTerm
  })
})

const paged = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filtered.value.slice(start, start + perPage.value)
})

watch(tingkat, () => {
  kelas.value = 'Semua'
})
watch([kelas, keyword], () => {
  page.value = 1
})
</script>

<template>
  <div class="content">
    <section class="hero hero--accent">
      <div class="hero-main">
        <div class="hero-icon">
          <AppIcon name="users" :size="24" />
        </div>
        <div class="hero-text">
          <span class="eyebrow">Data</span>
          <h1 class="hero-title">Daftar <span class="accent">Murid</span></h1>
        </div>
      </div>
      <div class="hero-actions">
        <button class="btn btn--ghost" type="button" :disabled="loading" @click="load">
          <AppIcon name="refresh" />
          Muat Ulang
        </button>
      </div>
    </section>

    <div class="grid">
      <section class="col-12 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Daftar</span>
            <h2 class="card-title">Murid Aktif</h2>
          </div>
          <span class="card-count">{{ filtered.length }} Murid</span>
        </div>

        <div class="data-toolbar">
          <div class="data-toolbar-right">
            <select v-model="tingkat" class="select" aria-label="Filter tingkat">
              <option value="Semua">Semua Tingkat</option>
              <option v-for="t in tingkatOptions" :key="t" :value="t">Tingkat {{ t }}</option>
            </select>
            <select v-model="kelas" class="select" aria-label="Filter kelas">
              <option value="Semua">Semua Kelas</option>
              <option v-for="k in kelasOptions" :key="k.nama" :value="k.nama">{{ k.nama }} ({{ k.count }})</option>
            </select>
          </div>
        </div>

        <div v-if="error" class="data-error">
          <AppIcon name="alert-circle" />
          <span>{{ error }}</span>
          <button class="btn btn--ghost" type="button" @click="load">Coba lagi</button>
        </div>

        <div class="table-scroll">
          <table class="table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>NISN</th>
                <th>NIPD</th>
                <th>Kelas</th>
                <th style="text-align: right">Jenis Kelamin</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="5" class="table-empty">Memuat data murid...</td>
              </tr>
              <tr v-else-if="!hasFilter">
                <td colspan="5" class="table-empty">Pilih tingkat atau kelas untuk menampilkan data.</td>
              </tr>
              <template v-else>
                <tr v-for="r in paged" :key="r.id">
                  <td class="cell-name">{{ r.nama }}</td>
                  <td class="cell-mono">{{ r.nisn }}</td>
                  <td class="cell-mono">{{ r.nipd }}</td>
                  <td>{{ r.kelas }}</td>
                  <td style="text-align: right">
                    <span class="badge" :class="jkClass[r.jenis_kelamin] || 'primary'">
                      {{ jkLabel[r.jenis_kelamin] || '-' }}
                    </span>
                  </td>
                </tr>
                <tr v-if="!paged.length">
                  <td colspan="5" class="table-empty">Tidak ada murid.</td>
                </tr>
              </template>
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
.data-toolbar {
  justify-content: flex-end;
}

.card-foot {
  border-top: 1px solid var(--border-soft, #eef1f5);
  margin-top: 16px;
  padding-top: 14px;
}

.cell-mono {
  color: var(--t-muted, #64748b);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
}

.card-count {
  color: var(--t-muted, #64748b);
  font-size: 12.5px;
  font-weight: 600;
}

.table-empty {
  color: var(--t-muted, #64748b);
  padding: 24px 0;
  text-align: center;
}

.data-error {
  align-items: center;
  background: var(--danger-soft, #fef2f2);
  border: 1px solid var(--danger, #ef4444);
  border-radius: 10px;
  color: var(--danger, #ef4444);
  display: flex;
  font-size: 13px;
  gap: 10px;
  margin-bottom: 14px;
  padding: 12px 14px;
}

.data-error .btn {
  margin-left: auto;
}
</style>
