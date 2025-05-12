<template>
  <div class="todo-footer" v-show="total">
    <label>
      <!--注意这里是单向绑定，数据响应到页面，设置的计算属性，只能调用get，不会调用set-->
      <input type="checkbox" :checked="isAll" @change="handleCheckAll"/>
      <!--双向绑定，使用v-model进行数据绑定更加简单，因为这里是计算属性的值，可以使用v-model，与myItem组件里不同   -->
      <!--      <input type="checkbox" v-model="isAll"/>-->
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ total }}
    </span>
    <button class="btn btn-danger" @click="clearFinished">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: 'MyFooter',
  computed: {
    doneTotal() {
      return this.dataList.reduce((pre, item) => pre + (item.finished ? 1 : 0), 0)
    },
    total() {
      return this.dataList.length
    },
    isAll: {
      get() {
        console.log('isAllGet')
        return this.total === this.doneTotal && this.total > 0
      },
      set(val) {
        console.log('isAllSet')
        this.$emit('checkAllData', val)
      }
    }
  },
  methods: {
    handleCheckAll(event) {
      console.log('@', event)
      this.$emit('checkAllData', event.target.checked)
    },
    clearFinished() {
      this.$emit('clearDataFinished')
    }
  },
  props: ['dataList']
}
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>