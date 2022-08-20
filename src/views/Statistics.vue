<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :value.sync="type"></Tabs>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"></Tabs>
    type: {{ type }}
    <br>
    interval: {{ interval }}
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
  recordTypeList = recordTypeList;
  intervalList = intervalList;
  type = '-';
  interval = 'day';
}
</script>
