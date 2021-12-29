<script setup>
import { useRoute, useData } from 'vitepress'
import { joinUrl, isActive } from '../utils'

function resolveLink(base, path) {
  if (path === undefined) {
    return path
  }
  // keep relative hash to the same page
  if (path.startsWith('#')) {
    return path
  }
  return joinUrl(base, path)
}

const props = defineProps({
  item: Object
})

const { site, frontmatter } = useData()
// const link = resolveLink(site.value.base, props.item.link)
const getLink = (item) => {
  return resolveLink(site.value.base, item.link)
}
</script>

<template>
  <section class="article-group">
    <h4 class="article-group__title">{{ item.text }}</h4>
    <ul style="padding-left: 0">
      <li
        v-for="child in item.children"
        class="article-group__item">
        <div class="article-group__item-title">
          <a :href="getLink(child)">{{ child.text }}</a>
          <div v-if="child.tag" class="article-group__tags">
            <span v-for="it in child.tag.split('、')" class="article-group__tag">{{ it }}</span>
          </div>
        </div>
        <p class="article-group__item-date">{{ child.createdAt.split('T')[0].split('-').slice(1).join('/') }}</p>
      </li>
    </ul>
  </section>
</template>

<style lang="less">
.article-group {
  padding: 20px 0 10px 0;
  &__title {

  }
  &__item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  &__item-date {
    margin-top: 0;
    color: var(--c-text-tip);
    font-size: 14px;
  }
  &__item-title {
    position: relative;
    flex: 1;
    margin-right: 20px;
    & > a {
      position: relative;
      z-index: 2;
      background-color: #fff;
      padding-right: 20px;
    }
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      top: 13px;
      border-bottom: 1px var(--c-divider-light) dashed;
    }
  }
  &__tags {
    //margin-top: 7px;
  }
  &__tag {
    // background-color: var(--c-divider-light);
    font-size: 13px;
    // padding: 3px 7px;
    color: var(--c-text-tip);
    border-radius: 2px;
    &:not(:first-child) {
      //margin-left: 6px;
      &:before {
        content: ' / ';
      }
    }
  }
}
</style>
