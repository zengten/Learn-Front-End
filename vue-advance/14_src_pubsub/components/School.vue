<template>
  <div class="demo">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="sendSchoolName">点我将学校名称传递给学生组件</button>
  </div>
</template>

<script>
import pubsub from "pubsub-js"

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
      // this.$bus.$emit('test', this.name)
      // 发布消息
      pubsub.publish('test', this.name)
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