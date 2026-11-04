// Menu per peran, mengikuti dokumen (bagian 4 & 8). Pemeriksaan izin tetap wajib di backend.
export function getMenus(role, home) {
  const b = home || '/'
  const dash = { label: 'Dashboard', to: b, icon: 'grid' }

  const menus = {
    counselor: [
      dash,
      { label: 'Siswa', to: `${b}/murid`, icon: 'users' },
      { label: 'Guru', to: `${b}/guru`, icon: 'graduation' },
      { label: 'Konseling', to: `${b}/konseling`, icon: 'message' },
      { label: 'Rujukan', to: `${b}/rujukan`, icon: 'clipboard' },
      { label: 'Pelanggaran dan Poin', to: `${b}/pelanggaran`, icon: 'alert' },
      { label: 'Kategori', to: `${b}/kategori`, icon: 'star' },
      { label: 'Laporan', to: `${b}/laporan`, icon: 'chart' },
      { label: 'Log Aktivitas', to: `${b}/log`, icon: 'file' },
    ],
    homeroom: [
      dash,
      { label: 'Siswa Kelas', to: `${b}/murid`, icon: 'users' },
      { label: 'Rujukan', to: `${b}/rujukan`, icon: 'clipboard' },
      { label: 'Pelanggaran dan Poin', to: `${b}/pelanggaran`, icon: 'alert' },
    ],
    teacher: [
      dash,
      { label: 'Siswa', to: `${b}/murid`, icon: 'users' },
      { label: 'Rujukan', to: `${b}/rujukan`, icon: 'clipboard' },
      { label: 'Kejadian', to: `${b}/pelanggaran`, icon: 'alert' },
      { label: 'Laporan', to: `${b}/laporan`, icon: 'chart' },
    ],
    student: [
      { label: 'Dashboard', to: home || '/student', icon: 'grid' },
      { label: 'Konseling', to: '/student/konseling', icon: 'message' },
      { label: 'Poin Saya', to: '/student/pelanggaran', icon: 'alert' },
      { label: 'Profil', to: '/student/profil', icon: 'user' },
    ],
  }
  return menus[role] || [dash]
}
