<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <button @click="handleSend">点击传递学生姓名</button>
    <h2>学生年龄：{{ age }}</h2>
    <h2>n的值为：{{ n }}</h2>
    <button @click="add">点击让n++</button>
    <button @click="death">点击销毁</button>
    <button @click="handleClick">点击触发click</button>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
      name: '张三',
      age: 18,
      n:1
    }
  },
  methods:{
    handleSend() {
      this.$emit('getStudentName', this.name)
    },
    add() {
      console.log('add方法被调用')
      this.n++;
    },
    death() {
      //销毁当前组件实例，销毁后所有该实例的自定义事件都不奏效了
      this.$destroy()
    },
    handleClick() {
      this.$emit('click')
    }
  },
  mounted() {
    // 3秒后自动销毁
    setTimeout(() => {
      this.death()
    }, 3000)
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