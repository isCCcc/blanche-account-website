<template>
  <div class="content">
    <div class="wrapper" v-for="(record,index) in result" :key="index">
      <ol>
        <li class="title">
          <span class="time">{{ beautify(record.title) }}</span>
          <span class="money">{{ dailyExpense(record.total) }}</span>
        </li>

        <ul>
          <li v-for="item in record.items" :key="item.id">
            <Icon :name="item.type==='-'? 'outcome':'income'"/>
            <div class="detail">
              <span class="msg">{{ item.tags.toString() || showTag(item.type).type }}</span>
              <span class="money">{{ showTag(item.type).symbol }}{{ item.amount }}</span>
              <span class="notes">{{ item.notes || '暂无备注' }}</span>
            </div>
          </li>
        </ul>

      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import {formatFloat} from '@/lib/formatFloat';

@Component
export default class Content extends Vue {
  recordList = this.$store.state.recordList;

  get result() {
    const {recordList} = this;
    if (recordList.length === 0) return [];

    const newList = clone(recordList)
        .sort((a: RecordItem, b: RecordItem) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    type Result = { title: string, total: { income: number | 0, outcome: number | 0 }, items: RecordItem[] }[]
    const result: Result = [{
      title: dayjs(newList[0].createAt).format('YYYY-MM-DD'),
      total: {income: 0, outcome: 0},
      items: [newList[0]]
    }];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(current.createAt, 'day')) {
        result[result.length - 1].items.push(newList[i]);
      } else {
        result.push({
          title: dayjs(newList[i].createAt).format('YYYY-MM-DD'),
          total: {income: 0, outcome: 0},
          items: [newList[i]]
        });
      }
    }
    result.map(group => {
      group.total.income = group.items.reduce((sum, item) => {
        if (item.type === '+') {
          return formatFloat(sum + item.amount);
        } else {
          // return formatFloat(sum - item.amount);
          return sum;
        }
      }, 0);
      group.total.outcome = group.items.reduce((sum, item) => {
        if (item.type === '-') {
          return formatFloat(sum + item.amount);
        } else {
          // return formatFloat(sum - item.amount);
          return sum;
        }
      }, 0);
    });
    this.$store.state.dailyExpense = result;
    return result;
  }

  dailyExpense(item:{income:number,outcome:number}) {
    const result = formatFloat(item.income - item.outcome);
    return result >= 0 ? '+' + result : result;
  }

  beautify(string: string) {
    const createDay = dayjs(string);
    const today = dayjs();
    if (createDay.isSame(today, 'day')) {
      return createDay.format('M-D') + ' 今天';
    } else if (createDay.isSame(today.subtract(1, 'day'), 'day')) {
      return createDay.format('M-D') + ' 昨天';
    } else if (createDay.isSame(today.subtract(2, 'day'), 'day')) {
      return createDay.format('M-D') + ' 前天';
    } else if (createDay.isSame(today, 'year')) {
      return createDay.format('M-D ');
    } else {
      return createDay.format('YYYY-M-D');
    }
  }

  showTag(tag: string) {
    if (tag === '-') {
      return {type: '支出', symbol: '-'};
    } else
      return {type: '收入', symbol: '+'};
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.content {
  //height: 80vh;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;


  .wrapper {
    width: 95vw;
    background-color: #fff;
    margin: 10px 0;
    border-radius: 10px;

    ol {
      .title {
        padding: 15px;
        width: 100%;
        background-color: #fafafa;
        border-radius: 10px 10px 0 0;
        position: relative;

        .money {
          position: absolute;
          right: 20px;
        }
      }

      ul {
        padding-top: 10px;

        li {
          padding: 0px 20px 10px 20px;
          display: flex;

          .detail {
            display: flex;
            flex-wrap: wrap;
            border-bottom: 1px solid $color-dark-gray;
            width: 100%;
            padding: 10px;
            position: relative;
            font-size: 18px;

            .msg {
              position: absolute;
              top: 2px;
              left: 10px;
            }

            .money {
              top: 2px;
              right: 2px;
              position: absolute;
            }

            .notes {
              position: absolute;
              bottom: 6px;
              width: 100%;
              color: $color-dark-gray;
              font-size: 12px;
              overflow: auto;
            }
          }
        }
      }

    }
  }
}

</style>