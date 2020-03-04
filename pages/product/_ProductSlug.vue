<template>
  <div>
    <h1>{{ category.pName }}</h1>
    <p>{{ category.pDesc }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async asyncData ({ app, params, route, error }) {
    try {
      await app.store.dispatch('getCurrentProduct', { route })
    } catch (err) {
      console.log(err)
      return error({
        statusCode: 404,
        message: 'Товар не найдена или сервер не доступен'
      })
    }
  },
  computed: {
    ...mapState({
      category: 'currentProduct'
    })
  },
  head () {
    return {
      title: this.product.pTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.category.pMetaDescription
        }
      ]
    }
  }
}
</script>
