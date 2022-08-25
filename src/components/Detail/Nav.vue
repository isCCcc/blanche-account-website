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
        <span class="number">{{ monthExpense().outcome }}</span>
      </li>
      <li class="item">
        <span class="decoration">总收入（元）</span>
        <span class="number">{{ monthExpense().income }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import clone from '@/lib/clone';
import dayjs from 'dayjs';

@Component
export default class Nav extends Vue {
  dailyExpense = this.$store.state.dailyExpense;

  get result() {
    const {dailyExpense} = this;
    const newExpense = clone(dailyExpense);
    type MonthExpense = { title: string, income: number, outcome: number }[]
    const monthExpense: MonthExpense = [{
      title: dayjs(newExpense[0].title).format('YYYY-MM'),
      income: 0,
      outcome: 0
    }];
    for (let i = 1; i < newExpense.length; i++) {
      const current = newExpense[i];
      const last = monthExpense[monthExpense.length - 1];
      if (dayjs(current.title).isSame(last.title, 'month')) {
        last.income += current.total.income;
        last.outcome += current.total.outcome;
      } else {
        monthExpense.push({
          title: dayjs(newExpense[i].title).format('YYYY-MM'),
          income: current.total.income,
          outcome: current.total.outcome
        });
      }
    }
    return monthExpense;
  }

  // TODO
  // 选中特定事件展示的收入和支出
  monthExpense() {
    const {result} = this;

    //  后续可将 time 修改为点击时间
    const time = new Date();

    type Expense = { title: string, income: number, outcome: number };
    let expense: Expense = {title: dayjs(time).format('YYYY-MM'), income: 0, outcome: 0};

    for (let i = 0; i < result.length; i++) {
      if (dayjs(result[i].title).isSame(time, 'month')) {
        expense = result[i];
      }
    }
    return expense;
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.nav {
  display: flex;
  flex-wrap: wrap;
  min-height: 20vh;
  max-height: 40vh;
  //position: fixed;
  z-index: 10;
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