<script setup>
// Komponen tabel serbaguna.
//
// Pemakaian cepat:
//   <AppTable :columns="cols" :rows="rows" row-key="id">
//     <template #cell-status="{ row }">
//       <span class="badge" :class="statusClass[row.status]">{{ row.status }}</span>
//     </template>
//   </AppTable>
//
// Kolom (columns): array objek
//   { key, label, align?, width?, class?, headerClass?, formatter? }
//   - key       : kunci pada objek row (sekaligus nama slot "cell-<key>")
//   - label     : teks header
//   - align     : 'left' | 'center' | 'right'
//   - class     : kelas CSS untuk <td>
//   - headerClass: kelas CSS untuk <th>
//   - formatter : fn(value, row) => string  (opsional)
//
// Slot:
//   #cell-<key>  : render sel khusus, menerima { row, value, index }
//   #empty       : isi saat data kosong
import { computed } from 'vue'

const props = defineProps({
  // Daftar kolom.
  columns: { type: Array, required: true },
  // Daftar baris data.
  rows: { type: Array, default: () => [] },
  // Nama field / fungsi penentu key baris.
  rowKey: { type: [String, Function], default: 'id' },
  // Tampilkan status memuat.
  loading: { type: Boolean, default: false },
  loadingText: { type: String, default: 'Memuat data...' },
  emptyText: { type: String, default: 'Tidak ada data.' },
  // Kelas CSS baris: string atau fn(row).
  rowClass: { type: [String, Function], default: '' },
})

const colCount = computed(() => props.columns.length)

function keyOf(row, index) {
  if (typeof props.rowKey === 'function') return props.rowKey(row, index)
  return row?.[props.rowKey] ?? index
}

function classOf(row) {
  return typeof props.rowClass === 'function' ? props.rowClass(row) : props.rowClass
}

function cellValue(row, col) {
  const value = row?.[col.key]
  return typeof col.formatter === 'function' ? col.formatter(value, row) : value
}

function alignStyle(align) {
  return align ? { textAlign: align } : undefined
}
</script>

<template>
  <div class="table-scroll">
    <table class="table">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="col.headerClass"
            :style="alignStyle(col.align)"
            :scope="col.scope || 'col'"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="loading">
          <td :colspan="colCount" class="table-empty">{{ loadingText }}</td>
        </tr>

        <template v-else>
          <tr v-for="(row, index) in rows" :key="keyOf(row, index)" :class="classOf(row)">
            <td
              v-for="col in columns"
              :key="col.key"
              :class="col.class"
              :style="alignStyle(col.align)"
            >
              <slot :name="`cell-${col.key}`" :row="row" :value="row?.[col.key]" :index="index">
                {{ cellValue(row, col) }}
              </slot>
            </td>
          </tr>

          <tr v-if="!rows.length">
            <td :colspan="colCount" class="table-empty">
              <slot name="empty">{{ emptyText }}</slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-empty {
  color: var(--t-muted, #64748b);
  padding: 24px 0;
  text-align: center;
}
</style>
