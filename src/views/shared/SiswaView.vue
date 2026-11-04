<script setup>
import { ref, reactive, computed } from 'vue'
import { getSession } from '@/services/authService'
import { useToast } from '@/composables/useToast'
import AppModal from '@/components/AppModal.vue'
import AppIcon from '@/components/AppIcon.vue'
import { state, siswaTerlihat, poinSiswa, tahapPoin, tambahSiswa, ubahSiswa, hapusSiswa } from '@/services/store'

const toast = useToast()
const role = getSession()?.role
const isBK = role === 'counselor' // hanya Guru BK yang boleh CRUD data siswa
const lihatPoin = ['counselor', 'homeroom'].includes(role)
const judul = role === 'homeroom' ? 'Siswa Kelas Saya' : 'Data Siswa'
const q = ref('')
const rows = computed(() => {
  const t = q.value.trim().toLowerCase()
  return siswaTerlihat().filter((s) => !t || s.nama.toLowerCase().includes(t) || s.kelas.toLowerCase().includes(t))
})
const daftarKelas = computed(() => [...new Set(state.siswa.map((s) => s.kelas))])

// Create + Update memakai satu form
const formOpen = ref(false)
const editId = ref(null)
const form = reactive({ nama: '', nisn: '', kelas: '', jk: 'L' })
function bukaTambah() { editId.value = null; Object.assign(form, { nama: '', nisn: '', kelas: '', jk: 'L' }); formOpen.value = true }
function bukaEdit(s) { editId.value = s.id; Object.assign(form, { nama: s.nama, nisn: s.nisn, kelas: s.kelas, jk: s.jk }); formOpen.value = true }
function simpan() {
  try {
    if (editId.value) { ubahSiswa(editId.value, form); toast.success('Data siswa diperbarui.') }
    else { tambahSiswa(form); toast.success('Siswa ditambahkan.') }
    formOpen.value = false
  } catch (e) { toast.error(e.message) }
}

// Delete
const hapusTarget = ref(null)
function hapus() {
  try { hapusSiswa(hapusTarget.value.id); toast.success('Siswa dihapus.') } catch (e) { toast.error(e.message) }
  hapusTarget.value = null
}
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-main">
        <div class="hero-text">
          <span class="eyebrow">Data Master</span>
          <h1 class="hero-title">{{ judul }}</h1>
          <p class="hero-sub" v-if="role === 'teacher'">Hanya data minimum yang dibutuhkan untuk tugas mengajar (hanya lihat).</p>
          <p class="hero-sub" v-else-if="role === 'homeroom'">Siswa di kelas yang kamu ampu (hanya lihat).</p>
        </div>
      </div>
      <div class="hero-actions" v-if="isBK">
        <button class="btn btn--primary" type="button" @click="bukaTambah"><AppIcon name="plus" /> Tambah siswa</button>
      </div>
    </section>

    <section class="card">
      <div class="data-toolbar"><input v-model="q" class="input" type="text" placeholder="Cari nama atau kelas..."></div>
      <div class="table-scroll">
        <table class="table">
          <thead><tr><th>Nama</th><th v-if="role !== 'teacher'">NISN</th><th>Kelas</th><th v-if="lihatPoin">Poin pelanggaran</th><th v-if="lihatPoin">Saran pendampingan</th><th v-if="isBK" style="text-align: right">Aksi</th></tr></thead>
          <tbody>
            <tr v-for="s in rows" :key="s.id">
              <td class="cell-name">{{ s.nama }}</td>
              <td v-if="role !== 'teacher'">{{ s.nisn }}</td>
              <td>{{ s.kelas }}</td>
              <td v-if="lihatPoin">{{ poinSiswa(s.id) }}</td>
              <td v-if="lihatPoin">{{ tahapPoin(poinSiswa(s.id))?.tahap || '-' }}</td>
              <td v-if="isBK" style="text-align: right"><div class="row-actions"><button class="row-btn" type="button" aria-label="Ubah" @click="bukaEdit(s)"><AppIcon name="pencil" /></button><button class="row-btn danger" type="button" aria-label="Hapus" @click="hapusTarget = s"><AppIcon name="trash" /></button></div></td>
            </tr>
            <tr v-if="!rows.length"><td colspan="6" class="table-empty">Tidak ada siswa.</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <AppModal v-model="formOpen" :title="editId ? 'Ubah data siswa' : 'Tambah siswa'" size="md">
      <div class="field"><label class="field-label" for="sw-n">Nama lengkap</label><input id="sw-n" v-model="form.nama" class="input" type="text"></div>
      <div class="field"><label class="field-label" for="sw-i">NISN</label><input id="sw-i" v-model="form.nisn" class="input" type="text" inputmode="numeric"></div>
      <div class="field"><label class="field-label" for="sw-k">Kelas</label><input id="sw-k" v-model="form.kelas" class="input" type="text" list="daftar-kelas" placeholder="Contoh: Kelas XI IPA 1"><datalist id="daftar-kelas"><option v-for="k in daftarKelas" :key="k" :value="k" /></datalist></div>
      <div class="field"><label class="field-label" for="sw-j">Jenis kelamin</label><select id="sw-j" v-model="form.jk" class="select"><option value="L">Laki-laki</option><option value="P">Perempuan</option></select></div>
      <template #footer>
        <button class="btn btn--ghost" type="button" @click="formOpen = false">Batal</button>
        <button class="btn btn--primary" type="button" @click="simpan">{{ editId ? 'Simpan perubahan' : 'Tambah siswa' }}</button>
      </template>
    </AppModal>

    <AppModal :model-value="!!hapusTarget" title="Hapus siswa?" size="sm" @update:model-value="(v) => { if (!v) hapusTarget = null }">
      <p class="note">{{ hapusTarget?.nama }} akan dihapus dari data siswa. Siswa yang sudah punya riwayat konseling, rujukan, atau pelanggaran tidak bisa dihapus.</p>
      <template #footer>
        <button class="btn btn--ghost" type="button" @click="hapusTarget = null">Kembali</button>
        <button class="btn btn--primary" type="button" @click="hapus">Ya, hapus</button>
      </template>
    </AppModal>
  </div>
</template>
