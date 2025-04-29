<template>
  <div>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ age }}</h2>
    <button @click="sayHello">点我提示信息</button>
    <!--使用插件过滤器-->
    <h2>{{ name | testFilter}}</h2>
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
    sayHello() {
      this.hello()
    }
  }
}
</script>

<style scoped>

</style>