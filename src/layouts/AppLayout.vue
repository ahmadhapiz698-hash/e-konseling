<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import MobileMenu from '@/components/MobileMenu.vue'

const route = useRoute()
const title = computed(() => route.meta?.title || 'Dashboard')

// Buka/tutup sidebar (desktop & tablet)
const sidebarCollapsed = ref(false)
function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<template>
  <div class="shell" :class="{ 'is-collapsed': sidebarCollapsed }">
    <AppSidebar />

    <div class="main">
      <AppHeader :title="title" :sidebar-collapsed="sidebarCollapsed" @toggle-sidebar="toggleSidebar" />

      <div class="main-content">
        <RouterView />
      </div>

      <AppFooter />
    </div>
  </div>

  <MobileMenu />
</template>

<style scoped>
/* Area konten mengisi sisa tinggi agar footer tetap menempel di bawah,
   tidak naik ke atas saat konten halaman pendek. */
.main-content {
  flex: 1 1 auto;
  min-height: 0;
}

/* Section judul halaman (hero) tampil sebagai section sendiri dengan latar putih.
   Ubah di sini sekali agar berlaku ke semua halaman di dalam layout. */
:deep(.hero) {
  background: var(--bg-card, #fff);
  border: 1px solid var(--border, #e4e8ef);
  border-radius: 14px;
  box-shadow: var(--shadow-card, 0 1px 3px rgba(15, 23, 42, 0.06));
  padding: 22px 24px;
}

/* Sidebar bisa diciutkan jadi rail ikon oleh tombol hamburger (desktop & tablet).
   Di mobile sidebar berupa drawer, jadi aturan ini tidak berlaku. */

@media (max-width: 720px) {
  .main {
    padding-bottom: 68px;
  }

  :deep(.hero) {
    padding: 18px;
  }
}
</style>
