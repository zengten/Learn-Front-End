<template>
  <div class="demo">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <input v-bind-plus:value="name">
  </div>
</template>

<script>
export default {
  name: 'School',
  data() {
    return {
      name: '清华大学',
      address: '北京市',
    }
  }
}
</script>

<style>
.demo {
  background-color: greenyellow;
}
</style>