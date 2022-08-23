<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :value.sync="type"></Tabs>
<!--    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"></Tabs>-->

    <ol>
      <li v-for="(record,index) in result" :key="index">
        {{record.title}}
      <ul>
        <li v-for="item in record.items" :key="item.id">
          {{item.amount}}
        </li>
      </ul>
      </li>
    </ol>
  </Layout>
</template>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

::v-deep .interval-tabs-item {
  height: 48px;
}
</style>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Money/Tabs.vue';
import recordTypeList from '@/constant/recordTypeList';
import intervalList from '@/constant/intervalList';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  recordList = this.$store.state.recordList;
  recordTypeList = recordTypeList;
  intervalList = intervalList;
  type = '-';
  interval = 'day';

  get result() {
    const {recordList} = this;
    // eslint-disable-next-line no-undef
    type HashTableValue = { title: string, items: RecordItem[] }
    const hashTable: { [key: string]: HashTableValue } = {};

    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createAt.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }
}
</script>
