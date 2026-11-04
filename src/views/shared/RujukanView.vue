<script setup>
import { ref, reactive, computed } from 'vue'
import { getSession } from '@/services/authService'
import { useToast } from '@/composables/useToast'
import { siswaTerlihat, rujukanTerlihat, kirimRujukan, ubahRujukan, namaSiswa, STATUS_RUJUKAN } from '@/services/store'

const toast = useToast()
const role = getSession()?.role
const isBK = role === 'counselor'
const cls = { Baru: 'warning', Diproses: 'info', 'Tindak lanjut': 'purple', Selesai: 'success' }
const rows = computed(() => rujukanTerlihat())
const form = reactive({ siswaId: '', alasan: '' })
const edit = reactive({})

function kirim() {
  try { kirimRujukan(form); toast.success('Rujukan terkirim ke Guru BK.'); form.siswaId = ''; form.alasan = '' }
  catch (e) { toast.error(e.message) }
}
function simpan(r) {
  const e = edit[r.id] || {}
  try { ubahRujukan(r.id, { status: e.status ?? r.status, tindakLanjut: e.tindakLanjut ?? r.tindakLanjut }); toast.success('Rujukan diperbarui.') }
  catch (err) { toast.error(err.message) }
}
const e = (r) => (edit[r.id] ||= { status: r.status, tindakLanjut: r.tindakLanjut })
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-text">
        <span class="eyebrow">Layanan BK</span>
        <h1 class="hero-title">Rujukan Siswa</h1>
        <p class="hero-sub" v-if="!isBK">Kirim rujukan ke Guru BK. Kamu hanya melihat status, bukan isi catatan konseling.</p>
      </div>
    </section>

    <section v-if="!isBK" class="card" style="margin-bottom:16px">
      <div class="card-head"><div class="card-title-wrap"><h2 class="card-title">Rujukan baru</h2></div></div>
      <div class="field"><label class="field-label" for="r-s">Siswa</label>
        <select id="r-s" v-model="form.siswaId" class="select"><option value="">Pilih siswa</option><option v-for="s in siswaTerlihat()" :key="s.id" :value="s.id">{{ s.nama }} ({{ s.kelas }})</option></select></div>
      <div class="field"><label class="field-label" for="r-a">Alasan yang relevan</label><textarea id="r-a" v-model="form.alasan" class="textarea" rows="3" placeholder="Apa yang kamu amati? Cukup fakta yang relevan."></textarea></div>
      <button class="btn btn--primary" type="button" @click="kirim">Kirim rujukan</button>
    </section>

    <section class="card">
      <div class="card-head"><div class="card-title-wrap"><h2 class="card-title">{{ isBK ? 'Rujukan masuk' : 'Rujukan saya' }}</h2></div><span class="badge primary">{{ rows.length }} rujukan</span></div>
      <div class="table-scroll">
        <table class="table">
          <thead><tr><th>Siswa</th><th>Dari</th><th>Tanggal</th><th>Alasan</th><th>Status</th><th v-if="isBK">Tindak lanjut</th></tr></thead>
          <tbody>
            <tr v-for="r in rows" :key="r.id">
              <td class="cell-name">{{ namaSiswa(r.siswaId) }}</td>
              <td>{{ r.dari }}</td>
              <td class="cell-date">{{ r.tanggal }}</td>
              <td>{{ r.alasan }}</td>
              <td v-if="!isBK"><span class="badge" :class="cls[r.status]">{{ r.status }}</span></td>
              <td v-if="isBK">
                <select v-model="e(r).status" class="select"><option v-for="s in STATUS_RUJUKAN" :key="s">{{ s }}</option></select>
              </td>
              <td v-if="isBK">
                <div class="row-actions"><input v-model="e(r).tindakLanjut" class="input" type="text" placeholder="Rencana tindak lanjut"><button class="btn btn--primary" type="button" @click="simpan(r)">Simpan</button></div>
              </td>
            </tr>
            <tr v-if="!rows.length"><td colspan="6" class="table-empty">Belum ada rujukan.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
