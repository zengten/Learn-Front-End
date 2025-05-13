<template>
  <div class="demo">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="sendSchoolName">点我将学校名称传递给学生组件</button>
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
  },
  methods:{
    sendSchoolName() {
      // 通过全局事件总线传递学校名称数据
      this.$bus.$emit('test', this.name)
    }
  }
}
</script>

<style>
.demo {
  background: skyblue;
  padding: 5px
}
</style>