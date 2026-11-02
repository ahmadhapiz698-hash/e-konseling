<script setup>
import { computed } from 'vue'
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
  // Halaman aktif (dukung v-model)
  modelValue: { type: Number, default: 1 },
  // Jumlah seluruh data
  total: { type: Number, default: 0 },
  // Jumlah data per halaman (dukung v-model:per-page)
  perPage: { type: Number, default: 10 },
  // Pilihan jumlah data per halaman
  pageSizes: { type: Array, default: () => [10, 20, 50] },
  // Banyak nomor di kiri/kanan halaman aktif
  siblings: { type: Number, default: 1 },
  // Tampilkan teks "1–10 dari 47"
  showInfo: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'update:perPage', 'change'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))
const current = computed(() => Math.min(Math.max(1, props.modelValue), totalPages.value))

function go(page) {
  const target = Math.min(Math.max(1, page), totalPages.value)
  if (target === current.value) return
  emit('update:modelValue', target)
  emit('change', target)
}

// Ganti jumlah data per halaman -> balik ke halaman 1
const sizeProxy = computed({
  get: () => props.perPage,
  set: (value) => {
    emit('update:perPage', value)
    emit('update:modelValue', 1)
    emit('change', 1)
  },
})

// Daftar nomor halaman + elipsis
const pages = computed(() => {
  const tp = totalPages.value
  const c = current.value
  const s = props.siblings

  if (tp <= 5 + s * 2) {
    return Array.from({ length: tp }, (_, i) => i + 1)
  }

  const left = Math.max(2, c - s)
  const right = Math.min(tp - 1, c + s)
  const items = [1]

  if (left > 2) items.push('...')
  for (let i = left; i <= right; i++) items.push(i)
  if (right < tp - 1) items.push('...')
  items.push(tp)

  return items
})

const info = computed(() => {
  if (props.total === 0) return 'Tidak ada data'
  const start = (current.value - 1) * props.perPage + 1
  const end = Math.min(current.value * props.perPage, props.total)
  return `${start}–${end} dari ${props.total}`
})
</script>

<template>
  <nav class="app-pagination" aria-label="Navigasi halaman">
    <p v-if="showInfo" class="pagination-info">{{ info }}</p>

    <div class="pagination-controls">
      <label v-if="pageSizes.length" class="pagination-size">
        <select v-model.number="sizeProxy" aria-label="Jumlah per halaman">
          <option v-for="s in pageSizes" :key="s" :value="s">{{ s }}</option>
        </select>
        <span>per halaman</span>
      </label>

      <div class="pager">
        <button
          class="pager-btn"
          type="button"
          :disabled="current === 1"
          aria-label="Halaman sebelumnya"
          @click="go(current - 1)"
        >
          <AppIcon name="chevron-left" />
        </button>

        <template v-for="(p, i) in pages" :key="`${p}-${i}`">
          <span v-if="p === '...'" class="pager-ellipsis">…</span>
          <button
            v-else
            class="pager-btn"
            type="button"
            :class="{ 'is-active': p === current }"
            :aria-current="p === current ? 'page' : undefined"
            @click="go(p)"
          >
            {{ p }}
          </button>
        </template>

        <button
          class="pager-btn"
          type="button"
          :disabled="current === totalPages"
          aria-label="Halaman berikutnya"
          @click="go(current + 1)"
        >
          <AppIcon name="chevron-right" />
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.app-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.pagination-info {
  margin: 0;
  color: var(--t-muted, #64748b);
  font-size: 12.5px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.pagination-size {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--t-muted, #64748b);
  font-size: 12.5px;
}

.pagination-size select {
  border: 1px solid var(--border, #e4e8ef);
  border-radius: 7px;
  background: var(--bg-card, #fff);
  color: var(--t-base, #1e293b);
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 8px;
  cursor: pointer;
  outline: none;
}

.pagination-size select:hover {
  border-color: var(--t-light, #94a3b8);
}

.pagination-size select:focus {
  border-color: var(--primary, #2563eb);
  box-shadow: 0 0 0 3px var(--primary-soft, #eff6ff);
}

.pager-ellipsis {
  color: var(--t-light, #94a3b8);
  font-size: 12px;
  padding: 0 4px;
  user-select: none;
}

/* Mobile: sembunyikan teks "per halaman" agar tidak menghabiskan ruang */
@media (max-width: 720px) {
  .pagination-size span {
    display: none;
  }
}
</style>
