<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import * as echarts from 'echarts';
import {ECharts, EChartsOption} from 'echarts';

@Component
export default class DailyContrast extends Vue {
  @Prop() options?: EChartsOption;
  chart?: ECharts;

  mounted() {
    if (this.options === undefined) {
      return console.error('options is undefined');
    }
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options);
  }
}
</script>

<style lang="scss" scoped>@import "~@/assets/style/helper.scss";

.wrapper {
  height: 400px;
  margin: 20px 0;
  border-bottom: 1px solid $color-dark-gray;

}
</style>