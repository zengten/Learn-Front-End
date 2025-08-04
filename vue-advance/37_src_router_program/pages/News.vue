<template>
  <div>
    <ul>news01</ul>
    <ul>news02</ul>
    <ul>news03</ul>
  </div>
</template>

<script>
export default {
  name: 'News',
  beforeDestroy() {
    console.log('news beforeDestroy')
  }
}
</script>

<style scoped>

</style>