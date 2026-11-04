// Store demo E-Konseling (Tahap 1 / MVP). Data disimpan di localStorage.
// CATATAN: pembatasan peran di sini hanya simulasi frontend. Di produksi,
// semua pengecekan WAJIB diulang di backend (lihat README-Aplikasi-BK.md bagian 7 & 9).
import { reactive, watch } from 'vue'
import { demoSiswa } from './demoData'
import { getSession } from './authService'

const KEY = 'ekonseling-data-v1'
const hari = () => new Date().toISOString().slice(0, 10)
const uid = (p) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5)

export const STATUS_KONSELING = ['Baru', 'Dijadwalkan', 'Dalam proses', 'Tindak lanjut', 'Selesai']
export const STATUS_RUJUKAN = ['Baru', 'Diproses', 'Tindak lanjut', 'Selesai']

// Bobot hanya contoh; sekolah menetapkan sendiri (dokumen bagian 3.13).
const aturan = [
  { id: 'a1', nama: 'Terlambat masuk', kategori: 'Ringan', bobot: 5 },
  { id: 'a2', nama: 'Tidak mengerjakan tugas', kategori: 'Ringan', bobot: 5 },
  { id: 'a3', nama: 'Atribut tidak lengkap', kategori: 'Ringan', bobot: 3 },
  { id: 'a4', nama: 'Keluar kelas tanpa izin', kategori: 'Sedang', bobot: 10 },
  { id: 'a5', nama: 'Membuat keributan', kategori: 'Sedang', bobot: 15 },
  { id: 'a6', nama: 'Bolos pelajaran', kategori: 'Berat', bobot: 25 },
]
export const AMBANG = [
  { min: 1, max: 15, tahap: 'Pembinaan dan teguran oleh guru atau wali kelas' },
  { min: 16, max: 30, tahap: 'Konseling individu oleh Guru BK' },
  { min: 31, max: 50, tahap: 'Pemanggilan orang tua dan penyusunan rencana pembinaan' },
  { min: 51, max: Infinity, tahap: 'Rapat kasus (Guru BK, wali kelas, kesiswaan/pimpinan)' },
]

const seed = () => ({
  siswa: demoSiswa.map((s) => ({ id: s.id, nama: s.nama, nisn: s.nisn, kelas: s.rombel, jk: s.jenis_kelamin })),
  aturan,
  konseling: [
    { id: 'k1', siswaId: 's1', topik: 'Sulit fokus saat belajar', jadwal: '2026-11-05', status: 'Dijadwalkan', tanggal: '2026-11-01' },
  ],
  catatan: [
    { id: 'c1', konselingId: 'k1', isi: '(Contoh) Sesi awal: siswa menyampaikan kesulitan fokus. Rencana: teknik belajar terjadwal.', oleh: 'bk', tanggal: '2026-11-01' },
  ],
  rujukan: [
    { id: 'r1', siswaId: 's4', dari: 'Guru', dariUser: 'guru', peran: 'teacher', alasan: 'Sering tidak hadir di jam pertama', status: 'Baru', tindakLanjut: '', tanggal: '2026-11-02' },
  ],
  kejadian: [
    { id: 'j1', siswaId: 's1', aturanId: 'a1', tanggal: '2026-10-12', pencatat: 'Guru', pencatatUser: 'guru', keterangan: 'Terlambat 15 menit', status: 'Divalidasi', poin: 5, validator: 'bk' },
    { id: 'j2', siswaId: 's1', aturanId: 'a5', tanggal: '2026-10-20', pencatat: 'Wali Kelas', pencatatUser: 'walikelas', keterangan: 'Ribut saat pelajaran', status: 'Divalidasi', poin: 15, validator: 'bk' },
    { id: 'j3', siswaId: 's1', aturanId: 'a2', tanggal: '2026-11-01', pencatat: 'Guru', pencatatUser: 'guru', keterangan: 'Tugas tidak dikumpulkan', status: 'Diusulkan', poin: null },
    { id: 'j4', siswaId: 's3', aturanId: 'a6', tanggal: '2026-10-30', pencatat: 'Guru', pencatatUser: 'guru', keterangan: 'Tidak masuk kelas', status: 'Divalidasi', poin: 25, validator: 'bk' },
    { id: 'j5', siswaId: 's3', aturanId: 'a4', tanggal: '2026-11-02', pencatat: 'Wali Kelas', pencatatUser: 'walikelas', keterangan: 'Keluar kelas tanpa izin', status: 'Divalidasi', poin: 10, validator: 'bk' },
  ],
  logs: [],
})

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (raw && raw.siswa) return raw
  } catch { /* abaikan, pakai seed */ }
  return seed()
}

