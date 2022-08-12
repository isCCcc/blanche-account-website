<template>
  <Layout class-prefix="layout">

    <NumberPad/>
    <Type/>
    <Notes/>
    <Tags/>

  </Layout>
</template>

<script lang="ts">
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Type from '@/components/Money/Type.vue';
import NumberPad from '@/components/Money/NumberPad.vue';

export default {
  name: 'Money',
  components: {NumberPad, Type, Notes, Tags}
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>