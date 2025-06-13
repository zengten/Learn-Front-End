<template>
  <div>
    <h1>当前的求和为：{{ this.$store.state.sum }}</h1>
    <h1>当前的求和放大10倍为：{{ this.$store.getters.bigSum }}</h1>
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
      n: 1
    }
  },
  methods:{
    increment() {
      // 直接使用this上的store调用actions上的方法
      this.$store.dispatch('increment', this.n)
    },
    decrement() {
      this.$store.dispatch('decrement', this.n)
    },
    incrementOdd() {
      this.$store.dispatch('incrementOdd', this.n)
    },
    incrementWait() {
      this.$store.dispatch('incrementWait', this.n)
    },
  },
  mounted() {
    // 发现在vue组件实例上面有$store
    console.log('@@@', this)
  }
}
</script>

<style scoped>
button{
  margin-left: 5px;
}
</style>