<script setup>
import { getSession } from '@/services/authService'
import { getMenus } from '@/utils/menus'
import AppIcon from '@/components/AppIcon.vue'

const session = getSession()
const menus = getMenus(session?.role, session?.home)
</script>

<template>
  <nav class="mobile-nav" aria-label="Menu utama">
    <template v-for="m in menus" :key="m.label">
      <RouterLink v-if="m.to" class="mobile-nav-item" :to="m.to" exact-active-class="is-active">
        <AppIcon :name="m.icon" />
        <span>{{ m.label }}</span>
      </RouterLink>

      <a v-else class="mobile-nav-item" :href="m.href">
        <AppIcon :name="m.icon" />
        <span>{{ m.label }}</span>
      </a>
    </template>
  </nav>
</template>

<style scoped>
.mobile-nav {
  display: none;
}

@media (max-width: 720px) {
  .mobile-nav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 80;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    align-items: center;
    gap: 2px;
    padding: 6px 6px calc(6px + env(safe-area-inset-bottom, 0px));
    background: var(--bg-card, #fff);
    border-top: 1px solid var(--border, #e4e8ef);
    box-shadow: 0 -4px 16px rgba(15, 23, 42, 0.06);
  }

  .mobile-nav-item {
    display: grid;
    place-items: center;
    gap: 3px;
    padding: 7px 2px 5px;
    border-radius: 10px;
    color: var(--t-muted, #64748b);
    font-size: 10.5px;
    font-weight: 600;
    text-align: center;
    position: relative;
  }

  .mobile-nav-item svg {
    width: 20px;
    height: 20px;
  }

  .mobile-nav-item span {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mobile-nav-item.is-active {
    color: var(--primary, #2563eb);
    background: var(--primary-soft, #eff6ff);
  }

  .mobile-nav-item.is-active::after {
    content: "";
    position: absolute;
    bottom: 1px;
    left: 8px;
    right: 8px;
    height: 2px;
    border-radius: 999px;
    background: var(--primary, #2563eb);
  }
}
</style>
