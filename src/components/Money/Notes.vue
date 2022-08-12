<template>
  <label class="notes">
    <span class="name">备注</span>
    <input type="text" v-model="value" placeholder="请于此处输入备注">
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  padding-left: 16px;
  margin: 1px 0;

  .name {
    padding-right: 16px;
  }

  input {
    height: 64px;
    flex-grow: 1;
    padding-right: 16px;
    background: transparent;
    border: none;
  }
}

</style>