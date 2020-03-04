<template>
  <div :class="$style.wrapper">
    <nuxt-link :to="`/product/${product.pSlug}`">
      <p>{{ product.pName }}</p>
      <img
        v-lazy="product.image.imgL"
        :class="$style.image"
      />
    </nuxt-link>
    <p>Цена {{ product.pPrice }}</p>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
  p {
        max-width: 270px;
    height: 35px;
  }
}
.image {
  width: 300px;
  height: 300px;
}
</style>
