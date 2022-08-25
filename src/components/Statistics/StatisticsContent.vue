<template>
  <Charts :options="chartOptions"/>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Charts from '@/components/Statistics/Charts.vue';
import dayjs from 'dayjs';

let _ = require('lodash');

@Component({
  components: {Charts}
})
export default class charts extends Vue {
  dailyExpense = this.$store.state.dailyExpense;

  mounted() {
    console.log(this.dailyExpense);
  }

  get chartOptions() {
    console.log(this.keyValueList);
    const keys = this.keyValueList.map((item) => dayjs(item.date).format('M-D'));
    const outcome = this.keyValueList.map((item) => item.value);

    return {
      title: {
        show: true,
        text: '每日对比',
        textStyle: {
          color: '#666',
          fontWeight: 'normal'
        }
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        triggerOn: 'click',
        borderColor: 'rgba(50,50,50,0.7)',
        axisPointer: {
          type: 'shadow'
        },
        backgroundColor: 'rgba(50,50,50,0.7)',
        textStyle: {
          color: '#fff'
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
      },
      grid: {
        left: 0,
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: keys,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          show: false,
          type: 'value'
        }
      ],
      series: [
        {
          name: '消费金额',
          type: 'bar',
          barWidth: '60%',
          data: outcome,
          colorBy: 'series',
          itemStyle: {
            color: '#2db970'
          }
        }
      ]
    };
  }

  //处理xy轴相关数据
  get keyValueList() {
    const today = new Date();
    const array = [];
    const day = parseInt(dayjs(today).format('D'));
    for (let i = 0; i < day; i++) {
      const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.dailyExpense, {title: dateString});
      array.push({date: dateString, value: found ? found.total.outcome : 0});
    }
    array.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date === b.date) {
        return 0;
      } else return -1;
    });
    return array;
  }
}
</script>

<style lang="scss" scoped>

</style>