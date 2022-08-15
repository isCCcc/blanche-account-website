<template>
  <Layout class-prefix="layout">

    <NumberPad :type="record.type" @update:amount="onUpdateAmount" @submit="saveRecord"/>
    <Type :type.sync="record.type"/>
    <Notes @update:notes="onUpdateNotes"/>
    <Tags :data-source.sync="dataSource" @update:tags="onUpdateTags"/>

  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Type from '@/components/Money/Type.vue';
import NumberPad from '@/components/Money/NumberPad.vue';

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
}

@Component({
  components: {NumberPad, Type, Notes, Tags},
})
export default class Money extends Vue {

  dataSource: string[] = JSON.parse(window.localStorage.getItem('dataSource') || '[]');
  recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]'); // 记录用户的所有数据记录
  record: Record = {tags: [], notes: '', type: '-', amount: 0}; // 当前页面单个数据

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }

  onUpdateAmount(amount: string) {
    this.record.amount = parseFloat(amount);
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  saveRecord() {
    const rec: Record = JSON.parse(JSON.stringify(this.record));
    rec.createAt = new Date();
    this.recordList.push(rec);
  }

  @Watch('recordList')
  onRecordListChanged() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }

  @Watch('dataSource')
  onDataSourceChanged() {
    window.localStorage.setItem('dataSource', JSON.stringify(this.dataSource));
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>