<script setup>
import { watch, onBeforeUnmount } from 'vue'
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
  // Kontrol buka/tutup (dukung v-model)
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  // sm | md | lg
  size: { type: String, default: 'md' },
  closeOnBackdrop: { type: Boolean, default: true },
  closeOnEsc: { type: Boolean, default: true },
  hideClose: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'close'])

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function onKeydown(e) {
  if (e.key === 'Escape' && props.closeOnEsc) close()
}

function lock() {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
}

function unlock() {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
}

watch(
  () => props.modelValue,
  (open) => (open ? lock() : unlock()),
)

onBeforeUnmount(unlock)
</script>

<template>
  <Teleport to="body">
    <Transition name="app-modal">
      <div
        v-if="modelValue"
        class="app-modal-backdrop"
        @click.self="closeOnBackdrop && close()"
      >
        <div class="app-modal" :class="`app-modal--${size}`" role="dialog" aria-modal="true">
          <div class="modal-head">
            <slot name="header">
              <div class="modal-title">{{ title }}</div>
            </slot>
            <button v-if="!hideClose" class="modal-close" type="button" aria-label="Tutup" @click="close">
              <AppIcon name="close" />
            </button>
          </div>

          <div class="modal-body">
            <slot />
          </div>

          <div v-if="$slots.footer" class="modal-foot">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.app-modal-backdrop {
  align-items: center;
  background: rgba(15, 23, 42, 0.5);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  display: flex;
  inset: 0;
  justify-content: center;
  padding: 20px;
  position: fixed;
  z-index: 300;
}

.app-modal {
  background: var(--bg-card, #fff);
  border: 1px solid var(--border, #e4e8ef);
  border-radius: 14px;
  box-shadow: var(--shadow-lg, 0 10px 15px rgba(15, 23, 42, 0.08));
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 40px);
  overflow: hidden;
  width: 100%;
}

.app-modal--sm {
  max-width: 380px;
}

.app-modal--md {
  max-width: 520px;
}

.app-modal--lg {
  max-width: 720px;
}

.modal-body {
  overflow-y: auto;
}

.modal-close {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  color: var(--t-muted, #64748b);
  transition: background-color 0.16s ease, color 0.16s ease;
}

.modal-close:hover {
  background: var(--bg-hover, #f8fafc);
  color: var(--t-base, #1e293b);
}

.modal-close svg {
  width: 16px;
  height: 16px;
}

/* Transisi */
.app-modal-enter-active,
.app-modal-leave-active {
  transition: opacity 0.2s ease;
}

.app-modal-enter-from,
.app-modal-leave-to {
  opacity: 0;
}

.app-modal-enter-active .app-modal,
.app-modal-leave-active .app-modal {
  transition: transform 0.2s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.app-modal-enter-from .app-modal,
.app-modal-leave-to .app-modal {
  transform: translateY(8px) scale(0.98);
}
</style>
