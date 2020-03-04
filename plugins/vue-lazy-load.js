import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

export default async (context, inject) => {
  // Vue.use(clazyload)
  Vue.use(VueLazyload, {
    preLoad: 0,
    error: 'https://via.placeholder.com/300',
    // eslint-disable-next-line
    loading: require(`${'~~/assets/svg/download.svg'}`),
    attempt: 3,
    lazyComponent: true,
    observer: true,
    throttleWait: 500
  })
}
