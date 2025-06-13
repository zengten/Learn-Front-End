<template>
  <div>
    <h1>人员列表</h1>
    <h2 style="color: red">Count组件中的求和为：{{sum}}</h2>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="addPerson">添加</button>
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
    ...mapState(['personList', "sum"])
  },
  methods: {
    addPerson() {
      const person = {
        id: nanoid(),
        name: this.name
      }
      this.$store.commit('ADD_PERSON', person)
      this.name = ''
    }
  },
}
</script>

<style scoped>

</style>