# Sistem Informasi Bimbingan dan Konseling (BK) Sekolah

Dokumen ini berisi rancangan menu, fitur, dan hak akses untuk aplikasi Bimbingan dan Konseling (BK) sekolah. Sistem dirancang untuk mendukung pengelolaan data siswa, layanan konseling, kedisiplinan, perkembangan siswa, serta kolaborasi antara Guru BK, Wali Kelas, Guru Mata Pelajaran, dan Siswa.

## 1. Tujuan Aplikasi

- Memusatkan data dan layanan BK dalam satu aplikasi.
- Mempermudah pencatatan konseling, pelanggaran, prestasi, dan tindak lanjut.
- Memfasilitasi rujukan siswa dari wali kelas maupun guru mata pelajaran kepada Guru BK.
- Membantu pemantauan perkembangan siswa dengan pendekatan pembinaan, bukan pelabelan.
- Menyediakan laporan yang dapat dicetak atau diekspor.
- Menjaga kerahasiaan data melalui hak akses berbasis peran.
- Menerapkan sistem poin kedisiplinan dan apresiasi sebagai alat bantu pembinaan, bukan hukuman otomatis.

## 2. Jenis Login dan Hak Akses

Aplikasi memiliki empat peran utama:

1. **Guru BK** — pengelola utama layanan BK dan catatan konseling.
2. **Wali Kelas** — memantau siswa pada kelas yang menjadi tanggung jawabnya.
3. **Guru Mata Pelajaran** — mencatat pengamatan yang relevan dan mengajukan rujukan kepada BK.
4. **Siswa** — mengakses layanan mandiri, pengajuan konseling, dan informasi pribadi yang diizinkan.

> **Prinsip akses:** pengguna hanya boleh melihat data yang dibutuhkan untuk tugasnya. Catatan konseling rinci dan informasi sensitif hanya dapat diakses oleh Guru BK yang berwenang. Guru dan wali kelas tidak otomatis memiliki akses ke isi catatan konseling.

## 3. Struktur Menu Utama

### 3.1 Dashboard
- Ringkasan jumlah siswa, guru, kelas, dan alumni.
- Jadwal konseling hari ini.
- Pengajuan konseling yang belum diproses.
- Rujukan siswa yang perlu ditindaklanjuti.
- Statistik layanan BK dan kedisiplinan.
- Aktivitas terbaru sesuai hak akses pengguna.
- Notifikasi dan pengingat.

### 3.2 Data Master
- Data siswa.
- Data guru dan Guru BK.
- Data wali kelas.
- Data kelas dan rombongan belajar.
- Data tahun ajaran dan semester.
- Data alumni.
- Impor dan ekspor data melalui Excel/CSV.
- Pencarian, filter, dan detail profil siswa.

### 3.3 Layanan Bimbingan dan Konseling
- Konseling individu.
- Konseling kelompok.
- Pengajuan konseling mandiri oleh siswa.
- Jadwal dan antrean konseling.
- Catatan sesi konseling.
- Rencana tindak lanjut.
- Riwayat layanan per siswa.
- Status kasus: baru, dijadwalkan, dalam proses, tindak lanjut, selesai.
- Rujukan dari wali kelas atau guru mata pelajaran.
- Pengingat jadwal konseling.

### 3.4 Kedisiplinan dan Pelanggaran
- Kategori dan jenis pelanggaran.
- Pencatatan kejadian dan tanggal.
- Poin pelanggaran jika kebijakan sekolah menggunakannya.
- Rekap poin per siswa.
- Riwayat pelanggaran.
- Pembinaan dan tindak lanjut.
- Catatan pemanggilan siswa atau orang tua.
- Rekap per kelas, semester, dan tahun ajaran.
- Fitur koreksi data dengan alasan dan jejak audit.
- Sistem poin kedisiplinan dan apresiasi (lihat Bagian 3.13).

