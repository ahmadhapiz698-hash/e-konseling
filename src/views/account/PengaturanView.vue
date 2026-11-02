<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'

const theme = ref(document.documentElement.getAttribute('data-theme') || 'light')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
  try {
    localStorage.setItem('pelanggaran-theme', theme.value)
  } catch {}
}

const notif = ref({
  pelanggaran: true,
  verifikasi: true,
  rekap: false,
})

const bahasa = ref('id')
const zona = ref('wib')
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-main">
        <div class="hero-icon">
          <AppIcon name="settings" :size="24" />
        </div>
        <div class="hero-text">
          <span class="eyebrow">Akun</span>
          <h1 class="hero-title">Pengaturan</h1>
        </div>
      </div>
    </section>

    <div class="grid">
      <section class="col-6 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Tampilan</span>
            <h2 class="card-title">Tema</h2>
          </div>
        </div>
        <label class="check">
          <input :checked="theme === 'dark'" type="checkbox" @change="toggleTheme">
          <span class="box"></span>
          Mode gelap
        </label>
        <p class="hint">Pilih tampilan terang atau gelap sesuai kenyamananmu.</p>
      </section>

      <section class="col-6 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Preferensi</span>
            <h2 class="card-title">Bahasa &amp; Zona Waktu</h2>
          </div>
        </div>
        <div class="field">
          <label class="field-label" for="bahasa">Bahasa</label>
          <select id="bahasa" v-model="bahasa" class="select">
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label" for="zona">Zona waktu</label>
          <select id="zona" v-model="zona" class="select">
            <option value="wib">WIB (UTC+7)</option>
            <option value="wita">WITA (UTC+8)</option>
            <option value="wit">WIT (UTC+9)</option>
          </select>
        </div>
      </section>

      <section class="col-12 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Notifikasi</span>
            <h2 class="card-title">Preferensi Notifikasi</h2>
          </div>
        </div>
        <div class="setting-list">
          <label class="check">
            <input v-model="notif.pelanggaran" type="checkbox">
            <span class="box"></span>
            Pelanggaran baru
          </label>
          <label class="check">
            <input v-model="notif.verifikasi" type="checkbox">
            <span class="box"></span>
            Permintaan verifikasi
          </label>
          <label class="check">
            <input v-model="notif.rekap" type="checkbox">
            <span class="box"></span>
            Rekap mingguan
          </label>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.field {
  display: grid;
  gap: 6px;
  margin-bottom: 14px;
}

.field:last-child {
  margin-bottom: 0;
}

.field-label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--t-muted, #64748b);
}

.hint {
  margin: 12px 0 0;
  color: var(--t-muted, #64748b);
  font-size: 12.5px;
}

.setting-list {
  display: grid;
  gap: 12px;
}
</style>
