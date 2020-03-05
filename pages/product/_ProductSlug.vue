<template>
  <div :class="$style.page">
    <div :class="$style.topBlock">
      <div :class="$style.topLeftBlock">
        <a :href="product.images.imgXL" target="_blank">
          <img
            v-lazy="product.images.imgL"
            :class="$style.image"
          />
        </a>
      </div>
      <div :class="$style.topRightBlock">
        <h1>{{ product.pName }}</h1>
        <p>Цена: {{ product.pPrice }}</p>
        <BuyButton :product="product" />
      </div>
    </div>
    <h2>Описание</h2>
    <p>{{ product.pDesc }}</p>
  </div>
</template>

<script>
import BuyButton from '~~/components/common/BuyButton'
import { mapState } from 'vuex'
export default {
  components: {
    BuyButton
  },
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
      product: 'currentProduct'
    })
  },
  head () {
    return {
      title: this.product.pTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.product.pMetaDescription
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

.topBlock {
  padding-top: 2em;
  display: flex;

  @media (max-width: 960px) {
    flex-direction: column;
  }
  .topLeftBlock {
    display: flex;

    .image {
      width: 400px;
      height: auto;
      max-height: 300px;
      object-fit: cover;
      @media (max-width: 960px) {
        width: 100%;
      }
    }
  }
  .topRightBlock {
    padding-left: 2em;
    display: flex;
    flex-direction: column;

    @media (max-width: 960px) {
      padding-left: 0;
    }
  }
}
</style>
