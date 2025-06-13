<template>
  <div>
    <h1>人员列表</h1>
    <h2 style="color: red">Count组件中的求和为：{{ sum }}</h2>
    <h2>列表中第一个人的名字是：{{listFirstName}}</h2>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="addPerson">添加</button>
    <button @click="addPersonWang">添加一个姓王的</button>
    <button @click="addPersonRandom">添加一个随机姓名的</button>
    <ul>
      <li v-for="(item, id) in personList" :key="id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {nanoid} from "nanoid";

export default {
  name: 'Person',
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState('personAbout', ['personList']),
    ...mapState('countAbout', ['sum']),
    listFirstName() {
      // 使用 getters['personAbout/firstName'] 调用getters中的方法
      return this.$store.getters['personAbout/firstName']
    }
  },
  methods: {
    addPerson() {
      const person = {
        id: nanoid(),
        name: this.name
      }
      // 新写法使用 personAbout/ADD_PERSON，调用personAbout的mutations中的方法
      this.$store.commit('personAbout/ADD_PERSON', person)
      this.name = ''
    },
    addPersonWang() {
      const person = {
        id: nanoid(),
        name: this.name
      }
      // 新写法使用 personAbout/ADD_PERSON，调用personAbout的mutations中的方法
      this.$store.dispatch('personAbout/addPersonWang', person)
      this.name = ''
    },
    addPersonRandom() {
      this.$store.dispatch('personAbout/addPersonServer')
    }
  },
}
</script>

<style scoped>

</style>