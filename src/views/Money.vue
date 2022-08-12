<template>
  <Layout class-prefix="layout">

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

    <ul class="type">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>

    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="请于此处输入备注">
    </label>

    <div class="tags">
      <div class="new">
        <button>新增标签</button>
      </div>
      <ul class="current">
        <li class="selected">衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
    </div>


  </Layout>
</template>

<script lang="ts">
export default {
  name: 'Money'
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-grow: 1;
  flex-direction: column-reverse;

  .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      color: $color-dark-gray;
      background: $color-tint-gray;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 12px;

      &.selected {
        background: $color-tint-green;
        color: $color-dark-green;
      }
    }
  }

  .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}

.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  padding-left: 16px;

  .name {
    padding-right: 16px;
  }

  input {
    height: 64px;
    flex-grow: 1;
    padding-right: 16px;
    background: transparent;
    border: none;
  }
}

.type {
  background: $color-dark-gray;
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
    padding: 8px 0;

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
