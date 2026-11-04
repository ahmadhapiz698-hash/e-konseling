import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { isLoggedIn, getSession } from '@/services/authService'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPasswordView.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/teacher',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'teacher.home', meta: { title: 'Dashboard Guru' }, component: () => import('@/views/teacher/HomeView.vue') },
      { path: 'murid', name: 'teacher.murid', meta: { title: 'Murid' }, component: () => import('@/views/shared/SiswaView.vue') },
      { path: 'guru', name: 'teacher.guru', meta: { title: 'Guru' }, component: () => import('@/views/teacher/GuruView.vue') },
      { path: 'pelanggaran', name: 'teacher.pelanggaran', meta: { title: 'Pelanggaran dan Poin' }, component: () => import('@/views/shared/KejadianView.vue') },
      { path: 'rujukan', name: 'teacher.rujukan', meta: { title: 'Rujukan' }, component: () => import('@/views/shared/RujukanView.vue') },
      { path: 'laporan', name: 'teacher.laporan', meta: { title: 'Laporan' }, component: () => import('@/views/teacher/LaporanView.vue') },
    ],
  },
  {
    path: '/homeroom',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'homeroom.home', meta: { title: 'Dashboard Wali Kelas' }, component: () => import('@/views/homeroom/HomeView.vue') },
      { path: 'murid', name: 'homeroom.murid', meta: { title: 'Siswa Kelas' }, component: () => import('@/views/shared/SiswaView.vue') },
      { path: 'rujukan', name: 'homeroom.rujukan', meta: { title: 'Rujukan' }, component: () => import('@/views/shared/RujukanView.vue') },
      { path: 'pelanggaran', name: 'homeroom.pelanggaran', meta: { title: 'Pelanggaran dan Poin' }, component: () => import('@/views/shared/KejadianView.vue') },
    ],
  },
  {
    path: '/staff',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'staff.home', meta: { title: 'Dashboard Tenaga Kependidikan' }, component: () => import('@/views/staff/HomeView.vue') },
    ],
  },
  {
    path: '/counselor',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'counselor.home', meta: { title: 'Dashboard Counselor' }, component: () => import('@/views/counselor/HomeView.vue') },
      { path: 'pelanggaran', name: 'counselor.pelanggaran', meta: { title: 'Pelanggaran dan Poin' }, component: () => import('@/views/shared/KejadianView.vue') },
      { path: 'konseling', name: 'counselor.konseling', meta: { title: 'Konseling' }, component: () => import('@/views/counselor/KonselingView.vue') },
      { path: 'rujukan', name: 'counselor.rujukan', meta: { title: 'Rujukan' }, component: () => import('@/views/shared/RujukanView.vue') },
      { path: 'log', name: 'counselor.log', meta: { title: 'Log Aktivitas' }, component: () => import('@/views/counselor/LogView.vue') },
      { path: 'kategori', name: 'counselor.kategori', meta: { title: 'Kategori' }, component: () => import('@/views/counselor/KategoriView.vue') },
      { path: 'murid', name: 'counselor.murid', meta: { title: 'Murid' }, component: () => import('@/views/shared/SiswaView.vue') },
      { path: 'guru', name: 'counselor.guru', meta: { title: 'Guru' }, component: () => import('@/views/counselor/GuruView.vue') },
      { path: 'laporan', name: 'counselor.laporan', meta: { title: 'Laporan' }, component: () => import('@/views/counselor/LaporanView.vue') },
    ],
  },
  {
    path: '/akun',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'profil', name: 'account.profil', meta: { title: 'Profil' }, component: () => import('@/views/account/ProfilView.vue') },
      { path: 'pengaturan', name: 'account.pengaturan', meta: { title: 'Pengaturan' }, component: () => import('@/views/account/PengaturanView.vue') },
      { path: 'panduan', name: 'account.panduan', meta: { title: 'Panduan' }, component: () => import('@/views/account/PanduanView.vue') },
    ],
  },
  {
    path: '/student',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'student.home', meta: { title: 'Dashboard Murid' }, component: () => import('@/views/student/HomeView.vue') },
      { path: 'konseling', name: 'student.konseling', meta: { title: 'Konseling' }, component: () => import('@/views/student/KonselingView.vue') },
      { path: 'pelanggaran', name: 'student.pelanggaran', meta: { title: 'Pelanggaran Saya' }, component: () => import('@/views/student/PelanggaranView.vue') },
      { path: 'profil', name: 'student.profil', meta: { title: 'Profil Saya' }, component: () => import('@/views/student/ProfilView.vue') },
    ],
  },
  { path: '/400', name: 'error.400', meta: { title: 'Error 400' }, component: () => import('@/views/error/BadRequestView.vue') },
  { path: '/401', name: 'error.401', meta: { title: 'Error 401' }, component: () => import('@/views/error/UnauthorizedView.vue') },
  { path: '/403', name: 'error.403', meta: { title: 'Error 403' }, component: () => import('@/views/error/ForbiddenView.vue') },
  { path: '/404', name: 'error.404', meta: { title: 'Error 404' }, component: () => import('@/views/error/NotFoundView.vue') },
  { path: '/405', name: 'error.405', meta: { title: 'Error 405' }, component: () => import('@/views/error/MethodNotAllowedView.vue') },
  { path: '/408', name: 'error.408', meta: { title: 'Error 408' }, component: () => import('@/views/error/RequestTimeoutView.vue') },
  { path: '/429', name: 'error.429', meta: { title: 'Error 429' }, component: () => import('@/views/error/TooManyRequestsView.vue') },
  { path: '/500', name: 'error.500', meta: { title: 'Error 500' }, component: () => import('@/views/error/ServerErrorView.vue') },
  { path: '/502', name: 'error.502', meta: { title: 'Error 502' }, component: () => import('@/views/error/BadGatewayView.vue') },
  { path: '/503', name: 'error.503', meta: { title: 'Error 503' }, component: () => import('@/views/error/ServiceUnavailableView.vue') },
  { path: '/504', name: 'error.504', meta: { title: 'Error 504' }, component: () => import('@/views/error/GatewayTimeoutView.vue') },
  { path: '/:pathMatch(.*)*', name: 'error.notfound', meta: { title: 'Error 404' }, component: () => import('@/views/error/NotFoundView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return { name: 'login' }
  }
  // Penjaga peran (simulasi frontend; backend tetap wajib memeriksa izin).
  const base = '/' + to.path.split('/')[1]
  const bases = ['/teacher', '/homeroom', '/staff', '/counselor', '/student']
  const sess = getSession()
  if (sess && bases.includes(base) && sess.home !== base) {
    return { name: 'error.403' }
  }
  if (to.name === 'login' && isLoggedIn()) {
    return getSession()?.home || '/'
  }
  return true
})

// Tampilkan halaman 500 saat navigasi gagal (mis. chunk/komponen gagal dimuat)
router.onError((error, to) => {
  if (to?.name !== 'error.500') {
    router.replace({ name: 'error.500' })
  }
})

export default router