### 3.5 Prestasi dan Pengembangan Siswa
- Prestasi akademik dan nonakademik.
- Minat dan bakat.
- Ekstrakurikuler.
- Potensi dan kompetensi siswa.
- Portofolio prestasi.
- Rencana pengembangan diri.
- Catatan perkembangan positif siswa.
- Poin apresiasi atas prestasi dan perilaku positif (lihat Bagian 3.13).

### 3.6 Asesmen Kebutuhan Siswa
- Angket kebutuhan peserta didik.
- Asesmen minat dan bakat.
- Asesmen rencana studi dan karier.
- Pengisian asesmen sesuai jadwal.
- Rekap hasil sesuai kewenangan.
- Rekomendasi layanan BK berdasarkan hasil asesmen.
- Persetujuan atau penjelasan tujuan asesmen bila diperlukan.

### 3.7 Bimbingan Karier dan Studi Lanjut
- Cita-cita dan rencana karier.
- Minat jurusan atau program studi.
- Informasi perguruan tinggi dan sekolah lanjutan.
- Informasi beasiswa.
- Rencana pendidikan atau pekerjaan.
- Tracer study alumni.
- Rekap alumni yang melanjutkan studi atau bekerja.

### 3.8 Program Kerja BK
- Program BK tahunan dan semester.
- Rencana layanan dasar, responsif, perencanaan individual, dan dukungan sistem.
- Jadwal bimbingan klasikal.
- Materi layanan BK.
- Pencatatan pelaksanaan kegiatan.
- Evaluasi dan tindak lanjut program.

### 3.9 Kehadiran dan Pemantauan Siswa
- Rekap kehadiran jika data tersedia atau terintegrasi.
- Catatan ketidakhadiran yang perlu ditindaklanjuti.
- Ringkasan perkembangan siswa.
- Pemantauan tindak lanjut rujukan.
- Indikator untuk membantu identifikasi kebutuhan pendampingan.
- Hindari penilaian otomatis yang memberi label atau menghukum siswa hanya berdasarkan skor.

### 3.10 Laporan dan Rekapitulasi
- Laporan konseling dengan isi yang dibatasi sesuai hak akses.
- Laporan kedisiplinan.
- Laporan rujukan dan tindak lanjut.
- Laporan perkembangan siswa.
- Laporan prestasi dan minat bakat.
- Laporan pelaksanaan program BK.
- Rekap per kelas, semester, dan tahun ajaran.
- Cetak PDF.
- Ekspor Excel/CSV.
- Filter periode dan status.

### 3.11 Notifikasi
- Pengajuan konseling baru.
- Perubahan jadwal konseling.
- Rujukan siswa baru.
- Pengingat tindak lanjut.
- Pengumuman atau materi BK.
- Notifikasi yang ditampilkan harus sesuai peran dan tidak membocorkan isi konseling.

### 3.12 Pengaturan Sistem
- Manajemen akun pengguna.
- Pengaturan peran dan izin.
- Pengaturan tahun ajaran dan semester.
- Pengaturan kategori konseling dan pelanggaran.
- Pengaturan notifikasi.
- Log aktivitas pengguna.
- Pencadangan dan pemulihan data.
- Pengelolaan status akun dan reset kata sandi.
- Pengaturan aturan poin, bobot, ambang tahapan pembinaan, dan masa berlaku poin.

### 3.13 Sistem Poin Kedisiplinan dan Apresiasi

Sistem poin bersifat **opsional** (dapat diaktifkan atau dinonaktifkan sesuai kebijakan sekolah) dan berfungsi sebagai **alat bantu pembinaan**, bukan alat menghukum atau melabeli siswa.

