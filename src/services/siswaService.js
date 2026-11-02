import api from './api'

// List siswa publik (periode aktif, status AKTIF) — tanpa login.
// Mengembalikan { status, data, totalItems, totalLaki, totalPerempuan }.
export async function getPublicSiswa(q = '') {
  const res = await api.get('/api/siswa/public', {
    params: q ? { q } : {},
  })
  return res.data
}

// List siswa admin (berpaginasi) — butuh token admin.
export async function getDaftarSiswa({
  page = 1,
  perPage = 10,
  q = '',
  rombel = '',
  status = '',
  periode_id = '',
  sort = '',
} = {}) {
  const res = await api.get('/api/siswa', {
    params: {
      page,
      perPage,
      q: q || undefined,
      rombel: rombel || undefined,
      status: status || undefined,
      periode_id: periode_id || undefined,
      sort: sort || undefined,
    },
  })
  return res.data
}

// Detail siswa (admin) — termasuk NIK.
export async function getDetailSiswa(id) {
  const res = await api.get(`/api/siswa/${id}`)
  return res.data?.data || null
}

// Detail siswa publik — tanpa NIK.
export async function getPublicDetailSiswa(id) {
  const res = await api.get(`/api/siswa/public/detail/${id}`)
  return res.data?.data || null
}

// Daftar rombel/kelas (admin).
export async function getRombels(periode_id = '') {
  const res = await api.get('/api/siswa/rombels', {
    params: periode_id ? { periode_id } : {},
  })
  return res.data?.data || []
}

// Cari siswa berdasarkan NISN.
export async function lookupNisn(nisn) {
  const res = await api.get('/api/siswa/lookup/nisn', { params: { nisn } })
  return res.data?.data || null
}

// Daftar periode/semester.
export async function getPeriode() {
  const res = await api.get('/api/siswa/periode')
  return res.data?.data || []
}
