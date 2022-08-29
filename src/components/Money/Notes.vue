<template>
  <label class="notes">
    <span class="name">{{ fieldName }}</span>
    <template v-if="type==='datetime-local'">
      <input :type="type" :value="formatDay(value)" :placeholder="placeholder"
             @input="onValueChanged($event.target.value)">
    </template>
    <template v-else>
      <input :type="type" :value="value" :placeholder="placeholder" @input="onValueChanged($event.target.value)">
    </template>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class Notes extends Vue {
  @Prop() readonly value!: string;
  @Prop({required: true}) fieldName!: string;
  @Prop(String) placeholder!: string;
  @Prop(String) type!: string;

  formatDay(value: string) {
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
  }

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
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