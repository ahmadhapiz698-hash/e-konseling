<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { logout, getSession } from '@/services/authService'
import api from '@/services/api'
import { useSearch } from '@/composables/useSearch'
import { titleCase } from '@/utils/format'
import { APP_NAME } from '@/config'
import AppIcon from '@/components/AppIcon.vue'

defineProps({
  title: { type: String, default: 'Dashboard' },
  sidebarCollapsed: { type: Boolean, default: false },
})

defineEmits(['toggle-sidebar'])

const router = useRouter()
const route = useRoute()

const session = getSession()
const displayName = titleCase(session?.name || session?.username || '') || 'Pengguna'
const initials = displayName.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'U'

// ===== dropdown =====
const openMenu = ref(null)
function toggleMenu(name) {
  openMenu.value = openMenu.value === name ? null : name
}
function handleClickOutside(e) {
  if (!e.target.closest('.dd-wrap')) openMenu.value = null
}

// ===== tema =====
const theme = ref(document.documentElement.getAttribute('data-theme') || 'light')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
  try {
    localStorage.setItem('pelanggaran-theme', theme.value)
  } catch {}
}

// ===== pencarian (modal tengah, mengikuti halaman aktif) =====
// Konteks pencarian mengikuti halaman aktif: di data murid mencari murid,
// di halaman guru mencari guru, dst. Halaman mendaftarkan provider-nya.
const { scope, results, run, clear } = useSearch()
const searchOpen = ref(false)
const searchInput = ref(null)

const searchPlaceholder = computed(() =>
  scope.value ? `Cari ${scope.value.toLowerCase()}...` : 'Cari...'
)

const searchHint = computed(() =>
  scope.value
    ? `Ketik nama atau kata kunci untuk mencari ${scope.value.toLowerCase()}.`
    : 'Pencarian tidak tersedia di halaman ini.'
)

function openSearch() {
  searchOpen.value = true
  run('')
  requestAnimationFrame(() => searchInput.value?.focus())
}
function closeSearch() {
  searchOpen.value = false
}
function onSearchInput(e) {
  run(e.target.value)
}
function pick(item) {
  run(item.title)
  closeSearch()
}

// Tutup & bersihkan pencarian setiap kali berpindah halaman.
watch(() => route.fullPath, () => {
  searchOpen.value = false
  clear()
})

const notifications = ref([
  { av: 'AF', text: 'Ahmad Fauzi', note: 'mendapat pelanggaran baru', time: '5 MENIT LALU' },
  { av: 'SN', text: 'Siti Nurhaliza', note: 'pengajuan disetujui', time: '12 MENIT LALU' },
  { av: 'BS', text: 'Budi Santoso', note: 'poin bertambah', time: '1 JAM LALU' },
])
const hasUnreadNotifications = computed(() => notifications.value.length > 0)

function markAllNotificationsRead() {
  notifications.value = []
}

const messages = ref([
  { av: 'WK', text: 'Wali Kelas X IPS 2', preview: 'Mohon konfirmasi pelanggaran murid kami.', time: '5 MNT' },
  { av: 'BK', text: 'Tim BK', preview: 'Rekap pekan ini sudah siap.', time: '23 MNT' },
])
const hasUnreadMessages = computed(() => messages.value.length > 0)

function markAllMessagesRead() {
  messages.value = []
}

function handleLogout() {
  logout()
  router.push('/login')
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    openMenu.value = null
    if (searchOpen.value) closeSearch()
  } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    openSearch()
  }
}

// Status server (titik di samping search; hijau online, merah offline).
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
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
  checkServer()
  serverTimer = setInterval(checkServer, 15000)
  window.addEventListener('online', checkServer)
  window.addEventListener('offline', checkServer)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
  clearInterval(serverTimer)
  window.removeEventListener('online', checkServer)
  window.removeEventListener('offline', checkServer)
})
</script>

