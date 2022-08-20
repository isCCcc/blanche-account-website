<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :value.sync="type"></Tabs>
    <Tabs :data-source="intervalList" :value.sync="interval"></Tabs>
    type: {{type}}
    <br>
    interval: {{interval}}
  </Layout>
</template>

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
  type='-';
  interval='day';
}
</script>