export const state = reactive(load())
watch(state, () => { try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* penyimpanan penuh/diblokir */ } }, { deep: true })

export function resetDemo() {
  Object.assign(state, seed())
}

const me = () => getSession() || {}
function need(...roles) {
  if (!roles.includes(me().role)) throw new Error('Akses ditolak untuk peran ini.')
}
function catat(aksi) {
  const s = me()
  state.logs.unshift({ id: uid('l'), waktu: new Date().toLocaleString('id-ID'), pengguna: `${s.label || '-'} (${s.username || '-'})`, aksi })
}

export const siswaById = (id) => state.siswa.find((s) => s.id === id)
export const namaSiswa = (id) => siswaById(id)?.nama || '-'
export const kelasSiswa = (id) => siswaById(id)?.kelas || '-'
export const aturanById = (id) => state.aturan.find((a) => a.id === id)

// Poin pelanggaran = hanya yang sudah divalidasi Guru BK; yang dibatalkan tidak dihitung (tidak dihapus).
export const poinSiswa = (id) => state.kejadian.filter((k) => k.siswaId === id && k.status === 'Divalidasi').reduce((n, k) => n + (k.poin || 0), 0)
export const tahapPoin = (p) => AMBANG.find((a) => p >= a.min && p <= a.max) || null

export function siswaTerlihat() {
  const s = me()
  if (s.role === 'counselor' || s.role === 'teacher') return state.siswa
  if (s.role === 'homeroom') return state.siswa.filter((x) => x.kelas === s.kelas)
  if (s.role === 'student') return state.siswa.filter((x) => x.id === s.studentId)
  return []
}

// ---- Data siswa (CRUD, hanya Guru BK)
export function tambahSiswa({ nama, nisn, kelas, jk }) {
  need('counselor')
  if (!nama?.trim() || !kelas?.trim()) throw new Error('Nama dan kelas wajib diisi.')
  if (nisn && state.siswa.some((x) => x.nisn === nisn.trim())) throw new Error('NISN sudah terdaftar.')
  state.siswa.push({ id: uid('s'), nama: nama.trim(), nisn: (nisn || '').trim(), kelas: kelas.trim(), jk: jk || 'L' })
  catat(`Menambah siswa ${nama.trim()}`)
}
export function ubahSiswa(id, { nama, nisn, kelas, jk }) {
  need('counselor')
  const s = siswaById(id)
  if (!s) throw new Error('Siswa tidak ditemukan.')
  if (!nama?.trim() || !kelas?.trim()) throw new Error('Nama dan kelas wajib diisi.')
  if (nisn && state.siswa.some((x) => x.id !== id && x.nisn === nisn.trim())) throw new Error('NISN sudah dipakai siswa lain.')
  Object.assign(s, { nama: nama.trim(), nisn: (nisn || '').trim(), kelas: kelas.trim(), jk: jk || s.jk })
  catat(`Mengubah data siswa ${s.nama}`)
}
export function hapusSiswa(id) {
  need('counselor')
  const s = siswaById(id)
  if (!s) return
  const terkait = [state.konseling, state.rujukan, state.kejadian].some((l) => l.some((x) => x.siswaId === id))
  if (terkait) throw new Error('Siswa punya riwayat konseling/rujukan/pelanggaran, jadi tidak boleh dihapus (riwayat harus tetap tersimpan).')
  state.siswa.splice(state.siswa.indexOf(s), 1)
  catat(`Menghapus siswa ${s.nama}`)
}

