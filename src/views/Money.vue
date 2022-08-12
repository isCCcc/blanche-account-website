<template>
  <Layout class-prefix="layout">

    <NumberPad/>
    <Type/>
    <Notes/>
    <Tags :data-source.sync="dataSource"/>

  </Layout>
</template>

<script lang="ts">
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Type from '@/components/Money/Type.vue';
import NumberPad from '@/components/Money/NumberPad.vue';

export default {
  name: 'Money',
  components: {NumberPad, Type, Notes, Tags},
  data(){
    return {
      dataSource:['衣','食','住','行','拍拖']
    }
  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>