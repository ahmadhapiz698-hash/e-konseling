<script setup>
import { ref } from 'vue'
import { findUser, requestPasswordReset } from '@/services/authService'
import { APP_NAME } from '@/config'
import AppIcon from '@/components/AppIcon.vue'

const contact = ref('')
const method = ref('email')
const loading = ref(false)
const error = ref('')
const step = ref('search')
const account = ref(null)

function masked(val) {
  if (!val) return ''
  const at = val.indexOf('@')
  if (at > 0) return val[0] + '***' + val.slice(at)
  if (val.length > 4) return val.slice(0, 2) + '***' + val.slice(-2)
  return val
}

function toggleMethod() {
  method.value = method.value === 'email' ? 'phone' : 'email'
  contact.value = ''
  error.value = ''
}

async function findAccount() {
  error.value = ''

  if (!contact.value.trim()) {
    error.value = method.value === 'email' ? 'Email wajib diisi.' : 'Nomor telepon wajib diisi.'
    return
  }

  loading.value = true

  try {
    account.value = await findUser(contact.value.trim(), method.value)
    step.value = 'found'
  } catch (err) {
    error.value = err?.response?.data?.message || err?.message || 'Akun tidak ditemukan.'
  } finally {
    loading.value = false
  }
}

async function sendReset() {
  error.value = ''
  loading.value = true

  try {
    await requestPasswordReset(account.value.email)
    step.value = 'sent'
  } catch (err) {
    error.value = err?.response?.data?.message || err?.message || 'Gagal mengirim. Coba lagi.'
  } finally {
    loading.value = false
  }
}

function backToSearch() {
  step.value = 'search'
  error.value = ''
  account.value = null
}
</script>

<template>
  <div class="auth-shell">
    <aside class="auth-aside">
      <div class="auth-brand">
        <div class="logo">
          <AppIcon name="brand" />
        </div>
        <div class="name">{{ APP_NAME }}</div>
      </div>

      <div class="auth-aside-body">
        <span class="auth-aside-eyebrow">Sistem Pencatatan Pelanggaran Murid</span>
        <h1>Lupa password? Tenang, bisa dipulihkan.</h1>
        <p>Cari akunmu dengan email atau nomor telepon, lalu ikuti instruksi reset yang kami kirim untuk membuat password baru.</p>
        <div class="auth-quote">
          "Pencatatan manual jadi digital dan transparan. Rekap poin tiap murid langsung terlihat."
          <div class="auth-quote-author">
            <div class="av">BK</div>
            <div>Tim Bimbingan Konseling</div>
          </div>
        </div>
      </div>

      <div class="auth-aside-footer">
        <span>&copy; {{ new Date().getFullYear() }}</span>
        <span>SMART PRESENCE</span>
      </div>
    </aside>

    <main class="auth-main">
      <div class="auth-main-top">
        <RouterLink to="/login" style="font-size: 12.5px; color: var(--t-muted); display: inline-flex; align-items: center; gap: 6px">
          <AppIcon name="arrow-left" :size="13" />
          Kembali ke login
        </RouterLink>
      </div>

      <div class="auth-card">
        <template v-if="step === 'search'">
          <h2>Cari akunmu</h2>
          <p class="sub">Masukkan email atau nomor telepon yang terdaftar.</p>

          <form class="auth-form" @submit.prevent="findAccount">
            <div class="field">
              <label class="field-label" for="contact">{{ method === 'email' ? 'Email' : 'Nomor Telepon' }}</label>
              <div class="input-icon">
                <span class="ico">
                  <AppIcon :name="method === 'email' ? 'mail' : 'user'" />
                </span>
                <input
                  id="contact"
                  v-model="contact"
                  class="input"
                  :type="method === 'email' ? 'email' : 'tel'"
                  :placeholder="method === 'email' ? 'nama@email.com' : '08xxxxxxxxxx'"
                  :autocomplete="method === 'email' ? 'email' : 'tel'"
                  required
                >
              </div>
            </div>

            <p v-if="error" class="auth-error">{{ error }}</p>

            <button class="btn btn--primary auth-submit" type="submit" :disabled="loading">
              {{ loading ? 'Mencari...' : 'Cari akun' }}
              <AppIcon name="search" />
            </button>
          </form>

          <p class="method-switch">
            Cari dengan
            <button type="button" @click="toggleMethod">{{ method === 'email' ? 'nomor telepon' : 'email' }}</button>
          </p>
        </template>

        <template v-else-if="step === 'found'">
          <h2>Akun ditemukan</h2>
          <p class="sub">Pastikan ini akunmu sebelum mengirim instruksi reset.</p>

          <div class="account-found">
            <div class="account-avatar">
              <AppIcon name="user" :size="26" />
            </div>
            <strong>{{ account.nama || 'User' }}</strong>
            <span class="account-contact">
              <AppIcon :name="method === 'email' ? 'mail' : 'user'" :size="13" />
              {{ method === 'email' ? masked(account.email) : masked(account.phone) }}
            </span>
          </div>

          <p v-if="error" class="auth-error">{{ error }}</p>

          <div class="auth-form">
            <button class="btn btn--primary auth-submit" :disabled="loading" @click="sendReset">
              {{ loading ? 'Mengirim...' : 'Kirim instruksi reset' }}
              <AppIcon name="arrow-right" />
            </button>
            <button class="btn btn--ghost auth-submit" :disabled="loading" @click="backToSearch">
              <AppIcon name="arrow-left" />
              Ubah
            </button>
          </div>
        </template>

        <template v-else>
          <div class="result-state">
            <div class="result-icon">
              <AppIcon name="check" :size="40" />
            </div>
            <h2>Instruksi terkirim</h2>
            <p class="sub">
              Kami telah mengirim instruksi reset password ke <strong>{{ account.email }}</strong>.
              Cek kotak masuk atau folder spam.
            </p>
            <RouterLink to="/login" class="btn btn--primary auth-submit">
              Kembali ke login
            </RouterLink>
          </div>
        </template>

        <div class="auth-main-bottom">
          Ingat passwordmu? <RouterLink to="/login">Masuk di sini</RouterLink>.
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.auth-error {
  margin: 0;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--danger, #ef4444);
}

.method-switch {
  margin: 18px 0 0;
  font-size: 12.5px;
  color: var(--t-muted, #64748b);
  text-align: center;
}

.method-switch button {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--primary, #2563eb);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
}

.method-switch button:hover {
  text-decoration: underline;
}

.account-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 4px 0 20px;
  padding: 20px;
  border: 1px solid var(--border, #e4e8ef);
  border-radius: 12px;
  background: var(--bg-muted, #f1f5f9);
  text-align: center;
}

.account-avatar {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 4px;
  border-radius: 50%;
  background: var(--primary-soft, #dbeafe);
  color: var(--primary, #2563eb);
}

.account-found strong {
  font-size: 15px;
  font-weight: 700;
  color: var(--t-base, #1e293b);
}

.account-contact {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  color: var(--t-muted, #64748b);
}

.result-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.result-icon {
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  margin-bottom: 18px;
  border-radius: 50%;
  background: var(--success-soft, #dcfce7);
  color: var(--success, #16a34a);
}

.result-state .sub {
  margin-bottom: 24px;
}

.result-state .auth-submit {
  width: 100%;
  justify-content: center;
}
</style>
