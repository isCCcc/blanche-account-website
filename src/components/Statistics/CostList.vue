<template>
  <div>
    <span>金额排行榜</span>
    <ol>
      <li v-for="(cost,index) in costList" :key="cost.id">
        {{ index+1 }}
        <span>{{cost.tags}}</span>
        <span>{{cost.amount}}</span>
        <span>{{cost.notes}}</span>
        <span>{{formatDay(cost.createAt)}}</span>
      </li>
    </ol>
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
        costList.push(newList[i]);
      }
    }
    return costList;
  }

  formatDay(date:string){
    const dateString=dayjs(date).format(' M月D日 HH:mm')
    return dateString
  }
}
</script>

<style lang="scss" scoped>

</style>