<template>
  <div>
    <h1>当前的求和为：{{ sum }}</h1>
    <select v-model.number="n">
      <option value="1" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">加</button>
    <button @click="decrement">减</button>
    <button @click="incrementOdd">当求和为奇数才加</button>
    <button @click="incrementWait">等一等加</button>
  </div>
</template>

<script>
export default {
  name: 'Count',
  data() {
    return {
      sum: 0,
      n: 1
    }
  },
  methods:{
    increment() {
      this.sum += this.n;
    },
    decrement() {
      this.sum -= this.n;
    },
    incrementOdd() {
      if ((this.sum & 1) === 1) {
        this.sum += this.n;
      }
    },
    incrementWait() {
      setTimeout(() => {
        this.sum += this.n;
      }, 1000)
    },
  }
}
</script>

<style scoped>
button{
  margin-left: 5px;
}
</style>