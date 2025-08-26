<template>
  <div class="person">
    <h2>姓名：{{ username }}</h2>
    <button @click="changeName">点击修改名称</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Person",
  setup() {
    let name = '张三'
    let changeName = () => {
      name = 'zhang-san'
      console.log(name)
      // this = undefined
      // console.log('@@', this.username)
      // 不能读取到
      // console.log('@@', username)
    }
    return {name, changeName}
  },
  data() {
    return {
      // data是可以读取setup的数据，但是setup不能读取data里的数据
      username: this.name
    }
  },
  methods: {},
  beforeCreate() {
    console.log('beforeCreate')
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