<template>
  <Layout class-prefix="layout">
    <NumberPad :type="record.type" @update:amount="onUpdateAmount" @submit="saveRecord"/>
    <Type :type.sync="record.type"/>
    <Notes field-name="日期" type="datetime-local" placeholder="点击挑选时间" :value.sync="record.createAt"/>
    <Notes field-name="备注" type="text" placeholder="请在这里输入备注" :value.sync="record.notes"/>
    <Tags @update:tags="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Type from '@/components/Money/Type.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import dayjs from 'dayjs';

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: string;
}

@Component({
  components: {NumberPad, Type, Notes, Tags},
})
export default class Money extends Vue {
  // eslint-disable-next-line no-undef
  record: Record = {tags: [], type: '-', notes: '', amount: 0, createAt: new Date().toISOString()}; // 当前页面单个数据

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  onUpdateAmount(amount: string) {
    this.record.amount = parseFloat(amount);
  }

  saveRecord() {
    const rec: Record = JSON.parse(JSON.stringify(this.record));
    // rec.createAt = rec.createAt || new Date().toISOString();
    console.log('rec');
    console.log(rec);
    this.$store.commit('insertRecord', rec);
    this.$router.replace('/detail');
  }
  @Watch('value')
  onValueChanged(value: string) {
    console.log(value);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>