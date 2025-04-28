<template>
  <div>
    <h2 v-text="msg" id="title" ref="titleRef"></h2>
    <!--需求：点击按钮打印标签上方元素-->
    <button @click="showFloorElement">点我打印上方元素</button>
    <School ref="sch"></School>
  </div>
</template>

<script>
import School from './components/School'

export default {
  name: 'App',
  data() {
    return {
      msg: '欢迎学习Vue'
    }
  },
  components: {School},
  methods: {
    showFloorElement() {
      // 1.使用原生的document来实现
      const element = document.getElementById("title");
      console.log(element)
      // 2.使用vue提供的ref来实现,this.$refs可以获取到所有设置了ref的标签元素集合
      console.log(this.$refs.titleRef)
      // 如果是组件标签，获得的是组件事例对象vc
      console.log(this.$refs.sch)
    }
  }
}

</script>