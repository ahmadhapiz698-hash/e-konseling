<script setup>
import { getSession } from '@/services/authService'
import AppIcon from '@/components/AppIcon.vue'

const session = getSession()
const initials = (session?.username || 'u').slice(0, 2).toUpperCase()

const identitas = [
  { label: 'Username', value: session?.username || '-' },
  { label: 'Peran', value: session?.label || '-' },
  { label: 'Role', value: session?.role || '-' },
  { label: 'Beranda', value: session?.home || '-' },
]
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-main">
        <div class="hero-icon">
          <AppIcon name="user" :size="24" />
        </div>
        <div class="hero-text">
          <span class="eyebrow">Akun</span>
          <h1 class="hero-title">Profil <span class="accent">Saya</span></h1>
        </div>
      </div>
    </section>

    <div class="grid">
      <section class="col-6 card">
        <div class="profile-head">
          <div class="profile-avatar">{{ initials }}</div>
          <div class="profile-meta">
            <div class="profile-name">{{ session?.username || 'Pengguna' }}</div>
            <div class="profile-sub">{{ session?.label || 'demo' }}</div>
            <span class="badge success">Aktif</span>
          </div>
        </div>
        <div class="info-list">
          <div v-for="i in identitas" :key="i.label" class="info-row">
            <span class="info-label">{{ i.label }}</span>
            <span class="info-value">{{ i.value }}</span>
          </div>
        </div>
      </section>

      <section class="col-6 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Keamanan</span>
            <h2 class="card-title">Ubah Kata Sandi</h2>
          </div>
        </div>
        <form class="form" @submit.prevent>
          <div class="field">
            <label class="field-label" for="cur">Kata sandi saat ini</label>
            <input id="cur" class="input" type="password" placeholder="••••••••">
          </div>
          <div class="field">
            <label class="field-label" for="new">Kata sandi baru</label>
            <input id="new" class="input" type="password" placeholder="••••••••">
          </div>
          <div class="field">
            <label class="field-label" for="conf">Konfirmasi kata sandi</label>
            <input id="conf" class="input" type="password" placeholder="••••••••">
          </div>
          <div class="form-actions">
            <button class="btn btn--primary" type="submit">
              <AppIcon name="check" />
              Simpan
            </button>
          </div>
        </form>
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

.form {
  display: grid;
  gap: 14px;
}

.field {
  display: grid;
  gap: 6px;
}

.field-label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--t-muted, #64748b);
}

.form-actions {
  margin-top: 4px;
}
</style>
