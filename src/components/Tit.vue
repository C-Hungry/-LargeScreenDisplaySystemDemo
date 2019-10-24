<template functional>
  <div :class="[data.class,data.staticClass,css.title,{
    [css.dot]:props.hasDot,
    [css.red]:props.dotColor=='red'
  }]"
    :style="data.style"
    v-bind="data.attrs"
    v-on="listeners">
    <slot></slot>
  </div>
</template>

<script>
export default {
  functional: true,
  props: {
    hasDot: Boolean,
    dotColor: String
  }
}
</script>

<style module="css" lang="scss">
.title {
  color: $color-font-3;
  font-size: 16px;
  font-weight: bold;
  text-shadow: 1px 1px 0px black;
  &.dot {
    position: relative;
    padding-left: 12px;
    &:before {
      content: '';
      position: absolute;
      width: 5px;
      height: 5px;
      // border-radius: 100%;
      // background-color: $color-primary;
      left: 0px;
      top: 44%;
      background: {
        image: url(../assets/img/dot-blue.png);
        repeat: no-repeat;
        size: cover;
      }
    }
    &.red {
      &:before {
        background: {
          image: url(../assets/img/dot-red.png);
        }
      }
    }
  }
}
</style>
