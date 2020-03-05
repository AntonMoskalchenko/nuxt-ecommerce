<template>
  <div :class="$style.wrapper">
    <div v-for="product in products" :key="product.id">
      <nuxt-link :to="`/product/${product.pSlug}`">
        <p>{{ product.pName }}</p>
        <img
          v-lazy="product.images.imgL"
          :class="$style.image"
        />
      </nuxt-link>
      <p>Price {{ product.pPrice }}</p>
      <BuyButton :product="product" />
    </div>
  </div>
</template>

<script>
import BuyButton from '~~/components/common/BuyButton'
export default {
  components: {
    BuyButton
  },
  props: {
    products: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 1em;

  }
  p {
    max-width: 270px;
    height: 35px;
  }
}
.image {
  width: 300px;
  height: 300px;
  object-fit: cover;
}
</style>
