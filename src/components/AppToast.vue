<script setup>
import { useToast } from '@/composables/useToast'
import AppIcon from '@/components/AppIcon.vue'

const { toasts, remove } = useToast()

const ICONS = {
  success: 'check',
  error: 'error',
  warning: 'alert',
  info: 'info',
}
</script>

<template>
  <Teleport to="body">
    <div class="toast-wrap" aria-live="polite" aria-atomic="true">
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="toast"
          :class="`toast--${t.type}`"
          role="status"
          @click="remove(t.id)"
        >
          <div class="toast-icon">
            <AppIcon :name="ICONS[t.type] || 'info'" :size="18" />
          </div>
          <div class="toast-body">
            <div v-if="t.title" class="toast-title">{{ t.title }}</div>
            <div class="toast-msg">{{ t.message }}</div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-wrap {
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 300;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: min(420px, calc(100vw - 24px));
  pointer-events: none;
}

/* Banner gaya notifikasi iOS: kaca, turun dari atas, sudut membulat */
.toast {
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 20px;
  background: color-mix(in srgb, var(--bg-card, #fff) 78%, transparent);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid color-mix(in srgb, var(--border, #e4e8ef) 80%, transparent);
  box-shadow: 0 12px 34px rgba(15, 23, 42, 0.18), 0 2px 8px rgba(15, 23, 42, 0.08);
  cursor: pointer;
}

.toast-icon {
  flex: 0 0 34px;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: #fff;
}

.toast--success .toast-icon { background: var(--success, #10b981); }
.toast--error .toast-icon { background: var(--danger, #ef4444); }
.toast--warning .toast-icon { background: var(--warning, #f59e0b); }
.toast--info .toast-icon { background: var(--primary, #2563eb); }

.toast-body {
  min-width: 0;
  padding-top: 1px;
}

.toast-title {
  font-size: 13.5px;
  font-weight: 800;
  color: var(--t-base, #1e293b);
  line-height: 1.25;
}

.toast-msg {
  font-size: 12.5px;
  color: var(--t-muted, #64748b);
  line-height: 1.35;
  margin-top: 1px;
  word-break: break-word;
}

.toast-title + .toast-msg {
  margin-top: 3px;
}

/* Animasi turun dari atas seperti notifikasi iOS */
.toast-enter-active {
  transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease;
}

.toast-leave-active {
  transition: transform 0.28s ease, opacity 0.28s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-120%) scale(0.92);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-24px) scale(0.96);
}

.toast-move {
  transition: transform 0.32s ease;
}

@media (max-width: 720px) {
  .toast-wrap {
    top: 8px;
  }
}
</style>
