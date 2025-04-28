<template>
  <div class="demo">
    <h2 @click="showName">学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: 'School',
  data() {
    return {
      name: '清华大学',
      address: '北京市'
    }
  },
  methods: {
    showName() {
      alert(this.name)
    }
  }
}
</script>

<style>
.demo {
  background-color: green;
}
</style>