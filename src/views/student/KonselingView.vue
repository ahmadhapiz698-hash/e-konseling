<script setup>
import { ref, reactive, computed } from 'vue'
import { useToast } from '@/composables/useToast'
import AppModal from '@/components/AppModal.vue'
import AppIcon from '@/components/AppIcon.vue'
import { konselingTerlihat, ajukanKonseling, ubahPengajuan, hapusPengajuan } from '@/services/store'

const toast = useToast()
const rows = computed(() => konselingTerlihat())
const cls = { Baru: 'warning', Dijadwalkan: 'info', 'Dalam proses': 'purple', 'Tindak lanjut': 'warning', Selesai: 'success' }

// CREATE
const form = reactive({ topik: '', jadwal: '' })
function kirim() {
  try { ajukanKonseling(form); toast.success('Pengajuan terkirim. Guru BK akan menghubungi kamu.'); form.topik = ''; form.jadwal = '' }
  catch (e) { toast.error(e.message) }
}

// UPDATE
const editId = ref(null)
const edit = reactive({ topik: '', jadwal: '' })
function bukaEdit(k) { editId.value = k.id; edit.topik = k.topik; edit.jadwal = k.jadwal }
function simpanEdit() {
  try { ubahPengajuan(editId.value, edit); toast.success('Pengajuan diperbarui.'); editId.value = null }
  catch (e) { toast.error(e.message) }
}

// DELETE
const hapusId = ref(null)
function hapus() {
  try { hapusPengajuan(hapusId.value); toast.success('Pengajuan dibatalkan.'); hapusId.value = null }
  catch (e) { toast.error(e.message); hapusId.value = null }
}
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-text">
        <span class="eyebrow">Layanan BK</span>
        <h1 class="hero-title">Ajukan Konseling</h1>
        <p class="hero-sub">Ceritakan secukupnya. Pengajuan masih bisa diubah atau dibatalkan selama berstatus Baru.</p>
      </div>
    </section>

    <section class="card" style="margin-bottom:16px">
      <div class="field"><label class="field-label" for="s-t">Topik yang ingin dibicarakan</label><textarea id="s-t" v-model="form.topik" class="textarea" rows="3"></textarea></div>
      <div class="field"><label class="field-label" for="s-j">Jadwal yang kamu inginkan</label><input id="s-j" v-model="form.jadwal" class="input" type="date"></div>
      <button class="btn btn--primary" type="button" @click="kirim">Kirim pengajuan</button>
    </section>

    <section class="card">
      <div class="card-head"><div class="card-title-wrap"><h2 class="card-title">Riwayat pengajuan saya</h2></div></div>
      <div class="table-scroll">
        <table class="table">
          <thead><tr><th>Tanggal</th><th>Topik</th><th>Jadwal</th><th>Status</th><th style="text-align: right">Aksi</th></tr></thead>
          <tbody>
            <tr v-for="k in rows" :key="k.id">
              <td class="cell-date">{{ k.tanggal }}</td>
              <td>{{ k.topik }}</td>
              <td class="cell-date">{{ k.jadwal || 'Menunggu jadwal' }}</td>
              <td><span class="badge" :class="cls[k.status]">{{ k.status }}</span></td>
              <td style="text-align: right">
                <div class="row-actions" v-if="k.status === 'Baru'">
                  <button class="row-btn" type="button" aria-label="Ubah" @click="bukaEdit(k)"><AppIcon name="pencil" /></button>
                  <button class="row-btn danger" type="button" aria-label="Batalkan" @click="hapusId = k.id"><AppIcon name="trash" /></button>
                </div>
              </td>
            </tr>
            <tr v-if="!rows.length"><td colspan="5" class="table-empty">Belum ada pengajuan. Kirim yang pertama di atas.</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <AppModal :model-value="!!editId" title="Ubah pengajuan" size="md" @update:model-value="(v) => { if (!v) editId = null }">
      <div class="field"><label class="field-label" for="e-t">Topik</label><textarea id="e-t" v-model="edit.topik" class="textarea" rows="3"></textarea></div>
      <div class="field"><label class="field-label" for="e-j">Jadwal yang kamu inginkan</label><input id="e-j" v-model="edit.jadwal" class="input" type="date"></div>
      <template #footer>
        <button class="btn btn--ghost" type="button" @click="editId = null">Batal</button>
        <button class="btn btn--primary" type="button" @click="simpanEdit">Simpan perubahan</button>
      </template>
    </AppModal>

    <AppModal :model-value="!!hapusId" title="Batalkan pengajuan?" size="sm" @update:model-value="(v) => { if (!v) hapusId = null }">
      <p class="note">Pengajuan ini akan dihapus dari daftar. Kamu bisa membuat pengajuan baru kapan saja.</p>
      <template #footer>
        <button class="btn btn--ghost" type="button" @click="hapusId = null">Kembali</button>
        <button class="btn btn--primary" type="button" @click="hapus">Ya, batalkan</button>
      </template>
    </AppModal>
  </div>
</template>