**Prinsip dasar**
- Poin hanya menjadi indikator untuk memicu pendampingan; keputusan tindak lanjut tetap diambil oleh manusia (Guru BK, wali kelas, dan pihak berwenang), tidak otomatis oleh sistem.
- Poin pelanggaran dan poin apresiasi dicatat **terpisah**, sehingga riwayat pelanggaran tidak hilang hanya karena siswa memiliki prestasi.
- Setiap poin memiliki dasar kejadian, tanggal, pencatat, dan status validasi.
- Semua aturan poin (bobot, ambang, masa berlaku) dapat diatur dan mengikuti tata tertib sekolah.

**A. Poin pelanggaran**
- Setiap jenis pelanggaran memiliki kategori (ringan, sedang, berat) dan bobot poin yang ditetapkan sekolah.
- Guru mata pelajaran dan wali kelas mencatat **kejadian**; Guru BK memvalidasi dan menetapkan poin.
- Contoh bobot (hanya ilustrasi, disesuaikan dengan tata tertib sekolah): ringan 1–5, sedang 6–15, berat 16–30.
- Rekap poin ditampilkan per siswa, per kelas, per semester, dan per tahun ajaran.

**B. Poin apresiasi**
- Diperoleh dari prestasi akademik dan nonakademik, kontribusi positif, kegiatan sekolah, serta perbaikan perilaku.
- Contoh bobot (ilustrasi): prestasi tingkat sekolah 5, kabupaten/kota 10, provinsi 20, nasional 30; kontribusi atau kegiatan positif 2–5; perbaikan perilaku yang konsisten 5.
- Wali kelas dan guru dapat mengusulkan apresiasi; Guru BK memvalidasi.

**C. Ambang tahapan pembinaan (akumulasi poin pelanggaran per semester)**

| Rentang poin (contoh) | Tahap pembinaan yang disarankan |
|---|---|
| 1–15 | Pembinaan dan teguran oleh guru atau wali kelas, dicatat sebagai pembinaan |
| 16–30 | Konseling individu oleh Guru BK |
| 31–50 | Pemanggilan orang tua dan penyusunan rencana pembinaan |
| Di atas 50 | Rapat kasus (Guru BK, wali kelas, pihak kesiswaan/pimpinan sekolah) untuk menentukan tindak lanjut sesuai tata tertib |

- Angka di atas hanyalah contoh dan harus ditetapkan sendiri oleh sekolah.
- Saat ambang terlampaui, sistem hanya mengirim **saran tindak lanjut dan notifikasi** kepada Guru BK; sistem tidak menjatuhkan sanksi otomatis.

**D. Pemulihan dan masa berlaku poin**
- Poin pelanggaran dapat dikurangi melalui **pemulihan**, misalnya setelah siswa menyelesaikan pembinaan atau menunjukkan perbaikan perilaku yang konsisten, dengan persetujuan Guru BK dan alasan tertulis.
- Poin apresiasi tidak otomatis menghapus poin pelanggaran.
- Akumulasi poin dihitung per semester atau tahun ajaran sesuai kebijakan sekolah; riwayat tetap tersimpan untuk keperluan pembinaan dan audit.

**E. Koreksi dan jejak audit**
- Penetapan, perubahan, koreksi, dan pembatalan poin wajib disertai alasan dan tercatat di log aktivitas.
- Poin tidak dihapus permanen; kesalahan input dikoreksi melalui pembatalan yang tercatat.

**F. Tampilan dan hak akses poin**
- Guru BK: mengelola aturan, memvalidasi, menetapkan, dan mengoreksi poin.
- Wali kelas: melihat rekap poin siswa di kelas sendiri dan mengusulkan apresiasi, tanpa akses ke isi catatan konseling.
- Guru mata pelajaran: mencatat kejadian dan mengusulkan apresiasi; tidak menetapkan poin.
- Siswa: melihat poin milik sendiri sesuai pengaturan sekolah, dengan bahasa yang bersifat pembinaan dan menyertakan langkah perbaikan yang dapat dilakukan.

