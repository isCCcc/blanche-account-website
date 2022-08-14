<template>
  <Layout class-prefix="layout">
    {{ record }}
    <NumberPad @update:amount="onUpdateAmount"/>
    <Type @update:type="onUpdateType"/>
    <Notes @update:notes="onUpdateNotes"/>
    <Tags :data-source.sync="dataSource" @update:tags="onUpdateTags"/>

  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Type from '@/components/Money/Type.vue';
import NumberPad from '@/components/Money/NumberPad.vue';

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
}
@Component({
  components: {NumberPad, Type, Notes, Tags},
})
export default class Money extends Vue {

  dataSource = ['衣', '食', '住', '行', '拍拖'];
  record: Record = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }

  onUpdateAmount(amount: string) {
    this.record.amount = parseFloat(amount);
  }

  onUpdateType(type: string) {
    this.record.type = type;
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>