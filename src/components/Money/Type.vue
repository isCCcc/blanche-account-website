<template>
  <ul class="type">
    <li :class="type === '-' && 'outcome'" @click="seletType('-')">支出</li>
    <li :class="type === '+' && 'income'" @click="seletType('+')">收入</li>
  </ul>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Type extends Vue {
  type = '-';

  seletType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.type = type;
  }

}

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

    &.outcome {
      color: $color-dark-green;
      background: $color-tint-green;

      &::after {
        background: $color-dark-green;
      }
    }

    &.income {
      color: $color-dark-yellow;
      background: $color-tint-yellow;

      &::after {
        background: $color-dark-yellow;
      }
    }

    &.outcome::after,
    &.income::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
    }
  }
}

</style>