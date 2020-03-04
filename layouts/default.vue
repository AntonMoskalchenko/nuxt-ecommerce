<template>
  <div :class="$style.mainWrapper">
    <nuxt />
  </div>
</template>

<script>
// // import GlassesTransform from '~~/components/banners/GlassesTransform.vue'
// import Breadcrumbs from '~~/components/common/Breadcrumbs.vue'
// import Header from '~~/components/common/Header/Header.vue'
// import Footer from '~~/components/common/Footer.vue'
// import CommonComponents from '~~/components/common/CommonComponents.vue'
// // import SvgGift from '~~/assets/svg/gift.svg?inline'
// // import RetailerModeSwitch from '~~/components/common/RetailerModeSwitch.vue'
// import vueMainPlugins from '~~/plugins/ssr-main-plugins.js'
// import Vue from 'vue'

export default {
//   components: {
//     Header,
//     Footer,
//     CommonComponents
//   },
  computed: {
    meta () {
      return [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1 shrink-to-fit=no'
        },
        { hid: 'description', name: 'description', content: 'Главная' }
      ]
    }
  },
  beforeCreate () {
    // vueMainPlugins()
  },

  methods: {
  },
  head () {
    const canonical = `https://mysite.com${this.$route.path
      .toLowerCase()
      .replace(/\/$/, '')}`
    return {
      meta: Array.from(this.meta),
      script: [
        // { src: 'https://markknol.github.io/console-log-viewer/console-log-viewer.js' }
      ],
      bodyAttrs: {
        // class: 'body'
      },
      link: [{ rel: 'canonical', href: canonical }]
    }
  }
}
</script>
<style lang="scss" module>
.mainWrapper {
  max-width: 960px;
  margin: 0 auto;
}
</style>
