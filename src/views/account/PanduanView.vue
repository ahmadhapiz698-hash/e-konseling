<script setup>
import AppIcon from '@/components/AppIcon.vue'

const langkah = [
  { icon: 'login', judul: 'Masuk ke aplikasi', teks: 'Gunakan akun yang diberikan (guru, wali kelas, counselor, atau murid) untuk masuk.' },
  { icon: 'plus', judul: 'Catat pelanggaran', teks: 'Buka menu Pelanggaran lalu klik "Catat Pelanggaran" dan isi data murid serta jenis pelanggaran.' },
  { icon: 'check', judul: 'Verifikasi catatan', teks: 'Tim BK meninjau tiap catatan: setujui atau tolak beserta alasannya.' },
  { icon: 'chart', judul: 'Pantau laporan', teks: 'Lihat rekap poin dan distribusi pelanggaran di menu Laporan dan Dashboard.' },
]

const faq = [
  { q: 'Bagaimana poin pelanggaran dihitung?', a: 'Setiap jenis pelanggaran punya bobot poin: Ringan 5, Sedang 10–15, dan Berat 25–50. Poin murid adalah akumulasi dari catatan yang disetujui.' },
  { q: 'Apa arti status Diproses, Disetujui, dan Ditolak?', a: 'Diproses berarti menunggu tinjauan, Disetujui berarti catatan valid dan poin dihitung, Ditolak berarti catatan tidak valid.' },
  { q: 'Di mana saya bisa mengubah kategori pelanggaran?', a: 'Buka menu Kategori untuk menambah, mengubah, atau menghapus jenis pelanggaran beserta poinnya.' },
]
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-main">
        <div class="hero-icon">
          <AppIcon name="book" :size="24" />
        </div>
        <div class="hero-text">
          <span class="eyebrow">Bantuan</span>
          <h1 class="hero-title">Panduan <span class="accent">Penggunaan</span></h1>
        </div>
      </div>
    </section>

    <div class="grid">
      <section class="col-12 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Langkah</span>
            <h2 class="card-title">Mulai dalam 4 Langkah</h2>
          </div>
        </div>
        <div class="guide-grid">
          <article v-for="(l, i) in langkah" :key="l.judul" class="guide-step">
            <div class="guide-icon">
              <AppIcon :name="l.icon" :size="20" />
            </div>
            <div class="guide-body">
              <div class="guide-title"><span class="guide-num">{{ i + 1 }}</span> {{ l.judul }}</div>
              <p class="guide-text">{{ l.teks }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="col-12 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">FAQ</span>
            <h2 class="card-title">Pertanyaan Umum</h2>
          </div>
        </div>
        <div class="faq-list">
          <details v-for="f in faq" :key="f.q" class="faq-item">
            <summary class="faq-q">
              <AppIcon name="chevron-right" :size="16" />
              {{ f.q }}
            </summary>
            <p class="faq-a">{{ f.a }}</p>
          </details>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.guide-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.guide-step {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  border: 1px solid var(--border, #e4e8ef);
  border-radius: 12px;
  padding: 16px;
}

.guide-icon {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: var(--primary-soft, #eff6ff);
  color: var(--primary, #2563eb);
}

.guide-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--t-base, #1e293b);
}

.guide-num {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin-right: 4px;
  border-radius: 50%;
  background: var(--primary, #2563eb);
  color: #fff;
  font-size: 11px;
  vertical-align: middle;
}

.guide-text {
  margin: 4px 0 0;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--t-muted, #64748b);
}

.faq-list {
  display: grid;
  gap: 8px;
}

.faq-item {
  border: 1px solid var(--border, #e4e8ef);
  border-radius: 10px;
  padding: 12px 14px;
}

.faq-q {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--t-base, #1e293b);
  cursor: pointer;
  list-style: none;
}

.faq-q::-webkit-details-marker {
  display: none;
}

.faq-q svg {
  color: var(--t-muted, #64748b);
  transition: transform 0.18s ease;
}

.faq-item[open] .faq-q svg {
  transform: rotate(90deg);
}

.faq-a {
  margin: 10px 0 0 24px;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--t-muted, #64748b);
}

@media (max-width: 720px) {
  .guide-grid {
    grid-template-columns: 1fr;
  }
}
</style>
