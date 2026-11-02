import api from './api'

const SESSION_KEY = 'pelanggaran-session'

// Akun demo (tampilan awal) — password semua: 123.
// Dipakai untuk mencoba aplikasi tanpa login ke data-center.
export const DEMO_ACCOUNTS = {
  guru: { password: '123', role: 'teacher', label: 'Guru', home: '/teacher' },
  walikelas: { password: '123', role: 'homeroom', label: 'Wali Kelas', home: '/homeroom' },
  bk: { password: '123', role: 'counselor', label: 'Counselor', home: '/counselor' },
  murid: { password: '123', role: 'student', label: 'Murid', home: '/student' },
}
export const ACCOUNTS = DEMO_ACCOUNTS

// Login memakai akun demo (lokal, tanpa jaringan). Mengembalikan session atau null.
export function loginDemo(identity, password) {
  const key = String(identity || '').trim().toLowerCase()
  const acc = DEMO_ACCOUNTS[key]
  if (!acc || acc.password !== String(password || '')) return null

  const session = {
    username: key,
    name: key,
    role: acc.role,
    label: acc.label,
    home: acc.home,
    jabatan: [],
    demo: true,
    ts: Date.now(),
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

// Peran aplikasi E-Konseling -> label & halaman awal.
const ROLE_META = {
  counselor: { role: 'counselor', label: 'Counselor', home: '/counselor' },
  homeroom: { role: 'homeroom', label: 'Wali Kelas', home: '/homeroom' },
  teacher: { role: 'teacher', label: 'Guru', home: '/teacher' },
  staff: { role: 'staff', label: 'Tenaga Kependidikan', home: '/staff' },
  student: { role: 'student', label: 'Murid', home: '/student' },
}

// Tentukan peran E-Konseling dari akun + penugasan (jabatan) guru.
// Prioritas: Murid > BK > Wali Kelas > Tenaga Kependidikan > Guru biasa.
function resolveRole(user, penugasan) {
  const userRole = String(user?.role || '').toLowerCase()
  if (userRole === 'siswa') return 'student'

  const codes = (penugasan || []).map((p) => String(p.jabatan || '').toLowerCase())
  if (codes.includes('bk')) return 'counselor'
  if (codes.includes('wali_kelas')) return 'homeroom'
  if (codes.includes('tenaga_kependidikan')) return 'staff'

  return 'teacher'
}

async function fetchPenugasan() {
  try {
    const res = await api.get('/api/penugasan/me')
    return Array.isArray(res.data?.data) ? res.data.data : []
  } catch {
    return []
  }
}

export async function login(identity, password) {
  // Akun demo diprioritaskan (mis. "bk" / "123").
  const demo = loginDemo(identity, password)
  if (demo) return demo

  const res = await api.post('/api/auth/login', { identity, password })
  const data = res.data?.data

  if (!data?.token || !data?.user) {
    throw new Error(res.data?.message || 'Login gagal')
  }

  const { token, user } = data

  // Admin data-center tidak diizinkan masuk ke E-Konseling.
  if (String(user?.role || '').toLowerCase() === 'admin') {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('user_id')
    throw new Error('Akun admin tidak diizinkan masuk ke E-Konseling.')
  }

  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
  if (user?.id) localStorage.setItem('user_id', user.id)

  const penugasan = await fetchPenugasan()
  const meta = ROLE_META[resolveRole(user, penugasan)] || ROLE_META.teacher

  const session = {
    username: user.username || user.email || identity,
    name: user.nama || user.username || '',
    role: meta.role,
    label: meta.label,
    home: meta.home,
    jabatan: penugasan.map((p) => p.jabatan),
    userId: user.id,
    ts: Date.now(),
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

// Cari akun berdasarkan email atau nomor telepon (untuk lupa password).
export async function findUser(contact, method = 'email') {
  const res = await api.post('/api/auth/find-user', { contact, method })
  return res.data?.data
}

// Kirim instruksi reset password ke email akun.
export async function requestPasswordReset(email) {
  const res = await api.post('/api/auth/request-password-reset', { email })
  return res.data
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('user_id')
}

export function getSession() {
  try {
    const s = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
    if (!s || !s.role || !s.home) return null
    return s
  } catch {
    return null
  }
}

export function isDemoSession() {
  const s = getSession()
  return !!s?.demo
}

export function isLoggedIn() {
  return !!getSession()
}

export { ROLE_META }
