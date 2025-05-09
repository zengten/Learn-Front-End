<template>
  <div class="demo">
    <h2>学校名称：{{ name }}</h2>
    <!--  使用自定义事件传递数据  -->
    <button @click="handleSendSchoolName">点击向app组件传递数据</button>
    <!--  解绑自定义事件（传递数据）  -->
    <button @click="handleUnbind">点击解绑事件</button>
    <h2>学校地址：{{ address }}</h2>
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
  methods: {
    handleSendSchoolName() {
      this.$emit('getSchoolName', this.name, 111, 222, 333)
    },
    handleUnbind() {
      // 解绑一个自定义事件
      this.$off('getSchoolName')
      // 解绑多个自定义事件
      // this.$off(['getSchoolName', 'demo'])
      // 解绑所有的自定义事件
      // this.$off()
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