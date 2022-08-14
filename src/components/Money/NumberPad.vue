<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="outputContent">1</button>
      <button @click="outputContent">2</button>
      <button @click="outputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="outputContent">4</button>
      <button @click="outputContent">5</button>
      <button @click="outputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="outputContent">7</button>
      <button @click="outputContent">8</button>
      <button @click="outputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="outputContent" class="zero">0</button>
      <button @click="outputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  output = '0';
  odd = 0;

  outputContent(event: MouseEvent) {
    const num = (event.target as HTMLButtonElement).textContent!;
    // 限制输入位数
    if (this.output.length >= 16) {
      return;
    }
    // 排除00这种情况
    if (this.output === '0') {
      if ('0123456789'.indexOf(num) >= 0) {
        this.output = num;
      } else {
        this.output += num;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0) {
      this.odd = this.output.split('.')[1].length + 1;
      // 实现只能输入一个小数点的功能
      if (num === '.') {
        return;
      }
      // 实现小数点后只能输入两位数字
      if (this.odd > 2) {
        return;
      }
    }
    this.output += num;
  }

  remove() {
    if (this.output.length == 1) {
      this.output = '0';
    } else
      this.output = this.output.slice(0, -1);
  }

  clear() {
    this.output = '0';
  }

  ok() {
    this.$emit('update:amount', this.output);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
  }

  .buttons {
    @extend %clearFix;
    background-color: $color-tint-gray;
    padding: 12px 0;

    button {
      width: 25vw;
      height: 64px;
      float: left;
      border: 4px solid $color-tint-gray;
      border-radius: 20px;
      background: #fff;

      &.ok {
        height: 64px*2;
        float: right;
        color: #fff;
        background: #93d9b4;

      }

      &.zero {
        width: 25%*2;
      }
    }
  }
}

</style>