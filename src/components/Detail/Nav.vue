<template>
  <div class="nav">
    <div class="title">布朗奇记账</div>
    <div class="time">
      <select v-model="theYear" class="year">
        <option v-for="y in years" :key="y" :value="y">{{ y }}年</option>
      </select>
      <div>
        <select class="month" v-model="theMonth">
          <option v-for="m in 12" :key="m" :value="m">{{ beautify(m) }}</option>
        </select>
        <span class="selectMonth">月</span></div>
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
import {Component, Prop, Watch} from 'vue-property-decorator';
import clone from '@/lib/clone';
import dayjs from 'dayjs';

@Component
export default class Nav extends Vue {
  @Prop() date!:string;
  theYear = window.localStorage.getItem('year') || dayjs().year().toString();
  theMonth = window.localStorage.getItem('month') || (dayjs().month() + 1).toString();

  get years() {
    const endYear = dayjs().year();
    let y = 2010;
    const result: number[] = [];
    while (y <= endYear) {
      result.push(y);
      y++;
    }
    return result;
  }

  beautify(month:number){
    if(month<10){
      return '0'+month;
    }
    return month;
  }

  get result() {
    const dailyExpense = this.$store.state.dailyExpense;
    const newExpense = clone(dailyExpense);
    if (newExpense.length === 0) {
      return;
    }
    type MonthExpense = { title: string, income: number, outcome: number }[]
    const monthExpense: MonthExpense = [{
      title: dayjs(newExpense[0].title).format('YYYY-MM'),
      income: 0,
      outcome: 0
    }];
    for (let i = 0; i < newExpense.length; i++) {
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

  // 选中特定事件展示的收入和支出
  monthExpense() {
    const {result} = this;
    const time = this.date;

    type Expense = { title: string, income: number, outcome: number };
    let expense: Expense = {title: dayjs(time).format('YYYY-MM'), income: 0, outcome: 0};

    if (result === undefined) {
      return expense;
    }
    for (let i = 0; i < result.length; i++) {
      if (dayjs(result[i].title).isSame(time, 'month')) {
        expense = result[i];
      }
    }
    return expense;
  }

  @Watch('theYear')
  saveYear(year: string) {
    let date = dayjs(year.toString().concat('-', this.theMonth.toString())).format('YYYY-MM');
    window.localStorage.setItem('year', year);
    this.$emit('update:date',date);
  }

  @Watch('theMonth')
  saveMonth(month: string) {
    let date = dayjs(this.theYear.toString().concat('-', month.toString())).format('YYYY-MM');
    window.localStorage.setItem('month', month);
    this.$emit('update:date',date);
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

    option {
      color: #000;
      font-size: 16px;
    }

    .year {
      -webkit-border-radius: 0;
      -webkit-appearance: none; /*去除下拉框默认样式*/
      border: 0;
      background: transparent;
      font-size: 14px;
      color: #b3eeca;
    }

    .month {
      -webkit-border-radius: 0;
      -webkit-appearance: none; /*去除下拉框默认样式*/
      border: 0;
      background: transparent;
      padding: 10px;
      font-size: 30px;
      color: #fff;
    }

    > &.selectMonth {
      font-size: 18px;
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
      align-items: center;

      .decoration {
        font-size: 14px;
        color: #b3eeca;
        margin: 0 10px;
        width: 100%;

      }

      .number {
        font-size: 20px;
        margin: 12px;
        width: 100%;
      }
    }
  }
}

</style>