<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="showMobile">点击展示手机号</button>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Person",
  data() {
    return {
      name: '张三',
      age: 20,
      mobile: '18112344321'
    }
  },
  methods: {
    showMobile() {
      alert(this.mobile)
    },
    changeName() {
      this.name = 'zhang-san'
    },
    changeAge() {
      this.age++
    }
  }
}
</script>

<style scoped>
.person {
  background-color: skyblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>