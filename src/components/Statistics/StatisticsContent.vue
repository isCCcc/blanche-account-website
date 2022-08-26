<template>
  <div>
    <Charts :options="pieChartOptions"/>
    <Charts :options="barChartOptions"/>
    <CostList :type="type"></CostList>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import Charts from '@/components/Statistics/Charts.vue';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import CostList from '@/components/Statistics/CostList.vue';

let _ = require('lodash');

@Component({
  components: {CostList, Charts}
})
export default class charts extends Vue {
  @Prop(String) readonly type!: string;
  dailyExpense = this.$store.state.dailyExpense;

  //饼图的options
  get pieChartOptions() {
    let pieColor = this.type === '+' ? '#f2b52d' : '#2db970';
    let cost = [];
    if (this.type === '-') {
      for (let i = 0; i < this.pieKeyValueList.length; i++) {
        if (this.pieKeyValueList[i].outcome !== 0) {
          cost.push({value: this.pieKeyValueList[i].outcome, name: this.pieKeyValueList[i].tags});
        }
      }
    } else if (this.type === '+') {
      for (let i = 0; i < this.pieKeyValueList.length; i++) {
        if (this.pieKeyValueList[i].income !== 0) {
          cost.push({value: this.pieKeyValueList[i].income, name: this.pieKeyValueList[i].tags});
        }
      }
    }
    cost.sort(function (a, b) {
      return a.value - b.value;
    });

    return {
      title: {
        show: true,
        text: '消费项目',
        left: 20,
        top: 0,
        textStyle: {
          color: '#666',
          fontWeight: 'normal'
        }
      },
      tooltip: {
        show: true,
        trigger: 'item',
        alwaysShowContent: false,
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '金额明细',
          type: 'pie',
          clickable: false,　　　　　　 //是否开启点击
          minAngle: 15,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
          avoidLabelOverlap: true,   //是否启用防止标签重叠策略
          hoverAnimation: false,　　  //是否开启 hover 在扇区上的放大动画效果。
          radius: ['40%', '70%'],
          colorBy: 'series',
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
            color: pieColor,
          },
          labelLine: {
            show: true,
            lineStyle: {
              color: '#c7c7c7'
            }
          },
          label: {
            show: true,
            position: 'outside',
            color: '#c7c7c7'
          },
          data: cost
        }
      ]
    };
  }

  //处理饼图相关的数据
  get pieKeyValueList() {
    const recordList = this.$store.state.recordList;
    const newList = clone(recordList);
    const today = new Date();
    type ExpenseByTag = { tags: string, income: number, outcome: number }[]
    let expenseByTag: ExpenseByTag = [{tags: newList[0].tags, income: 0, outcome: 0}];
    if (newList[0].type === '-') {
      expenseByTag[0].outcome = newList[0].amount;
    } else {
      expenseByTag[0].income = newList[0].amount;
    }
    for (let i = 1; i < newList.length; i++) {
      let flag = false;
      if (dayjs(today).isSame(newList[i].createAt, 'month')) {
        for (let j = 0; j < expenseByTag.length; j++) {
          if (newList[i].tags === expenseByTag[j].tags) {
            flag = true;
            if (newList[i].type === '-') {
              expenseByTag[j].outcome += newList[i].amount;
            } else {
              expenseByTag[j].income += newList[i].amount;
            }
          }
        }
        if (!flag) {
          if (newList[i].type === '-') {
            expenseByTag.push({tags: newList[i].tags, income: 0, outcome: newList[i].amount});
          } else {
            expenseByTag.push({tags: newList[i].tags, income: newList[i].amount, outcome: 0});
          }
        }
      }
    }
    return expenseByTag;
  }

  //柱状图的options
  get barChartOptions() {
    const keys = this.barKeyValueList.map((item) => dayjs(item.date).format('M-D'));
    const values = this.barKeyValueList.map((item) => item.value);
    const barColor = this.type === '-' ? '#2db970' : '#f2b52d';

    return {
      title: {
        show: true,
        text: '每日对比',
        left: 20,
        top: 20,
        textStyle: {
          color: '#666',
          fontWeight: 'normal'
        }
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        triggerOn: 'click',
        borderColor: barColor,
        axisPointer: {
          type: 'shadow'
        },
        backgroundColor: 'rgba(255,255,255,0.6)',
        textStyle: {
          color: '#666'
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
          data: values,
          colorBy: 'series',
          itemStyle: {
            color: barColor,
          }
        }
      ]
    };
  }

  //处理柱状图xy轴相关数据
  get barKeyValueList() {
    const today = new Date();
    const array = [];
    const day = parseInt(dayjs(today).format('D'));
    for (let i = 0; i < day; i++) {
      const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.dailyExpense, {title: dateString});
      if (this.type === '-') {
        array.push({date: dateString, value: found ? found.total.outcome : 0});
      } else if (this.type === '+') {
        array.push({date: dateString, value: found ? found.total.income : 0});
      }
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