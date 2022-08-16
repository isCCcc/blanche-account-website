<template>
  <div class="content">
    <div class="wrapper">
      <ul>
        <div class="title">
          <span class="time">8月15日 星期一</span>
          <span class="money">- 20.00</span>
        </div>
        <li>
          <Icon name="outcome"/>
          <div class="detail">
            <span class="msg">餐饮</span>
            <span class="money">-20.00</span>
            <span class="notes">和 xxx 一起去吃牛腩</span>
          </div>
        </li>
        <li>
          <Icon name="income"/>
          <div class="detail">
            <span class="msg">餐饮</span>
            <span class="money">+20.00</span>
            <span class="notes">xxx 给我发的红包</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Content extends Vue {

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

    ul {
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

      li {
        //background-color: pink;
        padding: 20px 20px 0 20px;
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
          }
        }
      }
    }
  }
}

</style>