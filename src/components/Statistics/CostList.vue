<template>
  <div class="wrapper">
    <template v-if="costList.length!==0">
      <span class="title">金额排行榜</span>
      <ol>
        <li v-for="(cost,index) in costList" :key="cost.id">
          <div class="left">
            <span class="cost-list">{{ index + 1 }}</span>
          </div>
          <div class="right">
            <span class="tags">{{ cost.tags }}</span>
            <span class="amount">{{ cost.amount }}</span>
            <span class="notes">{{ cost.notes }}</span>
            <span class="createAt">{{ formatDay(cost.createAt) }}</span>
          </div>
        </li>
      </ol>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import clone from '@/lib/clone';
import dayjs from 'dayjs';

@Component
export default class CostList extends Vue {
  @Prop(String) readonly type!: string;

  //金额排行榜
  get costList() {
    const recordList = this.$store.state.recordList;
    const newList = clone(recordList);
    const costList = [];
    newList.sort(function (a: { amount: number; }, b: { amount: number; }) {
      return b.amount - a.amount;
    });
    console.log(newList);
    for (let i = 0; i < newList.length; i++) {
      if (this.type === newList[i].type) {
        if (newList[i].notes === '') {
          newList[i].notes = '暂无备注';
        }
        if (newList[i].type === '+') {
          newList[i].amount = '+' + newList[i].amount;
        } else if (newList[i].type === '-') {
          newList[i].amount = '-' + newList[i].amount;
        }
        costList.push(newList[i]);
      }
    }
    return costList;
  }

  formatDay(date: string) {
    const dateString = dayjs(date).format(' M月D日 HH:mm');
    return dateString;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.wrapper {
  color: $color-dark-gray;
  padding-top: 10px;


  > .title {
    margin-left: 20px;
  }

  li {
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    > .left {
      position: relative;
      height: 60px;
      line-height: 60px;

      .cost-list {
        margin: 0 20px 0 4px;
        position: absolute;
      }
    }

    > .right {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      left: 45px;
      width: 75vw;
      border-bottom: 1px solid $color-dark-gray;
      font-size: 18px;
      height: 60px;

      .tags {
        position: absolute;
        color: #333333;
        left: 1vw;
        margin-bottom: 10px;
      }

      .amount {
        position: absolute;
        color: #333333;
        right: 10px;

      }

      .notes {
        position: absolute;
        bottom: 6px;
        left: 1vw;
        width: 100%;
        font-size: 12px;
        overflow: auto;

      }

      .createAt {
        position: absolute;
        bottom: 6px;
        right: 10px;
        font-size: 12px;
        overflow: auto;

      }
    }
  }
}
</style>