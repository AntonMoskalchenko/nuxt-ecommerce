<template>
  <div :class="$style.page">
    <h1>{{ category.cName }}</h1>
    <div :class="$style.productList">
      <div
        v-for="product in category.products"
        :key="product.id"
      >
        <ProductBrief :product="product" />
      </div>
    </div>
    <p>{{ category.cDesc }}</p>
  </div>
</template>

<script>
import ProductBrief from '~~/components/category/ProductBrief'
import { mapState } from 'vuex'
export default {
  components: {
    ProductBrief
  },
  async asyncData ({ app, params, route, error }) {
    try {
      await app.store.dispatch('getCurrentCategory', { route })
    } catch (err) {
      console.log(err)
      return error({
        statusCode: 404,
        message: 'Категория не найдена или сервер не доступен'
      })
    }
  },
  computed: {
    ...mapState({
      category: 'currentCategory'
    })
  },
  head () {
    return {
      title: this.category.cTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.category.cMetaDescription
        }
      ]
    }
  }
}
</script>
<style lang="scss" module>
.page {
  @include globalWrapper;
}
.productList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
