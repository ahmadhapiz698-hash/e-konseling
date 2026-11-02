<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { login, DEMO_ACCOUNTS } from '@/services/authService'
import api from '@/services/api'
import { useToast } from '@/composables/useToast'
import { APP_NAME } from '@/config'
import AppIcon from '@/components/AppIcon.vue'

const router = useRouter()
const toast = useToast()

const username = ref('')
const password = ref('')
const remember = ref(true)
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

// Status server (titik hijau bila online, merah bila offline).
const serverOnline = ref(false)
let serverTimer = null

async function checkServer() {
  try {
    await api.get('/api/health', { timeout: 5000 })
    serverOnline.value = true
  } catch {
    serverOnline.value = false
  }
}

onMounted(() => {
  checkServer()
  serverTimer = setInterval(checkServer, 15000)
  window.addEventListener('online', checkServer)
  window.addEventListener('offline', checkServer)
})

onUnmounted(() => {
  clearInterval(serverTimer)
  window.removeEventListener('online', checkServer)
  window.removeEventListener('offline', checkServer)
})

const demoAccounts = Object.entries(DEMO_ACCOUNTS).map(([user, a]) => ({
  user,
  password: a.password,
  label: a.label,
}))

function useDemo(user) {
  username.value = user
  password.value = '123'
}

async function handleSubmit() {
  error.value = ''
  loading.value = true

  try {
    const session = await login(username.value, password.value)

    if (session.demo) {
      toast.info('Login sebagai akun demo', { title: 'Mode Demo' })
    } else {
      toast.success(`Selamat datang, ${session.name || session.username}`, { title: 'Berhasil login' })
    }

    router.push(session.home)
  } catch (err) {
    error.value = err?.response?.data?.message || err?.message || 'Username/email atau password salah.'
    password.value = ''
  } finally {
    loading.value = false
  }
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
        <h1>Pantau dan kelola kedisiplinan murid dalam satu tempat.</h1>
        <p>Catat pelanggaran, verifikasi bukti, dan lihat rekap poin secara real-time dengan alur kerja yang rapi.</p>
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
        <RouterLink to="/" style="font-size: 12.5px; color: var(--t-muted); display: inline-flex; align-items: center; gap: 6px">
          <AppIcon name="arrow-left" :size="13" />
          Kembali ke beranda
        </RouterLink>
      </div>

      <div class="auth-card">
        <h2>Selamat datang kembali</h2>
        <p class="sub">Masuk ke akunmu untuk melanjutkan.</p>

        <form class="auth-form" @submit.prevent="handleSubmit">
          <div class="field">
            <label class="field-label" for="username">Username / Email</label>
            <div class="input-icon">
              <span class="ico">
                <AppIcon name="user" />
              </span>
              <input id="username" v-model="username" class="input" type="text" placeholder="username atau email" autocomplete="username" required>
            </div>
          </div>

          <div class="field">
            <div class="field-row">
              <label class="field-label" for="password">Password</label>
              <RouterLink to="/forgot-password">Lupa?</RouterLink>
            </div>
            <div class="input-icon">
              <span class="ico">
                <AppIcon name="lock" />
              </span>
              <input id="password" v-model="password" class="input password-input" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" required>
              <button type="button" class="password-toggle" :aria-label="showPassword ? 'Sembunyikan password' : 'Lihat password'" @click="showPassword = !showPassword">
                <AppIcon :name="showPassword ? 'eye-off' : 'eye'" :size="14" />
              </button>
            </div>
          </div>

          <label class="check">
            <input v-model="remember" type="checkbox">
            <span class="box"></span>
            Ingat saya selama 30 hari
          </label>

          <p v-if="error" class="auth-error">{{ error }}</p>

          <button class="btn btn--primary auth-submit" type="submit" :disabled="loading">
            {{ loading ? 'Memproses...' : 'Masuk' }}
            <AppIcon name="arrow-right" />
          </button>
        </form>

        <div class="demo-accounts">
          <div class="demo-title">Akun demo (klik untuk isi otomatis)</div>
          <button
            v-for="a in demoAccounts"
            :key="a.user"
            type="button"
            class="demo-item"
            @click="useDemo(a.user)"
          >
            <strong>{{ a.user }}</strong>
            <span>/ {{ a.password }}</span>
            <em>{{ a.label }}</em>
          </button>
        </div>

        <div class="auth-main-bottom">
          Dengan masuk, kamu menyetujui <a href="#">Ketentuan</a> dan <a href="#">Kebijakan Privasi</a>.
        </div>

        <div class="auth-server" :class="serverOnline ? 'is-online' : 'is-offline'">
          <span class="dot"></span>
          <span>Server {{ serverOnline ? 'Online' : 'Offline' }}</span>
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

.password-input {
  padding-right: 36px;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--t-light, #94a3b8);
  cursor: pointer;
  transition: color 0.15s ease;
}

.password-toggle:hover {
  color: var(--t-base, #1e293b);
}

.demo-accounts {
  display: grid;
  gap: 6px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px dashed var(--border, #e4e8ef);
}

.demo-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--t-muted, #64748b);
}

.demo-item {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid var(--border, #e4e8ef);
  background: var(--bg-muted, #f1f5f9);
  color: var(--t-base, #1e293b);
  font-size: 12.5px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.demo-item:hover {
  border-color: var(--primary, #2563eb);
}

.demo-item em {
  margin-left: auto;
  font-style: normal;
  font-size: 11px;
  color: var(--t-muted, #64748b);
}

.auth-server {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--t-muted, #64748b);
}

.auth-server .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--t-light, #94a3b8);
  flex: 0 0 auto;
}

.auth-server.is-online .dot {
  background: var(--success, #22c55e);
  box-shadow: 0 0 0 3px var(--success-soft, rgba(34, 197, 94, 0.18));
  animation: server-pulse 1.8s ease-out infinite;
}

.auth-server.is-offline {
  color: var(--danger, #ef4444);
}

.auth-server.is-offline .dot {
  background: var(--danger, #ef4444);
  box-shadow: 0 0 0 3px var(--danger-soft, rgba(239, 68, 68, 0.18));
}

@keyframes server-pulse {
  0% {
    box-shadow: 0 0 0 0 var(--success-soft, rgba(34, 197, 94, 0.35));
  }
  70% {
    box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}
</style>
