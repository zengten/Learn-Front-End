<template>
  <div class="school">
    <h2>学校名称：{{ schoolName }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="showName">点我打印学校名称</button>
  </div>
</template>

<script>
export default {
  name: 'School',
  data() {
    return {
      schoolName: '清华大学',
      address: '北京'
    }
  },
  methods: {
    showName() {
      console.log(this.schoolName)
    }
  }
}
</script>

<style>
  .school {
    background-color: aqua;
  }
</style>