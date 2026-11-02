<script setup>
import { useRouter } from 'vue-router'
import { getSession, logout } from '@/services/authService'
import { getMenus } from '@/utils/menus'
import { titleCase } from '@/utils/format'
import { APP_NAME } from '@/config'
import AppIcon from '@/components/AppIcon.vue'

const router = useRouter()
const session = getSession()
const menus = getMenus(session?.role, session?.home)
const displayName = titleCase(session?.name || session?.username || '') || 'Pengguna'
const initials = displayName.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'U'

function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <aside class="d-sidebar">
    <div class="brand">
      <div class="brand-logo">
        <AppIcon name="brand" />
      </div>
      <div class="brand-text">
        <div class="brand-name">{{ APP_NAME }}</div>
        <div class="brand-tag">{{ session?.label || 'demo' }}</div>
      </div>
    </div>

    <nav class="nav-section">
      <div class="nav-label">Menu</div>

      <template v-for="m in menus" :key="m.label">
        <RouterLink v-if="m.to" class="nav-link" :to="m.to" exact-active-class="is-active">
          <AppIcon :name="m.icon" />
          <span>{{ m.label }}</span>
        </RouterLink>

        <a v-else class="nav-link" :href="m.href">
          <AppIcon :name="m.icon" />
          <span>{{ m.label }}</span>
        </a>
      </template>
    </nav>

    <div class="sidebar-footer">
      <div class="workspace">
        <div class="workspace-avatar">{{ initials }}</div>
        <div class="workspace-text">
          <div class="workspace-name">{{ displayName }}</div>
          <div class="workspace-role">{{ session?.label || 'demo' }}</div>
        </div>
      </div>

      <button class="nav-link sidebar-logout" type="button" @click="handleLogout">
        <AppIcon name="logout" />
        <span>Keluar</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.nav-link.sidebar-logout {
  background: transparent;
  border: 0;
  color: var(--danger, #ef4444);
  cursor: pointer;
  font: inherit;
  margin-top: 4px;
  text-align: left;
  width: 100%;
}

.nav-link.sidebar-logout:hover {
  background: var(--danger-soft, #fef2f2);
  color: var(--danger, #ef4444);
}
</style>
