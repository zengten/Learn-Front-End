<template>
  <div>
    <h1>当前的求和为：{{ sum }}</h1>
    <h3>我在{{ school }}，学习{{ subject }}</h3>
    <h1 style="color: red">person组件数据有：{{ personList.length }}个</h1>
    <h1>当前的求和放大10倍为：{{ bigSum }}</h1>
    <select v-model.number="n">
      <option value="1" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">加</button>
    <button @click="decrement(n)">减</button>
    <button @click="incrementOdd(n)">当求和为奇数才加</button>
    <button @click="incrementWait(n)">等一等加</button>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from "vuex";

export default {
  name: 'Count',
  data() {
    return {
      n: 1
    }
  },
  computed: {
    ...mapState('countAbout', ['sum', 'school', 'subject']),
    ...mapGetters('countAbout', ['bigSum']),
    ...mapState('personAbout', ['personList'])
    // 可以将对象弄成计算属性，在template中需要使用对象.属性获取数据，如countAbout.sum
    // ...mapState(['countAbout', 'personAbout'])
  },
  methods: {
    ...mapMutations('countAbout', {increment: 'INCREMENT', decrement: 'DECREMENT'}),
    ...mapActions('countAbout', ['incrementOdd', 'incrementWait'])
  }
}
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>