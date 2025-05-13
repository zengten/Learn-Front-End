<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ age }}</h2>
    <button @click="deleteStudent">销毁学生组件</button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
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
    // this.$bus.$on('test', (name) => {
    //   console.log('收到学校的数据', name)
    // })
    // 订阅消息
    this.pubId = pubsub.subscribe('test', (name, msg) => {
      console.log('student收到消息', name, msg)
    })
  },
  beforeDestroy() {
    // this.$bus.$off('test')
    // 取消订阅
    pubsub.unsubscribe(this.pubId)
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