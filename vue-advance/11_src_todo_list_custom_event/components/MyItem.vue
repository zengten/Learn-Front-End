<template>
  <div>
    <li>
      <label>
        <input type="checkbox" :checked="todoObj.finished" @change="handleCheck(todoObj.id)"/>
<!--  下面方式也能实现功能，但是不太推荐，因为修改了props中的数据      -->
<!--        <input type="checkbox" v-model="todoObj.finished"/>-->
        <span>{{ todoObj.title }}</span>
      </label>
      <button class="btn btn-danger" @click="handleDeleteObj">删除</button>
    </li>
  </div>
</template>

<script>
export default {
  name: 'MyItem',
  methods:{
    handleCheck(id) {
      console.log(id)
      this.handleCheckObj(id);
    },
    handleDeleteObj() {
      if (confirm('确定删除吗')) {
        this.deleteObj(this.todoObj.id)
      }
    }
  },
  props:['todoObj', 'handleCheckObj', 'deleteObj']
}
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>