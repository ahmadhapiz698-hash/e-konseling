import { ref } from 'vue'

// State pencarian global yang dipakai bersama header (modal) dan halaman aktif.
// Halaman aktif mendaftarkan "provider" -> fungsi pencarian sesuai konteksnya
// (mis. halaman Murid mencari murid, halaman Guru mencari guru).
const keyword = ref('')
const scope = ref('')
const results = ref([])

let provider = null

export function useSearch() {
  return {
    keyword,
    scope,
    results,
    // label: nama konteks (mis. "Murid"), fn: (query) => array hasil
    setProvider(label, fn) {
      scope.value = label
      provider = fn
    },
    clearProvider() {
      scope.value = ''
      provider = null
      results.value = []
    },
    // Jalankan pencarian: simpan kata kunci & hitung hasil dari provider aktif.
    run(q) {
      keyword.value = q
      if (!q || !provider) {
        results.value = []
        return
      }
      try {
        results.value = provider(q) || []
      } catch {
        results.value = []
      }
    },
    clear() {
      keyword.value = ''
      results.value = []
    },
  }
}
