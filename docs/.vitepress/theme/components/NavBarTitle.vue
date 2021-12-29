<script setup lang="ts">
import { withBase, useData } from 'vitepress'
const { site, theme, localePath } = useData()
</script>

<template>
  <a
    class="nav-bar-title"
    :href="localePath"
    :aria-label="`${site.title}, back to home`"
  >
    <img
      v-if="theme.logo && false"
      class="logo"
      :src="withBase(theme.logo)"
      alt="Logo"
    />
    {{ site.title }}
  </a>
</template>

<style lang="less" scoped>
.nav-bar-title {
  font-size: 1.2rem;
  font-weight: 400;
  //color: var(--c-text);
  background-color: var(--c-brand);
  color: #fff;
  padding: 5px 20px;
  border-radius: 2px;
}

.nav-bar-title:hover {
  text-decoration: none;
}

@media screen and (max-width: 719px) {
  .nav-bar-title {
    background-color: transparent;
    color: #000000;
  }
}

.logo {
  margin-right: 0.75rem;
  height: 1.3rem;
  vertical-align: bottom;
}
</style>
