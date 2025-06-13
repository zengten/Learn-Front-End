<template>
  <div>
    <h1>当前的求和为：{{ sum }}</h1>
    <h1>学校为：{{ school }}</h1>
    <h1>地址为：{{ address }}</h1>
    <h1>当前的求和放大10倍为：{{ bigSum }}</h1>
    <select v-model.number="n">
      <option value="1" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <!--如果@click事件没有小括号，会自动带上event参数-->
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
  // 使用计算属性代替一长串代码
  computed: {
    // 程序员自己亲自写计算属性
    // he() {
    //   return this.$store.state.sum;
    // },
    // mySchool() {
    //     return this.$store.state.school;
    // },
    // address() {
    //   return this.$store.state.address;
    // },
    // 对象写法：使用mapState生成计算属性，格式为：mapState{ 组件属性名: 'store状态名' }，因为mapState返回的是一个对象obj，加上...表示将对象展开
    // ...mapState({he: sum, mySchool: 'school', address: 'address'}), // 会报错，因为没有sum这个变量，必须加上引号
    // ...mapState({he: 'sum', mySchool: 'school', address: 'address'}),
    // 数组写法：当 store 状态名与组件使用场景的命名一致时，才能简写为数组写法
    ...mapState(['sum', 'school', 'address']),
    // *****************************************************************
    // 程序员亲自写计算属性
    // myBigSum() {
    //   return this.$store.getters.bigSum;
    // },
    // mapGetters对象写法，格式为：mapGetters{ 组件属性名: '状态名' }
    // ...mapGetters({bigSum: 'bigSum'}),
    // mapGetters数组写法
    ...mapGetters(['bigSum'])
  },
  mounted() {
    // 发现在vue组件实例上面有$store
    console.log('@@@', this)
    // mapState函数返回的是一个对象{}
    const mapStateObj = mapState({a: 'sum', b: 'school'});
    console.log('!!!', mapStateObj)
  },
  methods: {
    // 程序员自己写的方法调用store
    // increment(n) {
    //   // this.$store.dispatch('increment', n)
    //   // 可以跳过actions，直接调用mutations中的方法
    //   this.$store.commit('INCREMENT', n)
    // },
    // decrement(n) {
    //   // this.$store.dispatch('decrement', n)
    //   this.$store.commit('DECREMENT', n)
    // },

    // 使用mapMutations生成方法（对象形式）
    ...mapMutations({increment: 'INCREMENT', decrement: 'DECREMENT'}),
    // 使用mapMutations生成方法（数组形式，不推荐，因为mutations中的方法名是大写的，而组件中的方法名是驼峰式的）
    // ...mapMutations(['INCREMENT', 'DECREMENT']), // 组件中的方法调用也要改成INCREMENT和DECREMENT才行

    // **************************************************
    // 程序员亲自写的方法调用store
    // incrementOdd(n) {
    //   this.$store.dispatch('incrementOdd', n)
    // },
    // incrementWait(n) {
    //   this.$store.dispatch('incrementWait', n)
    // },

    // 使用mapActions生成方法（对象形式）
    // ...mapActions({incrementOdd: 'incrementOdd', incrementWait: 'incrementWait'}),
    // 使用mapActions生成方法（数组形式）
    ...mapActions(['incrementOdd', 'incrementWait'])
  }
}
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>