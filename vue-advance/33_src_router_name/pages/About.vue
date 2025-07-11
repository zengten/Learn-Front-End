<template>
  <div>
    <h2>我是About组件</h2>
  </div>
</template>

<script>
export default {
  name: 'About',
  beforeDestroy() {
    console.log('About beforeDestroy')
  }
}
</script>

<style scoped>

</style>