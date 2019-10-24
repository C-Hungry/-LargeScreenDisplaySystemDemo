<template>
  <div :class="css.box">
    <slot></slot>
  </div>
</template>

<style module="css" lang="scss">
$size: 3px;
.box {
  border: 1px solid $color-line;
  background-color: rgba(15, 29, 61,0.5);
  position: relative;
  &:before,
  &:after {
    content:'';
    position: absolute;
    top: 0;
  }
  &:before {
    left: 0;
    border: {
      style: solid;
      color: $color-line transparent transparent $color-line;
      width: $size;
    }
  }
  &:after {
    right: 0;
    border: {
      style: solid;
      color: $color-line $color-line transparent transparent;
      width: $size;
    }
  }
}
</style>
