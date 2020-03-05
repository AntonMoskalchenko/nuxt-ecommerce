<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <n-link :class="$style.logo" to="/">
        <p>
          Tails
        </p>
      </n-link>
      <CartButton />
    </div>
  </div>
</template>

<script>
import CartButton from '~~/components/header/CartButton'
export default {
  components: {
    CartButton
  }

}
</script>

<style lang="scss" module>
.wrapper {
    background-color: $basic-bg-color;
    height: 70px;
}
.header {
  @include globalWrapper;
  display: flex;
  align-items: center;
    justify-content: space-between;
}
.logo {
  font-size: 2.2em;
  font-weight: 700;
  opacity: 1;
   color: #000;
   text-decoration: none;
}
</style>
