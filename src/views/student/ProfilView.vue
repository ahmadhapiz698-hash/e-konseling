<script setup>
import { getSession } from '@/services/authService'

const session = getSession()
const initials = (session?.username || 'u').slice(0, 2).toUpperCase()

const identitas = [
  { label: 'Nama Lengkap', value: 'Ahmad Fauzi' },
  { label: 'NISN', value: '0012345678' },
  { label: 'Kelas', value: 'XI IPA 1' },
  { label: 'Wali Kelas', value: 'Bu Sri Wahyuni' },
  { label: 'Tahun Ajaran', value: '2026 / 2027' },
  { label: 'Status Akun', value: 'Aktif' },
]

const ringkasan = [
  { label: 'Total Poin', value: '15' },
  { label: 'Pelanggaran', value: '3' },
  { label: 'Kehadiran', value: '95%' },
]
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-text">
        <span class="eyebrow">Profil</span>
        <h1 class="hero-title">Data Murid</h1>
        <p class="hero-sub">Informasi akun dan identitasmu.</p>
      </div>
    </section>

    <div class="grid">
      <section class="col-6 card">
        <div class="profile-head">
          <div class="profile-avatar">{{ initials }}</div>
          <div class="profile-meta">
            <div class="profile-name">Ahmad Fauzi</div>
            <div class="profile-sub">XI IPA 1 · Murid</div>
            <span class="badge success">Aktif</span>
          </div>
        </div>

        <div class="profile-ringkasan">
          <div v-for="r in ringkasan" :key="r.label" class="stat-cell">
            <div class="stat-cell-label">{{ r.label }}</div>
            <div class="stat-cell-value">{{ r.value }}</div>
          </div>
        </div>
      </section>

      <section class="col-6 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Identitas</span>
            <h2 class="card-title">Detail</h2>
          </div>
        </div>
        <div class="info-list">
          <div v-for="i in identitas" :key="i.label" class="info-row">
            <span class="info-label">{{ i.label }}</span>
            <span class="info-value">{{ i.value }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.profile-head {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 64px;
  height: 64px;
  flex: 0 0 64px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--primary, #2563eb);
  color: #fff;
  font-size: 22px;
  font-weight: 700;
}

.profile-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--t-base, #1e293b);
}

.profile-sub {
  margin: 2px 0 8px;
  font-size: 13px;
  color: var(--t-muted, #64748b);
}

.profile-ringkasan {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--border, #e4e8ef);
}

.stat-cell-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--t-muted, #64748b);
}

.stat-cell-value {
  margin-top: 4px;
  font-size: 18px;
  font-weight: 700;
  color: var(--t-base, #1e293b);
}

.info-list {
  display: grid;
  gap: 2px;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid var(--border-soft, #eef1f5);
}

.info-row:last-child {
  border-bottom: 0;
}

.info-label {
  font-size: 13px;
  color: var(--t-muted, #64748b);
}

.info-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--t-base, #1e293b);
  text-align: right;
}
</style>