**G. Laporan poin**
- Rekap poin pelanggaran dan apresiasi per siswa, kelas, semester, dan tahun ajaran.
- Daftar siswa yang melampaui ambang dan status pembinaannya.
- Analisis agregat sebaran poin untuk evaluasi tata tertib, tanpa menampilkan identitas bila tidak diperlukan.

**H. Rancangan data ringkas**
- `aturan_poin`: jenis, tipe (pelanggaran/apresiasi), kategori, bobot, status aktif.
- `ambang_pembinaan`: rentang poin, tahap pembinaan, penerima notifikasi.
- `catatan_poin`: siswa, aturan, poin, tanggal kejadian, pencatat, status validasi, validator, keterangan.
- `koreksi_poin`: catatan asal, jenis koreksi (pembatalan/pemulihan), alasan, penyetuju, tanggal.

## 4. Menu Khusus Berdasarkan Peran

### 4.1 Guru BK
- Dashboard BK.
- Data siswa, guru, kelas, dan alumni.
- Layanan konseling dan catatan sesi.
- Pengajuan konseling siswa.
- Rujukan dari wali kelas dan guru mata pelajaran.
- Kedisiplinan dan pembinaan.
- Asesmen kebutuhan siswa.
- Minat, bakat, prestasi, dan karier.
- Program kerja dan jadwal BK.
- Monitoring tindak lanjut.
- Laporan dan statistik.
- Pengaturan akun serta sistem sesuai kewenangan.
- Pengelolaan aturan poin, validasi poin, dan pembinaan berbasis poin.

### 4.2 Wali Kelas
- Dashboard kelas.
- Data siswa pada kelas yang ditugaskan.
- Rekap kehadiran bila tersedia.
- Catatan perkembangan dan prestasi.
- Pencatatan pengamatan atau kejadian yang relevan.
- Pengajuan rujukan kepada Guru BK.
- Status rujukan dan tindak lanjut yang boleh dibagikan.
- Riwayat pelanggaran siswa sesuai kebijakan sekolah.
- Informasi jadwal pembinaan.
- Laporan perkembangan kelas.
- Melihat rekap poin siswa di kelas sendiri dan mengusulkan poin apresiasi.

**Batasan:** wali kelas tidak dapat membuka catatan konseling rahasia. Tampilkan hanya status tindak lanjut atau rekomendasi yang relevan untuk tugas wali kelas.

### 4.3 Guru Mata Pelajaran
- Dashboard guru.
- Daftar kelas dan siswa yang diajar.
- Pencatatan pengamatan terkait pembelajaran dan perilaku yang relevan.
- Catatan kejadian dengan tanggal dan konteks.
- Pengajuan rujukan kepada Guru BK.
- Melihat status rujukan sebatas informasi yang diperlukan.
- Mencatat perkembangan atau tindak lanjut di kelas bila diminta.
- Informasi materi atau kegiatan bimbingan yang relevan.
- Notifikasi pengumuman dari BK.
- Mengusulkan catatan kejadian dan apresiasi; penetapan poin dilakukan oleh Guru BK.

**Batasan:** guru mata pelajaran tidak memiliki akses ke catatan konseling rinci, hasil asesmen sensitif, atau data siswa di luar kebutuhan tugasnya.

### 4.4 Siswa
- Dashboard pribadi.
- Profil dan data diri yang diizinkan untuk dilihat.
- Pengajuan konseling.
- Pemilihan jadwal yang tersedia.
- Status pengajuan konseling.
- Pengisian asesmen minat dan bakat.
- Informasi prestasi pribadi yang diizinkan.
- Informasi beasiswa, karier, dan studi lanjut.
- Materi pengembangan diri.
- Kotak saran atau konsultasi.
- Notifikasi jadwal dan pengumuman.
- Riwayat pengajuan milik sendiri.
- Melihat poin pribadi sesuai pengaturan sekolah.

**Batasan:** siswa hanya dapat melihat data miliknya sendiri, tidak dapat membuka catatan internal konselor atau data siswa lain.

