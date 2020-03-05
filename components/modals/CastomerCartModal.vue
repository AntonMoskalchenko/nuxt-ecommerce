<template>
  <div>
    <client-only>
      <modal
        name="customer-cart"
        transition="pop-out"
        height="95%"
        width="95%"
        :max-width="960"
        :adaptive="true"
        :scrollable="true"
        :pivot-y="0.5"
        :reset="true"
        classes="v--modal-customer-cart"
        @before-open="beforeOpen"
      >
        <div class="modal-wrapper content-padding">
          <div class=" header-block">
            <p class="h1-header">
              Cart
            </p>
            <div class="close" @click="$modal.hide('customer-cart')">
              <CloseOrDeleteButton />
            </div>
          </div>
          <div v-if="getProductsInCart.length === 0" class="">
            <p>
              Товаров пока нет, но это легко можно исправить :)
            </p>
          </div>
          <template v-else>
            <div class="wrapper">
              <template v-if="getAddedProduct">
                <p class="added-product ">
                  You've added
                </p>
                <ProductsList class="" :products-from-cart="getAddedProduct" />
                <p v-if="getProducts.length > 0" class="added-product ">
                  Previously added products
                </p>
              </template>
              <ProductsList class="products" :products-from-cart="getProducts" />
            </div>
            <div>Total: {{ getAmount | round }}</div>
            <div class="bottom">
              <a class="button color-grey close-button" @click.prevent="$modal.hide('customer-cart')">
                Close
              </a>
              <div class="amount-block">
                <nuxt-link
                  to="/checkout"
                  class="button color-primary checkout-button"
                >
                  To checkout
                </nuxt-link>
              </div>
            </div>
          </template>
        </div>
      </modal>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductsList from '~~/components/cart/ProductsList.vue'
import CloseOrDeleteButton from '~~/components/common/input/CloseOrDeleteButton.vue'
import round from '~~/mixins/round.js'
export default {
  components: {
    ProductsList,
    CloseOrDeleteButton
  },
  mixins: [round],
  data () {
    return {
      addedProduct: null,
      defaults: {
        addedProduct: null
      }
    }
  },

  computed: {
    ...mapGetters({
      getProductsInCart: 'cart/getProductsInCart'
    }),
    getAddedProduct () {
      const product = this.getProductsInCart.find(
        prod => prod.productId === this.addedProduct
      )
      if (product) {
        return [product]
      } else {
        return null
      }
    },
    getAmount () {
      let amount = 0
      if (this.getProductsInCart && this.getProductsInCart.length > 0) {
        this.getProductsInCart.forEach(product => {
          amount +=
            parseFloat(product.meta.pPrice) *
            parseInt(product.qty)
        })
        return amount
      } else {
        return 0
      }
    },
    getProducts () {
      if (this.addedProduct) {
        return this.getProductsInCart.filter(
          prod => prod.productId !== this.addedProduct
        )
      } else {
        return this.getProductsInCart
      }
    }

  },

  watch: {
    $route: function () {
      this.$modal.hide('customer-cart')
    },
    getProductsInCart: function (newVal, oldVal) {
      if (oldVal.length > 0) {
        if (this.getProductsInCart.length === 0) {
          this.$modal.hide('customer-cart')
        }
      }
    }
  },
  methods: {
    async beforeOpen (event) {
      if (!event.params) {
        event.params = {}
      }
      if (event.params.addedProduct) {
        this.addedProduct = event.params.addedProduct
      } else {
        this.addedProduct = this.defaults.addedProduct
      }
    }
  }
}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.submit-error {
  font-weight: 500;
  color: #de0d0d;
  // font-weight: 300;
  font-size: 0.7em;
}
.modal-wrapper {
  // border: 3px solid $accent-border-color;
  background: #fff;
  overflow-y: scroll;
  // margin-top: 20px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.bottom {
  flex-shrink: 0;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start;
  // align-items: flex-start;
  flex-direction: column;
  margin-top: 16px;
  @media screen and (min-width: 1024px) {
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-end;
    padding-bottom: 50px;
  }
  .close-button {
    display: none;
  @media screen and (min-width: 1024px) {
      display: block;
    }
  }
  .amount-block {
    .checkout-button {
      margin-top: 5px;
      width: 100%;
      display: flex;
        @media screen and (min-width: 640px) {
        width: auto;
      }
    }
  }

  button.bttn-material-flat {
    font-size: 1rem;
  @media screen and (min-width: 1024px) {
      font-size: 1.4rem;
    }
  }
}
p.added-product {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

.wrapper {
  // height: 100%;
  flex-grow: 1;
  position: relative;
}
.header-block {
  flex-shrink: 0;
  // padding: 10px 20px;
  margin-top: 20px;
  // background: #f8fafb;
  // font-size: 1.6rem;
  position: relative;
  margin-bottom: 1rem;
  .close {
    position: absolute;
    right: 12px;
    top: 0;
  }
}

.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
</style>
