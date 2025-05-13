<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ age }}</h2>
    <button @click="deleteStudent">销毁学生组件</button>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
      name: '张三',
      age: 18
    }
  },
  methods:{
    deleteStudent() {
      this.$destroy()
    }
  },
  mounted() {
    // 给全局事件总线绑定一个事件回调
    this.$bus.$on('test', (name) => {
      console.log('收到学校的数据', name)
    })
  },
  beforeDestroy() {
    console.log('准备销毁学生组件')
    // 解绑事件
    this.$bus.$off('test')
  }
}
</script>

<style scoped>
.student{
  background: pink;
  padding: 5px;
  margin-bottom: 10px;
}
</style>