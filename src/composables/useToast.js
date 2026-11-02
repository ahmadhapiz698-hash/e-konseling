import { ref } from 'vue'

// State toast global (singleton). Dipakai lewat useToast() di mana saja.
const toasts = ref([])
let seq = 0

function remove(id) {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

function show(message, opts = {}) {
  const id = ++seq
  const toast = {
    id,
    title: opts.title || '',
    message: message || '',
    type: opts.type || 'info',
    duration: opts.duration ?? 3400,
  }
  toasts.value.push(toast)
  if (toast.duration > 0) {
    setTimeout(() => remove(id), toast.duration)
  }
  return id
}

export function useToast() {
  return {
    toasts,
    show,
    success: (message, opts) => show(message, { ...opts, type: 'success' }),
    error: (message, opts) => show(message, { ...opts, type: 'error' }),
    warning: (message, opts) => show(message, { ...opts, type: 'warning' }),
    info: (message, opts) => show(message, { ...opts, type: 'info' }),
    remove,
  }
}