// ---- Konseling
export function konselingTerlihat() {
  const s = me()
  if (s.role === 'counselor') return state.konseling
  if (s.role === 'student') return state.konseling.filter((k) => k.siswaId === s.studentId)
  return []
}
export function ajukanKonseling({ topik, jadwal }) {
  need('student')
  if (!topik?.trim()) throw new Error('Topik wajib diisi.')
  state.konseling.unshift({ id: uid('k'), siswaId: me().studentId, topik: topik.trim(), jadwal: jadwal || '', status: 'Baru', tanggal: hari() })
  catat('Siswa mengajukan konseling')
}
// Siswa hanya boleh mengubah/membatalkan pengajuan MILIKNYA yang masih berstatus Baru.
function pengajuanSendiri(id) {
  const k = state.konseling.find((x) => x.id === id)
  if (!k || k.siswaId !== me().studentId) throw new Error('Pengajuan tidak ditemukan.')
  if (k.status !== 'Baru') throw new Error('Pengajuan sudah diproses Guru BK dan tidak bisa diubah.')
  return k
}
export function ubahPengajuan(id, { topik, jadwal }) {
  need('student')
  if (!topik?.trim()) throw new Error('Topik wajib diisi.')
  const k = pengajuanSendiri(id)
  k.topik = topik.trim()
  k.jadwal = jadwal || ''
  catat('Siswa mengubah pengajuan konseling')
}
export function hapusPengajuan(id) {
  need('student')
  const k = pengajuanSendiri(id)
  state.konseling.splice(state.konseling.indexOf(k), 1)
  state.catatan = state.catatan.filter((c) => c.konselingId !== id)
  catat('Siswa membatalkan pengajuan konseling')
}
export function ubahKonseling(id, { status, jadwal }) {
  need('counselor')
  const k = state.konseling.find((x) => x.id === id)
  if (!k) return
  k.status = status
  k.jadwal = jadwal || ''
  catat(`Mengubah konseling ${namaSiswa(k.siswaId)} -> ${status}`)
}
export function catatanKonseling(konselingId) {
  if (me().role !== 'counselor') return [] // wali kelas, guru mapel, siswa: tidak ada akses
  return state.catatan.filter((c) => c.konselingId === konselingId)
}
export function bukaCatatan(konselingId) {
  need('counselor')
  catat(`Membuka catatan konseling ${konselingId}`)
}
export function tambahCatatan(konselingId, isi) {
  need('counselor')
  if (!isi?.trim()) throw new Error('Isi catatan wajib diisi.')
  state.catatan.push({ id: uid('c'), konselingId, isi: isi.trim(), oleh: me().username, tanggal: hari() })
  catat(`Menambah catatan konseling ${konselingId}`)
}

// ---- Rujukan
export function rujukanTerlihat() {
  const s = me()
  if (s.role === 'counselor') return state.rujukan
  if (s.role === 'homeroom' || s.role === 'teacher') return state.rujukan.filter((r) => r.dariUser === s.username)
  return []
}
export function kirimRujukan({ siswaId, alasan }) {
  need('homeroom', 'teacher')
  if (!siswaId || !alasan?.trim()) throw new Error('Pilih siswa dan isi alasan rujukan.')
  const s = me()
  state.rujukan.unshift({ id: uid('r'), siswaId, dari: s.label, dariUser: s.username, peran: s.role, alasan: alasan.trim(), status: 'Baru', tindakLanjut: '', tanggal: hari() })
  catat(`Rujukan baru untuk ${namaSiswa(siswaId)}`)
}
export function ubahRujukan(id, { status, tindakLanjut }) {
  need('counselor')
  const r = state.rujukan.find((x) => x.id === id)
  if (!r) return
  r.status = status
  r.tindakLanjut = tindakLanjut || ''
  catat(`Rujukan ${namaSiswa(r.siswaId)} -> ${status}`)
}

// ---- Kejadian / poin pelanggaran
export function kejadianTerlihat() {
  const s = me()
  if (s.role === 'counselor') return state.kejadian
  if (s.role === 'homeroom') return state.kejadian.filter((k) => kelasSiswa(k.siswaId) === s.kelas)
  if (s.role === 'teacher') return state.kejadian.filter((k) => k.pencatatUser === s.username)
  if (s.role === 'student') return state.kejadian.filter((k) => k.siswaId === s.studentId && k.status === 'Divalidasi')
  return []
}
export function catatKejadian({ siswaId, aturanId, tanggal, keterangan }) {
  need('counselor', 'homeroom', 'teacher')
  if (!siswaId || !aturanId) throw new Error('Pilih siswa dan jenis pelanggaran.')
  const s = me()
  state.kejadian.unshift({ id: uid('j'), siswaId, aturanId, tanggal: tanggal || hari(), pencatat: s.label, pencatatUser: s.username, keterangan: keterangan || '', status: 'Diusulkan', poin: null })
  catat(`Mencatat kejadian ${namaSiswa(siswaId)}: ${aturanById(aturanId)?.nama}`)
}
export function validasiKejadian(id) {
  need('counselor')
  const k = state.kejadian.find((x) => x.id === id)
  if (!k || k.status !== 'Diusulkan') return
  k.status = 'Divalidasi'
  k.poin = aturanById(k.aturanId)?.bobot || 0
  k.validator = me().username
  catat(`Validasi poin ${k.poin} untuk ${namaSiswa(k.siswaId)}`)
}
export function batalkanKejadian(id, alasan) {
  need('counselor')
  if (!alasan?.trim()) throw new Error('Alasan pembatalan wajib diisi.')
  const k = state.kejadian.find((x) => x.id === id)
  if (!k || k.status === 'Dibatalkan') return
  k.status = 'Dibatalkan' // tidak dihapus permanen
  k.alasanBatal = alasan.trim()
  catat(`Membatalkan kejadian ${namaSiswa(k.siswaId)} (alasan: ${alasan.trim()})`)
}

export function logTerlihat() {
  return me().role === 'counselor' ? state.logs : []
}
