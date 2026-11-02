<script setup>
import { APP_NAME, APP_VERSION, SCHOOL_NAME } from '@/config'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="d-footer">
    <span class="footer-copy">© {{ year }} {{ APP_NAME }}</span>
    <span class="footer-school">{{ SCHOOL_NAME }}</span>
    <div class="d-footer-meta">
      <span>{{ APP_VERSION }}</span>
      <a href="https://adeharyanto.my.id" target="_blank" rel="noopener">HaryantoLabs</a>
    </div>
  </footer>
</template>

<style scoped>
.d-footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 10px;
  background: var(--bg-card, #fff);
  border-top: 1px solid var(--border, #e4e8ef);
}

.footer-copy {
  justify-self: start;
}

.footer-school {
  justify-self: center;
  text-align: center;
  color: var(--t-light, #94a3b8);
}

.d-footer-meta {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 10px;
}

.d-footer-meta a {
  color: inherit;
  font-weight: 600;
}

.d-footer-meta a:hover {
  color: var(--primary, #2563eb);
}

/* mobile: nama sekolah tengah atas; bawahnya copyright (kiri) sejajar meta (kanan) */
@media (max-width: 720px) {
  .d-footer {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "school school"
      "copy meta";
    gap: 6px 10px;
    padding: 16px 14px;
  }

  .footer-school {
    grid-area: school;
    justify-self: center;
    text-align: center;
  }

  .d-footer-meta {
    grid-area: meta;
    justify-self: end;
  }

  .footer-copy {
    grid-area: copy;
    justify-self: start;
  }
}
</style>
