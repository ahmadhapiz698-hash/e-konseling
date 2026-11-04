<script setup>
import { ref, computed } from 'vue'
import { getSession } from '@/services/authService'
import { useToast } from '@/composables/useToast'
import AppModal from '@/components/AppModal.vue'
import AppIcon from '@/components/AppIcon.vue'
import {
  state, siswaTerlihat, kejadianTerlihat, catatKejadian, validasiKejadian, batalkanKejadian,
  namaSiswa, kelasSiswa, aturanById, poinSiswa, tahapPoin,
} from '@/services/store'

const toast = useToast()
const role = getSession()?.role
const isBK = role === 'counselor'
const cls = { Diusulkan: 'warning', Divalidasi: 'success', Dibatalkan: 'danger' }
const kat = { Ringan: 'info', Sedang: 'warning', Berat: 'danger' }

const rows = computed(() => kejadianTerlihat())
const rekap = computed(() => siswaTerlihat().map((s) => ({ ...s, poin: poinSiswa(s.id) })).filter((s) => s.poin > 0).sort((a, b) => b.poin - a.poin))

const formOpen = ref(false)
const form = ref({ siswaId: '', aturanId: '', tanggal: new Date().toISOString().slice(0, 10), keterangan: '' })
function simpan() {
  try {
    catatKejadian(form.value)
    toast.success('Kejadian dicatat. Poin ditetapkan setelah divalidasi Guru BK.')
    formOpen.value = false
    form.value = { ...form.value, siswaId: '', aturanId: '', keterangan: '' }
  } catch (e) { toast.error(e.message) }
}

const batalId = ref(null)
const alasan = ref('')
function validasi(id) { try { validasiKejadian(id); toast.success('Poin divalidasi.') } catch (e) { toast.error(e.message) } }
function batalkan() {
  try { batalkanKejadian(batalId.value, alasan.value); toast.success('Dibatalkan dan tercatat di log.'); batalId.value = null; alasan.value = '' }
  catch (e) { toast.error(e.message) }
}
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-main">
        <div class="hero-text">
          <span class="eyebrow">Kedisiplinan</span>
          <h1 class="hero-title">Pelanggaran dan Poin</h1>
          <p class="hero-sub">Poin hanya alat bantu pembinaan. Tindak lanjut diputuskan oleh manusia, bukan otomatis oleh sistem.</p>
        </div>
      </div>
      <div class="hero-actions">
        <button class="btn btn--primary" type="button" @click="formOpen = true"><AppIcon name="plus" /> Catat kejadian</button>
      </div>
    </section>

    <section v-if="isBK || role === 'homeroom'" class="card" style="margin-bottom:16px">
      <div class="card-head"><div class="card-title-wrap"><h2 class="card-title">Rekap poin per siswa</h2></div></div>
      <p class="note">Saran tahap pembinaan mengikuti ambang contoh di dokumen (1–15, 16–30, 31–50, di atas 50). Sekolah menetapkan angka sendiri.</p>
      <div class="table-scroll">
        <table class="table">
          <thead><tr><th>Nama</th><th>Kelas</th><th>Poin</th><th>Saran tindak lanjut</th></tr></thead>
          <tbody>
            <tr v-for="s in rekap" :key="s.id"><td class="cell-name">{{ s.nama }}</td><td>{{ s.kelas }}</td><td>{{ s.poin }}</td><td>{{ tahapPoin(s.poin)?.tahap }}</td></tr>
            <tr v-if="!rekap.length"><td colspan="4" class="table-empty">Belum ada poin tervalidasi.</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="card">
      <div class="card-head"><div class="card-title-wrap"><h2 class="card-title">{{ role === 'teacher' ? 'Kejadian yang saya catat' : 'Catatan kejadian' }}</h2></div><span class="badge primary">{{ rows.length }} catatan</span></div>
      <div class="table-scroll">
        <table class="table">
          <thead><tr><th>Siswa</th><th>Kelas</th><th>Jenis</th><th>Kategori</th><th>Poin</th><th>Tanggal</th><th>Pencatat</th><th>Status</th><th v-if="isBK"></th></tr></thead>
          <tbody>
            <tr v-for="k in rows" :key="k.id">
              <td class="cell-name">{{ namaSiswa(k.siswaId) }}</td>
              <td>{{ kelasSiswa(k.siswaId) }}</td>
              <td>{{ aturanById(k.aturanId)?.nama }}<div v-if="k.keterangan" class="note" style="margin:0">{{ k.keterangan }}</div><div v-if="k.alasanBatal" class="note" style="margin:0">Dibatalkan: {{ k.alasanBatal }}</div></td>
              <td><span class="badge" :class="kat[aturanById(k.aturanId)?.kategori]">{{ aturanById(k.aturanId)?.kategori }}</span></td>
              <td>{{ k.poin ?? '-' }}</td>
              <td class="cell-date">{{ k.tanggal }}</td>
              <td>{{ k.pencatat }}</td>
              <td><span class="badge" :class="cls[k.status]">{{ k.status }}</span></td>
              <td v-if="isBK">
                <div class="row-actions" v-if="k.status !== 'Dibatalkan'">
                  <button v-if="k.status === 'Diusulkan'" class="btn btn--primary" type="button" @click="validasi(k.id)">Validasi</button>
                  <button class="btn btn--ghost" type="button" @click="batalId = k.id">Batalkan</button>
                </div>
              </td>
            </tr>
            <tr v-if="!rows.length"><td colspan="9" class="table-empty">Belum ada catatan kejadian.</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <AppModal v-model="formOpen" title="Catat kejadian" size="md">
      <div class="field"><label class="field-label" for="f-s">Siswa</label>
        <select id="f-s" v-model="form.siswaId" class="select"><option value="">Pilih siswa</option><option v-for="s in siswaTerlihat()" :key="s.id" :value="s.id">{{ s.nama }} ({{ s.kelas }})</option></select></div>
      <div class="field"><label class="field-label" for="f-j">Jenis pelanggaran</label>
        <select id="f-j" v-model="form.aturanId" class="select"><option value="">Pilih jenis</option><option v-for="a in state.aturan" :key="a.id" :value="a.id">{{ a.nama }} ({{ a.kategori }})</option></select></div>
      <div class="field"><label class="field-label" for="f-t">Tanggal kejadian</label><input id="f-t" v-model="form.tanggal" class="input" type="date"></div>
      <div class="field"><label class="field-label" for="f-k">Keterangan</label><textarea id="f-k" v-model="form.keterangan" class="textarea" rows="3" placeholder="Konteks singkat kejadian"></textarea></div>
      <template #footer>
        <button class="btn btn--ghost" type="button" @click="formOpen = false">Batal</button>
        <button class="btn btn--primary" type="button" @click="simpan">Simpan kejadian</button>
      </template>
    </AppModal>

    <AppModal :model-value="!!batalId" title="Batalkan catatan" size="sm" @close="batalId = null" @update:model-value="(v) => { if (!v) batalId = null }">
      <p class="note">Catatan tidak dihapus permanen. Pembatalan tercatat di log dengan alasan.</p>
      <div class="field"><label class="field-label" for="f-a">Alasan pembatalan</label><textarea id="f-a" v-model="alasan" class="textarea" rows="3"></textarea></div>
      <template #footer>
        <button class="btn btn--ghost" type="button" @click="batalId = null">Kembali</button>
        <button class="btn btn--primary" type="button" @click="batalkan">Batalkan catatan</button>
      </template>
    </AppModal>
  </div>
</template>
