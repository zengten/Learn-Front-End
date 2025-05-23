<template>
  <div>
    <MyHeader :addObj="addTodoObj"></MyHeader>
    <MyList :dataList="todoList" :handleCheckObj="checkObj" :deleteObj="deleteTodoObj"></MyList>
    <MyFooter :dataList="todoList" @checkAllData="checkAllData" @clearDataFinished="clearDataFinished"></MyFooter>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader'
import MyList from './components/MyList'
import MyFooter from './components/MyFooter'

import pubsub from 'pubsub-js'

export default {
  name: 'App',
  data() {
    return {
      // 数据必须是数组格式，不能是字符串，所以要parse
      todoList: JSON.parse(localStorage.getItem('todoList')) || []
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
    clearDataFinished() {
      this.todoList = this.todoList.filter(item => !item.finished)
    },
    deleteTodoObj(id) {
      this.todoList = this.todoList.filter(item => item.id !== id)
    },
    editTodoObj(id, title) {
      this.todoList.forEach(item => {
        if (item.id === id) {
          item.title = title
        }
      })
    }
  },
  mounted() {
    this.$bus.$on('checkObj', this.checkObj);
    this.$bus.$on('deleteTodoObj', this.deleteTodoObj);
    this.$bus.$on('editTodoObj', this.editTodoObj);
  },
  beforeDestroy() {
    this.$bus.$off('checkObj');
    this.$bus.$off('deleteTodoObj');
    this.$bus.$off('editTodoObj');
  },
  watch: {
    todoList: {
      // 深度监视保证数值变化，就立即写入localStorage
      deep: true,
      handler(value) {
        localStorage.setItem('todoList', JSON.stringify(value))
      }
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

.btn-edit {
  color: #fff;
  background-color: skyblue;
  border: 1px solid rgb(103, 159, 180);
  margin-right: 5px;
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