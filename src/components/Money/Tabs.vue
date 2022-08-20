<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        class="tabs-item" :class="{
      [classPrefix+'-tabs-item']:classPrefix,
      selected:item.value===value}"
        @click="selectToggle(item.value)">{{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSource = { text: string, value: string }

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array}) dataSource!: DataSource[];
  @Prop(String) classPrefix?: string;
  @Prop({required: true, type: String}) value!: string;

  selectToggle(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tabs {
  color: #fff;
  display: flex;
  font-size: 24px;
  text-align: center;

  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: $color-dark-green;


    &.selected {
      opacity: .8;
    }
  }
}

</style>