<script setup>
import { ref, reactive, computed } from 'vue'
import { useToast } from '@/composables/useToast'
import AppModal from '@/components/AppModal.vue'
import {
  konselingTerlihat, ubahKonseling, catatanKonseling, bukaCatatan, tambahCatatan, namaSiswa, kelasSiswa, STATUS_KONSELING,
} from '@/services/store'

const toast = useToast()
const rows = computed(() => konselingTerlihat())
const cls = { Baru: 'warning', Dijadwalkan: 'info', 'Dalam proses': 'purple', 'Tindak lanjut': 'warning', Selesai: 'success' }

const aktif = ref(null)
const edit = reactive({ status: 'Baru', jadwal: '' })
const catatan = computed(() => (aktif.value ? catatanKonseling(aktif.value.id) : []))
const baru = ref('')

function buka(k) {
  aktif.value = k
  edit.status = k.status
  edit.jadwal = k.jadwal
  baru.value = ''
  bukaCatatan(k.id) // pembukaan catatan tercatat di log
}
function simpan() {
  try { ubahKonseling(aktif.value.id, edit); toast.success('Status dan jadwal diperbarui.') } catch (e) { toast.error(e.message) }
}
function tambah() {
  try { tambahCatatan(aktif.value.id, baru.value); baru.value = ''; toast.success('Catatan disimpan.') } catch (e) { toast.error(e.message) }
}
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-text">
        <span class="eyebrow">Layanan BK</span>
        <h1 class="hero-title">Konseling</h1>
        <p class="hero-sub">Pengajuan dari siswa, jadwal, dan catatan sesi. Isi catatan hanya bisa dibuka Guru BK.</p>
      </div>
    </section>
    <section class="card">
      <div class="card-head"><div class="card-title-wrap"><h2 class="card-title">Antrean konseling</h2></div><span class="badge primary">{{ rows.length }} kasus</span></div>
      <div class="table-scroll">
        <table class="table">
          <thead><tr><th>Siswa</th><th>Kelas</th><th>Topik</th><th>Jadwal</th><th>Status</th><th></th></tr></thead>
          <tbody>
            <tr v-for="k in rows" :key="k.id">
              <td class="cell-name">{{ namaSiswa(k.siswaId) }}</td>
              <td>{{ kelasSiswa(k.siswaId) }}</td>
              <td>{{ k.topik }}</td>
              <td class="cell-date">{{ k.jadwal || 'Belum dijadwalkan' }}</td>
              <td><span class="badge" :class="cls[k.status]">{{ k.status }}</span></td>
              <td><div class="row-actions"><button class="btn btn--primary" type="button" @click="buka(k)">Kelola</button></div></td>
            </tr>
            <tr v-if="!rows.length"><td colspan="6" class="table-empty">Belum ada pengajuan konseling.</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <AppModal :model-value="!!aktif" :title="aktif ? 'Konseling: ' + namaSiswa(aktif.siswaId) : ''" size="lg" @update:model-value="(v) => { if (!v) aktif = null }">
      <div class="field"><label class="field-label" for="k-st">Status kasus</label>
        <select id="k-st" v-model="edit.status" class="select"><option v-for="s in STATUS_KONSELING" :key="s">{{ s }}</option></select></div>
      <div class="field"><label class="field-label" for="k-j">Jadwal</label><input id="k-j" v-model="edit.jadwal" class="input" type="date"></div>
      <button class="btn btn--primary" type="button" style="margin-bottom:18px" @click="simpan">Simpan status dan jadwal</button>

      <h3 class="card-title" style="margin-bottom:8px">Catatan sesi (rahasia)</h3>
      <p v-for="c in catatan" :key="c.id" class="note"><strong>{{ c.tanggal }}</strong> — {{ c.isi }}</p>
      <p v-if="!catatan.length" class="note">Belum ada catatan.</p>
      <div class="field"><label class="field-label" for="k-c">Tambah catatan</label><textarea id="k-c" v-model="baru" class="textarea" rows="3"></textarea></div>
      <template #footer>
        <button class="btn btn--ghost" type="button" @click="aktif = null">Tutup</button>
        <button class="btn btn--primary" type="button" @click="tambah">Simpan catatan</button>
      </template>
    </AppModal>
  </div>
</template>
