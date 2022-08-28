<template>
  <nav>
    <router-link to="/detail" class="item" active-class="selected">
      <Icon name="detail"/>
      明细
    </router-link>

    <router-link to="/money" class="item" active-class="selected">
      <Icon name="account"/>
      记账
    </router-link>

    <router-link to="statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

nav {
  @extend %innerShadow;
  display: flex;
  flex-direction: row;

  font-size: 20px;

  a {
    color: #2c3e50;
    text-decoration: none;
  }

  .item {
    padding: 4px 0;
    width: 33.33333%;
    //width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon {
      width: 32px;
      height: 32px;
      margin: 2px;
    }

    &.selected {
      fill: currentColor;
      color: $color-dark-green;
    }
  }

}
</style>