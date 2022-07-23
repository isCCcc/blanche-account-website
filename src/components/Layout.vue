<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  display: flex;
  height: 100vh;
  flex-direction: column;
  box-sizing: border-box;

  .content {
    overflow: auto;
    flex-grow: 1;
  }
}
</style>