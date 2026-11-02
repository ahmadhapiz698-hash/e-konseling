export function getMenus(role, home) {
  const base = home || '/'

  const staff = [
    { label: 'Dashboard', to: base, icon: 'grid' },
    role === 'counselor'
      ? { label: 'Murid', to: `${base}/murid`, icon: 'users' }
      : { label: 'Murid', href: '#', icon: 'users' },
    role === 'counselor'
      ? { label: 'Guru', to: `${base}/guru`, icon: 'graduation' }
      : { label: 'Guru', href: '#', icon: 'graduation' },
    role === 'counselor'
      ? { label: 'Pelanggaran', to: `${base}/pelanggaran`, icon: 'alert' }
      : { label: 'Pelanggaran', href: '#', icon: 'alert' },
    role === 'counselor'
      ? { label: 'Laporan', to: `${base}/laporan`, icon: 'chart' }
      : { label: 'Laporan', href: '#', icon: 'chart' },
  ]

  const student = [
    { label: 'Dashboard', to: home || '/student', icon: 'grid' },
    { label: 'Pelanggaran', to: '/student/pelanggaran', icon: 'alert' },
    { label: 'Profil', to: '/student/profil', icon: 'user' },
  ]

  return role === 'student' ? student : staff
}
