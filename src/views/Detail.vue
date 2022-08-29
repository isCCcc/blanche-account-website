<template>
  <Layout>
    <div class="layout">
      <Nav :date.sync="theDate"/>
<!--      <Nav :date="theDate" @update:date="updateDate"/>-->
      <Content :the-date="theDate"/>
    </div>
  </Layout>
</template>

<script lang="ts">
import Nav from '@/components/Detail/Nav.vue';
import Content from '@/components/Detail/Content.vue';
import {Component, Watch} from 'vue-property-decorator';

import Vue from 'vue';

@Component({
  components: {Content, Nav},
})
export default class Detail extends Vue {

  theDate = this.$store.state.theDate;

  @Watch('theDate')
  dateChanged(newDate: string) {
    this.theDate = newDate;
    this.$store.commit('saveDate', newDate);
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  background-color: #ebebeb;
  display: flex;
  flex-wrap: wrap;
}
</style>