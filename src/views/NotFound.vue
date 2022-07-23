<template>
    <div class="not-found">
      <br> <h1>404</h1> <br>
      <p>当前页面找不到，请检查路径是否正确</p> <br>
      <router-link to="/">返回首页</router-link>
    </div>
</template>

<script lang="ts">
export default {
name: "NotFound"
}
</script>

<style lang="scss" scoped>
.not-found{
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  box-sizing: border-box;
}
</style>