## 5. Matriks Hak Akses Ringkas

| Fitur/Data | Guru BK | Wali Kelas | Guru Mapel | Siswa |
|---|---|---|---|---|
| Dashboard | Lengkap sesuai tugas | Kelas sendiri | Kelas yang diajar | Pribadi |
| Data siswa | Sesuai kewenangan BK | Kelas sendiri | Data minimum kelas yang diajar | Data sendiri |
| Catatan konseling rinci | Ya, jika berwenang | Tidak | Tidak | Tidak |
| Ajukan konseling | Kelola | Rujukan | Rujukan | Milik sendiri |
| Jadwal konseling | Kelola | Informasi terbatas | Informasi terbatas | Jadwal sendiri |
| Catatan pelanggaran | Kelola sesuai kebijakan | Siswa di kelas sendiri | Catatan kejadian yang dibuat | Informasi pribadi yang diizinkan |
| Asesmen sensitif | Sesuai kewenangan | Ringkasan jika perlu | Tidak | Hasil pribadi yang disetujui |
| Poin pelanggaran dan apresiasi | Kelola, validasi, dan koreksi | Lihat kelas sendiri, usul apresiasi | Usul catatan kejadian; tanpa penetapan poin | Poin sendiri sesuai pengaturan sekolah |
| Prestasi dan perkembangan | Kelola | Kelas sendiri | Kontribusi sesuai tugas | Milik sendiri |
| Laporan | Sesuai kewenangan | Kelas sendiri | Terbatas | Milik sendiri bila disediakan |
| Pengaturan akun/peran | Admin yang ditunjuk | Tidak | Tidak | Tidak |

> Matriks ini adalah rancangan awal. Sekolah perlu menetapkan kebijakan tertulis untuk setiap jenis data dan izin akses.

## 6. Fitur Prioritas Pengembangan

### Tahap 1 — MVP (wajib)
1. Login dan hak akses empat peran.
2. Data siswa, guru, kelas, wali kelas, dan tahun ajaran.
3. Dashboard berdasarkan peran.
4. Pengajuan dan jadwal konseling.
5. Catatan konseling dengan akses terbatas.
6. Pencatatan pelanggaran dan pembinaan.
7. Rujukan dari wali kelas dan guru mata pelajaran.
8. Laporan PDF/Excel.
9. Log aktivitas dasar.
10. Aturan poin pelanggaran dasar (bobot jenis pelanggaran dan rekap poin per siswa).

### Tahap 2 — Pengembangan
1. Asesmen kebutuhan dan minat bakat.
2. Program kerja BK dan evaluasi.
3. Prestasi serta rencana pengembangan siswa.
4. Notifikasi dan pengingat.
5. Monitoring tindak lanjut.
6. Integrasi data kehadiran jika sumber datanya tersedia.
7. Poin apresiasi, ambang tahapan pembinaan, dan pemulihan poin.

### Tahap 3 — Lanjutan
1. Informasi karier, beasiswa, dan studi lanjut.
2. Tracer study alumni.
3. Analisis tren layanan secara agregat.
4. Integrasi dengan sistem sekolah lain bila diperlukan.
5. Pencadangan terjadwal dan pemulihan data.
6. Analisis agregat sebaran poin untuk evaluasi tata tertib.

## 7. Keamanan dan Privasi

- Terapkan prinsip hak akses minimum (*least privilege*).
- Catatan konseling dan hasil asesmen sensitif harus dibatasi.
- Gunakan autentikasi yang aman dan penyimpanan kata sandi dalam bentuk hash.
- Terapkan HTTPS di lingkungan produksi.
- Catat aktivitas penting seperti melihat, mengubah, menghapus, dan mengekspor data sensitif.
- Gunakan validasi di sisi server; menyembunyikan menu di frontend saja tidak cukup.
- Sediakan pencadangan dan uji pemulihan data secara berkala.
- Hindari memasukkan rincian sensitif dalam notifikasi.
- Tetapkan masa simpan dan prosedur penghapusan data sesuai kebijakan sekolah serta aturan yang berlaku.
- Batasi ekspor data dan lindungi file hasil ekspor.
- Siapkan prosedur penanganan insiden kebocoran data.
- Catat setiap penetapan, perubahan, koreksi, dan pembatalan poin dalam log aktivitas; poin tidak boleh dihapus permanen.
- Aturan poin dan ambang hanya dapat diubah oleh peran berwenang, dengan validasi di sisi server.

