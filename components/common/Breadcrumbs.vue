<template>
  <div v-if="bredcrumbs && bredcrumbs.length > 0" :class="$style.breadcrumbs">
    <ul>
      <li v-for="cr in bredcrumbs" :key="cr.url">
        <n-link :to="cr.url">
          {{ cr.title }}
        </n-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      bredcrumbs: 'bredcrumbs'
    })
  }
}
</script>

<style lang="scss" module>
/* Style the list */
.breadcrumbs {
  background-color: #eee;
  padding: 10px 16px;
  ul {
    list-style: none;

    @include globalWrapper;
    li {
      display: inline;
      font-size: 18px;
      + ::before {
        padding: 8px;
        color: black;
        content: '/\00a0';
      }
      a {
        color: #0275d8;
        text-decoration: none;

        &:hover {
          color: #01447e;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
