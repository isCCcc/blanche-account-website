<template>
  <ul class="type">
    <li class="selected">支出</li>
    <li>收入</li>
  </ul>

</template>

<script lang="ts">
export default {
  name: 'Type'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.type {
  color: #333;
  display: flex;
  font-size: 24px;
  text-align: center;

  > li {
    width: 50%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &.selected {
      color: $color-dark-green;
      background: $color-tint-green;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: $color-dark-green;
      }
    }
  }
}

</style>