## 8. Rekomendasi Struktur Navigasi

```text
Dashboard
├── Data Master
│   ├── Data Siswa
│   ├── Data Guru
│   ├── Data Kelas
│   ├── Wali Kelas
│   ├── Tahun Ajaran
│   └── Alumni
├── Layanan BK
│   ├── Pengajuan Konseling
│   ├── Jadwal Konseling
│   ├── Catatan Konseling
│   ├── Rujukan Siswa
│   └── Tindak Lanjut
├── Kedisiplinan
│   ├── Kategori Pelanggaran
│   ├── Catatan Pelanggaran
│   ├── Pembinaan
│   ├── Rekap Poin
│   ├── Poin Apresiasi
│   └── Aturan dan Ambang Poin
├── Perkembangan Siswa
│   ├── Kehadiran
│   ├── Prestasi
│   ├── Minat dan Bakat
│   └── Asesmen
├── Karier dan Studi Lanjut
├── Program Kerja BK
├── Materi dan Pengumuman
├── Laporan
├── Notifikasi
└── Pengaturan
    ├── Pengguna dan Peran
    ├── Tahun Ajaran
    ├── Kategori Layanan
    ├── Aturan Poin
    ├── Log Aktivitas
    └── Backup dan Pemulihan
```

Menu ditampilkan secara dinamis sesuai peran. Contohnya, menu **Catatan Konseling** hanya muncul bagi Guru BK yang memiliki izin, tetapi pemeriksaan izin tetap wajib dilakukan di backend.

## 9. Kriteria Penerimaan Minimum

Sebelum aplikasi digunakan secara nyata, pastikan:

- Setiap peran hanya dapat membuka menu dan data yang diizinkan.
- Siswa tidak bisa mengakses profil siswa lain dengan mengganti URL atau ID.
- Guru mata pelajaran dan wali kelas tidak bisa membaca catatan konseling melalui API.
- Pengajuan konseling dapat dibuat, dijadwalkan, diperbarui statusnya, dan ditutup.
- Rujukan memiliki pengirim, tanggal, alasan yang relevan, status, dan tindak lanjut.
- Laporan hanya memuat data yang diizinkan bagi pengguna yang meminta.
- Perubahan data penting tercatat dalam log aktivitas.
- Poin pelanggaran dan apresiasi hanya dapat ditetapkan oleh peran berwenang dan setiap koreksinya tercatat dengan alasan.
- Ambang poin hanya memunculkan saran tindak lanjut, tidak menjatuhkan sanksi otomatis.
- Siswa hanya dapat melihat poin miliknya sendiri.
- Backup dapat dipulihkan melalui pengujian.
- Tampilan tetap nyaman di ponsel dan komputer.
- Data contoh/dummy digunakan selama pengembangan, bukan data pribadi siswa sungguhan.

## 10. Catatan Implementasi

README ini merupakan spesifikasi fitur dan rancangan hak akses, bukan kode aplikasi siap produksi. Detail teknologi, struktur database, integrasi, dan aturan sekolah perlu disesuaikan dengan proyek yang digunakan.

**Rekomendasi awal:** selesaikan Tahap 1 terlebih dahulu. Pastikan alur login, pemisahan data, kerahasiaan konseling, rujukan, dan laporan berjalan dengan benar sebelum menambahkan fitur lanjutan.
