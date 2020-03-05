<template>
  <div class="svg-icon-block">
    <SvgClose :class="{'svg-icon-close': buttonType === 'close', 'svg-icon-delete': buttonType === 'delete'}" />
  </div>
</template>

<script>
import SvgClose from '~~/assets/svg/baseline-close-24px.svg?inline'
export default {
  components: {
    SvgClose
  },
  props: {
    buttonType: {
      type: String,
      default: 'close'
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon-delete {
  // background: #ddd;
  fill: #ffb2a9;
  border: 3px solid #ffb2a9;
  transition: all .3s ease;
    width: 20px;
  height: 20px;
  &:hover {
    // background: #ddd;
    fill: #fb3f4c;
    border-color: #fb3f4c;
  }
    @media (--mobile) {
    width: 20px;
    height: 20px;
    border-width: 3px;
  }
}
.svg-icon-close {
  background: hsl(0, 0%, 60%);
  fill: #fff;
  border: 8px solid hsl(0, 0%, 60%);
    width: 20px;
  height: 20px;
  &:hover {
    background: hsl(0, 0%, 33%);
    fill: #fff;
    border-color :hsl(0, 0%, 33%);
  }
}
.svg-icon-block {
  display: block;
  cursor: pointer;
}
svg {
  border-radius: 100%;
  opacity: 0.7;
  line-height: 0;

  box-sizing: content-box;
  // // noselect
  // -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  // -moz-user-select: none; /* mozilla browsers */
  // -khtml-user-select: none; /* webkit (konqueror) browsers */
  // -ms-user-select: none; /* IE10+ */

}
</style>
