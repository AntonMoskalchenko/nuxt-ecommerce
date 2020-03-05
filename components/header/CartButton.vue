<template>
  <div :class="$style.block">
    <client-only>
      <a
        :href="'#'"
        :class="$style.cartButton"
        :disabled="!productsQuantity > 0 "
        @click.prevent="onClickHandler"
      >
        <div v-if="productsQuantity > 0" :class="$style.quantity">
          {{ productsQuantity }}
        </div>
        <CartSvg :class="$style.svg1" />
      </a>
    </client-only>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CartSvg from '~~/assets/svg/shopping-cart.svg?inline'
export default {
  components: {
    CartSvg
  },
  computed: {
    ...mapState({
      products: state => state.cart.products
    }),
    productsQuantity () {
      if (this.products) {
        return this.products.length
      } else return 0
    }
  },
  methods: {
    onClickHandler () {
      this.$modal.show('customer-cart')
    }
  }
}
</script>

<style lang="scss" module>
.block {
  position: relative;
}
.cartButton {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 72px;
  text-align: center;
  transition: all 0.3s ease-in-out;
}
.svg1 {
  margin-right: 3px;
  width: 40px;
  fill: #000;
  // noselect
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
  -ms-user-select: none; /* IE10+ */
}
.quantity {
    position: absolute;
    right: 5px;
    top: 5px;
    border-radius: 50px;
    background-color: #fb3f4c;
    width: 20px;
    color: #fff;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: .8rem;
    font-weight: 600;
  // noselect
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
  -ms-user-select: none; /* IE10+ */
}
</style>
