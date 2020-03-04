<template>
  <div v-if="product">
    <button
      v-if="!isProductAdded"
      :class="$style.buy"
      @click.prevent="buyClickHandler"
    >
      Купить
    </button>
    <a
      v-else
      :class="$style.added"
      href="#"
      @click.prevent="addedClickHandler"
    >
      Товар в корзине
    </a>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      products: state => state.cart.products
    }),
    isProductAdded () {
      return this.products.find(p => p.id === this.product.id)
    }
  },
  methods: {
    ...mapActions({
      addProduct: 'cart/addProduct',
      removeProduct: 'cart/removeProduct'
    }),
    buyClickHandler () {
      this.addProduct(this.product)
    },
    addedClickHandler () {
      this.removeProduct(this.product.id)
    }
  }
}
</script>

<style lang="scss" module>
.buy {
  background-color: $basic-bg-color; /* Green */
  border: none;
  color: #000;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  &:hover {
    cursor: pointer;
  }
}
.added {
  text-decoration: none;
  border-bottom: 2px dotted;
}
</style>
