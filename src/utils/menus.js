export function getMenus(role, home) {
  const base = home || '/'

  // Role yang halaman Murid, Guru, Pelanggaran, dan Laporan-nya sudah dibuat.
  // Tambahkan role lain (mis. 'homeroom') ke daftar ini kalau halamannya sudah ada.
  const hasPages = ['counselor', 'teacher'].includes(role)

  const page = (label, path, icon) =>
    hasPages ? { label, to: `${base}/${path}`, icon } : { label, href: '#', icon }

  const staff = [
    { label: 'Dashboard', to: base, icon: 'grid' },
    page('Murid', 'murid', 'users'),
    page('Guru', 'guru', 'graduation'),
    page('Pelanggaran', 'pelanggaran', 'alert'),
    page('Laporan', 'laporan', 'chart'),
  ]

  const student = [
    { label: 'Dashboard', to: home || '/student', icon: 'grid' },
    { label: 'Pelanggaran', to: '/student/pelanggaran', icon: 'alert' },
    { label: 'Profil', to: '/student/profil', icon: 'user' },
  ]

  return role === 'student' ? student : staff
}
