<template>
  <div>
    <MyHeader :addObj="addTodoObj"></MyHeader>
    <MyList :dataList="todoList" :handleCheckObj="checkObj" :deleteObj="deleteTodoObj"></MyList>
    <MyFooter :dataList="todoList" :clearAllDataList="clearAllTodoList" :checkAllData="checkAllData"></MyFooter>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader'
import MyList from './components/MyList'
import MyFooter from './components/MyFooter'

export default {
  name: 'App',
  data() {
    return {
      todoList: [
        {id: '001', title: '吃饭', finished: true},
        {id: '002', title: '睡觉', finished: false},
        {id: '003', title: '写代码', finished: true},
      ]
    }
  },
  components: {MyHeader, MyList, MyFooter},
  methods: {
    addTodoObj(obj) {
      console.log(obj)
      this.todoList.unshift(obj)
    },
    checkObj(id) {
      this.todoList.forEach(item => {
        if (item.id === id) {
          item.finished = !item.finished;
        }
      })
    },
    checkAllData(val) {
      this.todoList.forEach(item => {
        item.finished = val;
      })
    },
    clearAllTodoList() {
      this.todoList = this.todoList.filter(item => !item.finished)
    },
    deleteTodoObj(id) {
      this.todoList = this.todoList.filter(item => item.id !== id)
    }
  }
}

</script>

<style>
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>