<template>
  <header class="d-topbar">
    <div class="crumbs">
      <button
        class="hamburger"
        type="button"
        :aria-label="sidebarCollapsed ? 'Buka sidebar' : 'Tutup sidebar'"
        :aria-expanded="!sidebarCollapsed"
        @click="$emit('toggle-sidebar')"
      >
        <AppIcon name="menu" />
      </button>
      <div class="header-brand-icon">
        <AppIcon name="brand" />
      </div>
      <div class="header-brand-text">
        <strong>{{ APP_NAME }}</strong>
        <span class="current">{{ title }}</span>
      </div>
      <span v-if="session?.demo" class="demo-badge" title="Login sebagai akun demo">DEMO</span>
    </div>

    <div class="topbar-actions">
      <div
        class="server-status"
        :class="serverOnline ? 'is-online' : 'is-offline'"
        role="status"
        :aria-label="serverOnline ? 'Server Online' : 'Server Offline'"
      >
        <span class="server-dot"></span>
        <span class="server-label">Server {{ serverOnline ? 'Online' : 'Offline' }}</span>
      </div>

      <button class="cmd" type="button" @click="openSearch">
        <AppIcon name="search" />
        <span>Search...</span>
        <kbd class="kbd">⌘K</kbd>
      </button>

      <div class="dd-wrap" :class="{ 'is-open': openMenu === 'notif' }">
        <button class="icon-btn" type="button" aria-label="Notifikasi" @click="toggleMenu('notif')">
          <AppIcon name="bell" />
          <span class="count danger">{{ notifications.length }}</span>
        </button>
        <div class="dd-menu" role="menu">
          <div class="dd-head">
            <div class="dd-head-title">
              <AppIcon name="bell" />
              Notifikasi
            </div>
            <button
              class="dd-mark-all"
              type="button"
              :disabled="!hasUnreadNotifications"
              @click="markAllNotificationsRead"
            >
              Tandai semua telah dibaca
            </button>
          </div>
          <div class="dd-list">
            <a v-for="(n, i) in notifications" :key="i" class="dd-item" href="#">
              <div class="dd-avatar" :class="`a${(i % 3) + 1}`">{{ n.av }}</div>
              <div class="dd-body">
                <div class="dd-text"><strong>{{ n.text }}</strong> {{ n.note }}</div>
                <div class="dd-time">{{ n.time }}</div>
              </div>
            </a>
            <p v-if="!notifications.length" class="dd-empty">Tidak ada notifikasi.</p>
          </div>
          <a class="dd-footer" href="#">Lihat semua notifikasi</a>
        </div>
      </div>

      <div class="dd-wrap" :class="{ 'is-open': openMenu === 'msg' }">
        <button class="icon-btn" type="button" aria-label="Pesan" @click="toggleMenu('msg')">
          <AppIcon name="mail" />
          <span class="count info">{{ messages.length }}</span>
        </button>
        <div class="dd-menu" role="menu">
          <div class="dd-head">
            <div class="dd-head-title">
              <AppIcon name="mail" />
              Pesan
            </div>
            <button
              class="dd-mark-all"
              type="button"
              :disabled="!hasUnreadMessages"
              @click="markAllMessagesRead"
            >
              Tandai semua telah dibaca
            </button>
          </div>
          <div class="dd-list">
            <a v-for="(m, i) in messages" :key="i" class="dd-item" href="#">
              <div class="dd-avatar" :class="`a${(i % 3) + 1}`">{{ m.av }}</div>
              <div class="dd-body">
                <div class="dd-row-head"><strong>{{ m.text }}</strong><span class="dd-time">{{ m.time }}</span></div>
                <div class="dd-preview">{{ m.preview }}</div>
              </div>
            </a>
            <p v-if="!messages.length" class="dd-empty">Tidak ada pesan.</p>
          </div>
          <a class="dd-footer" href="#">Lihat semua pesan</a>
        </div>
      </div>

      <button class="icon-btn" type="button" :aria-label="theme === 'dark' ? 'Mode terang' : 'Mode gelap'" @click="toggleTheme">
        <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" />
      </button>

      <div class="dd-wrap" :class="{ 'is-open': openMenu === 'profile' }">
        <div class="avatar" role="button" tabindex="0" :aria-label="session?.label || 'Akun'" @click="toggleMenu('profile')">{{ initials }}</div>
        <div class="dd-menu dd-profile" role="menu">
          <div class="dd-profile-head">
            <div class="dd-profile-name">
              {{ displayName }}
              <span v-if="session?.demo" class="demo-badge">DEMO</span>
            </div>
            <div class="dd-profile-email">{{ session?.label || 'demo' }}</div>
          </div>
          <RouterLink class="dd-menu-item" to="/akun/profil" @click="openMenu = null">
            <AppIcon name="user" />
            Profil
          </RouterLink>
          <RouterLink class="dd-menu-item" to="/akun/pengaturan" @click="openMenu = null">
            <AppIcon name="settings" />
            Pengaturan
          </RouterLink>
          <RouterLink class="dd-menu-item" to="/akun/panduan" @click="openMenu = null">
            <AppIcon name="book" />
            Panduan
          </RouterLink>
          <div class="dd-divider"></div>
          <button class="dd-menu-item danger" type="button" @click="handleLogout">
            <AppIcon name="logout" />
            Keluar
          </button>
        </div>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <div v-if="searchOpen" class="search-overlay" @click.self="closeSearch">
      <div class="search-card" role="dialog" aria-modal="true" aria-label="Pencarian">
        <div class="search-row">
          <span class="search-ic"><AppIcon name="search" :size="18" /></span>
          <input
            ref="searchInput"
            class="search-input"
            type="text"
            :placeholder="searchPlaceholder"
            :value="keyword"
            autocomplete="off"
            @input="onSearchInput"
          >
          <kbd class="search-esc">esc</kbd>
        </div>
        <div class="search-body">
          <p v-if="!keyword" class="search-hint">{{ searchHint }}</p>
          <template v-else>
            <a
              v-for="r in results"
              :key="r.key"
              class="search-item"
              href="#"
              @click.prevent="pick(r)"
            >
              <span class="search-item-icon"><AppIcon name="search" :size="15" /></span>
              <span class="search-item-body">
                <span class="search-item-title">{{ r.title }}</span>
                <span v-if="r.subtitle" class="search-item-sub">{{ r.subtitle }}</span>
              </span>
            </a>
            <p v-if="!results.length" class="search-hint">Tidak ada hasil untuk "{{ keyword }}".</p>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.d-topbar {
  background: var(--bg-card, #fff);
  border-bottom: 1px solid var(--border, #e4e8ef);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.header-brand-icon {
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: var(--primary, #2563eb);
}

.header-brand-icon svg {
  width: 24px;
  height: 24px;
}

.header-brand-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  line-height: 1.25;
  row-gap: 1px;
}

.header-brand-text strong {
  font-size: 15px;
  font-weight: 700;
  color: var(--t-base, #1e293b);
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-brand-text .current {
  font-size: 12px;
  color: var(--t-muted, #64748b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.demo-badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 7px;
  border-radius: 999px;
  background: var(--warning-soft, #fffbeb);
  color: var(--warning, #f59e0b);
  border: 1px solid color-mix(in srgb, var(--warning, #f59e0b) 35%, transparent);
  font-size: 9.5px;
  font-weight: 900;
  letter-spacing: 0.06em;
  vertical-align: middle;
}

/* modal pencarian — tengah, tanpa blur */
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 76px 16px 16px;
  background: rgba(15, 23, 42, 0.5);
}

.search-card {
  width: min(520px, 100%);
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg-card, #fff);
  border: 1px solid var(--border, #e4e8ef);
  border-radius: 14px;
  box-shadow: var(--shadow-lg, 0 10px 15px rgba(15, 23, 42, 0.08));
}

.search-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-soft, #eef1f5);
}

.search-ic {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  color: var(--t-muted, #64748b);
}

.search-input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--t-base, #1e293b);
  font-family: inherit;
  font-size: 15px;
  padding: 4px 0;
}

.search-input::placeholder {
  color: var(--t-light, #94a3b8);
}

.search-esc {
  flex: 0 0 auto;
  padding: 3px 7px;
  border-radius: 5px;
  border: 1px solid var(--border, #e4e8ef);
  background: var(--bg-muted, #f1f5f9);
  color: var(--t-muted, #64748b);
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.04em;
  text-transform: lowercase;
}

.search-body {
  padding: 10px;
  overflow-y: auto;
}

.search-hint {
  margin: 0;
  padding: 14px 6px;
  text-align: center;
  font-size: 13px;
  color: var(--t-muted, #64748b);
}

.search-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 9px;
  color: var(--t-base, #1e293b);
  text-decoration: none;
  transition: background-color 0.14s ease;
}

.search-item:hover {
  background: var(--bg-hover, #f8fafc);
}

.search-item-icon {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--primary-soft, #eff6ff);
  color: var(--primary, #2563eb);
}

.search-item-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.search-item-title {
  font-size: 13.5px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-item-sub {
  font-size: 12px;
  color: var(--t-muted, #64748b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* mobile: dropdown notifikasi/pesan jadi panel atas; akun tetap menempel kanan */
@media (max-width: 720px) {
  .dd-menu:not(.dd-profile),
  .dd-wrap.is-open .dd-menu:not(.dd-profile) {
    position: fixed;
    top: 68px;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100vw - 16px);
    max-width: 380px;
    max-height: 70vh;
  }
}

/* head notifikasi: kiri judul, kanan tandai semua */
.dd-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.dd-head-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dd-head-title svg {
  width: 15px;
  height: 15px;
}

.dd-mark-all {
  border: 0;
  background: transparent;
  color: var(--primary, #2563eb);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  white-space: nowrap;
}

.dd-mark-all:hover:not(:disabled) {
  background: var(--primary-soft, #eff6ff);
}

.dd-mark-all:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dd-empty {
  margin: 0;
  padding: 20px 16px;
  text-align: center;
  font-size: 12.5px;
  color: var(--t-muted, #64748b);
}

.dd-menu-item {
  width: 100%;
}

button.dd-menu-item {
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}

/* Status server: desktop tampil titik + tulisan, mobile/tablet titik saja. */
.server-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex: 0 0 auto;
  font-size: 12px;
  font-weight: 600;
  color: var(--t-muted, #64748b);
  white-space: nowrap;
}

.server-status.is-offline {
  color: var(--danger, #ef4444);
}

.server-dot {
  flex: 0 0 auto;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--t-light, #94a3b8);
  animation: server-dot-blink 1.4s ease-in-out infinite;
}

.server-status.is-online .server-dot {
  background: var(--success, #22c55e);
  box-shadow: 0 0 0 3px var(--success-soft, rgba(34, 197, 94, 0.18));
}

.server-status.is-offline .server-dot {
  background: var(--danger, #ef4444);
  box-shadow: 0 0 0 3px var(--danger-soft, rgba(239, 68, 68, 0.18));
}

@media (max-width: 1100px) {
  .server-label {
    display: none;
  }

  .server-status {
    margin-right: 6px;
    margin-left: 4px;
  }
}

@keyframes server-dot-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}
</style>
