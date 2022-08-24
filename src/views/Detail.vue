<template>
  <Layout>
    <div class="layout">
      <Nav/>
      <Content/>
    </div>
  </Layout>
</template>

<script lang="ts">
import Nav from '@/components/Detail/Nav.vue';
import Content from '@/components/Detail/Content.vue';

export default {
  name: 'Labels',
  components: {Content, Nav}
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  background-color: #ebebeb;
  display: flex;
  flex-wrap: wrap;
}
</style>