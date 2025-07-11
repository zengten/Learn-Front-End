<template>
  <div>
    <h2>我是Home组件</h2>
  </div>
</template>

<script>
export default {
  name: 'Home',
  beforeDestroy() {
    console.log('Home beforeDestroy')
  }
}
</script>

<style scoped>

</style>