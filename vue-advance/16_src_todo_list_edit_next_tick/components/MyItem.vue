<template>
  <div>
    <li>
      <label>
        <input type="checkbox" :checked="todoObj.finished" @change="handleCheck(todoObj.id)"/>
        <!--  下面方式也能实现功能，但是不太推荐，因为修改了props中的数据      -->
        <!--        <input type="checkbox" v-model="todoObj.finished"/>-->
        <span v-show="!todoObj.isEdit">{{ todoObj.title }}</span>
        <!--@blur是触发失去焦点事件, $event可以获取到事件-->
        <!-- 为啥这里是单项数据绑定，而不是v-model -->
        <input
            type="text"
            :value="todoObj.title"
            v-show="todoObj.isEdit"
            @blur="handleBlur(todoObj, $event)"
            ref="inputTitle"
        >
      </label>
      <button class="btn btn-danger" @click="handleDeleteObj(todoObj.id, e)">删除</button>
      <button class="btn btn-edit" @click="handleEdit(todoObj)" v-show="!todoObj.isEdit">编辑</button>
    </li>
  </div>
</template>

<script>
export default {
  name: 'MyItem',
  methods: {
    handleCheck(id) {
      console.log(id)
      // this.handleCheckObj(id);
      // 触发全局事件
      this.$bus.$emit('checkObj', id);
    },
    handleDeleteObj(id) {
      if (confirm(`确定删除待办事项“${this.todoObj.title}”吗`)) {
        // this.deleteObj(id)
        this.$bus.$emit('deleteTodoObj', id)
      }
    },
    handleEdit(todoObj) {
      // 使用这种方式添加一个属性，这个属性不是响应式的，所以input框不展示
      // this.todoObj.isEdit = true
      // 下面代码有问题，每次编辑都追加属性
      // this.$set(todoObj, 'isEdit', true)
      // 没有就追加属性，有则更改属性值
      if (todoObj.hasOwnProperty('isEdit')) {
        todoObj.isEdit = true
      } else {
        console.log('todoObj没有isEdit')
        this.$set(todoObj, 'isEdit', true)
      }
      // 直接使用this.$refs.inputTitle.focus()，是不能获取到焦点的，因为此时input框还没重新解析放到页面上
      // 方案实现1：setTimeout定时器
      // setTimeout(() => {
      //   this.$refs.inputTitle.focus()
      // }, 200)
      // 方案实现2：$nextTick是在下一次dom更新后，要基于新更新的dom执行的回调
      this.$nextTick(function () {
        // 下次dom更新后，再获取元素的焦点
        this.$refs.inputTitle.focus()
      })
      console.log('@@@')
    },
    handleBlur(todoObj, e) {
      todoObj.isEdit = false
      let currentTitle = e.target.value.trim()
      if (!currentTitle) {
        return alert('输入不能为空')
      }
      // 触发编辑事件
      this.$bus.$emit('editTodoObj', todoObj.id, currentTitle)
    }
  },
  props: ['todoObj']
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