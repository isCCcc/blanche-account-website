<template>
  <div class="numberPad">
    <div class="output">100</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok">OK</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NumberPad'
};
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