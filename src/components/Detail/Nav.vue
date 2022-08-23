<template>
  <div class="nav">
    <div class="title">布朗奇记账</div>
    <div class="time">
      <div class="year">2022年</div>
      <div class="month"><span>8</span>月</div>
    </div>
    <ul class="tabs">
      <li class="item">
        <span class="decoration">总支出（元）</span>
        <span class="number">51.00</span>
      </li>
      <li class="item">
        <span class="decoration">总收入（元）</span>
        <span class="number">00.00</span>
      </li>
    </ul>
<!--    {{result}}-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Nav extends Vue {
  recordList = this.$store.state.recordList;
  totalAmount = this.$store.state.totalAmount;

  mounted(){
    console.log(this.$store.state.dailyExpense);
  }
  // get result(){
  //   if(this.$store.state.result.length===0) {
  //     // eslint-disable-next-line getter-return
  //     return ;
  //   }
  //   console.log('{{{{{{{{');
  //   console.log(this.$store.state.result);
  //
  //   return this.totalAmount;
  // }

}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.nav {
  display: flex;
  flex-wrap: wrap;
  height: 20vh;
  color: #fff;
  text-align: center;
  background-color: $color-dark-green;

  > .title {
    width: 100vw;
    padding: 12px 0;
    font-size: 24px;
  }

  > .time {
    padding: 18px;
    height: 100px;
    position: relative;
    width: 32vw;
    border-right: 1px dashed #b3eeca;

    > .year {
      font-size: 14px;
      color: #b3eeca;
    }

    > .month {
      padding: 10px;
      font-size: 18px;

      > span {
        font-size: 30px;
        padding: 8px;
      }
    }
  }

  > .tabs {
    padding: 16px;
    height: 110px;
    display: flex;
    width: 67vw;

    .item {
      display: flex;
      text-align: center;
      flex-wrap: wrap;
      width: 33vw;

      .decoration {
        font-size: 14px;
        color: #b3eeca;

      }

      .number {
        font-size: 20px;
        margin: 12px;
      }
    }
  }
}

</style>