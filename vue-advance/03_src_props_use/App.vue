<template>
  <div>
    <Student name="李四" sex="男"></Student>
    <hr>
    <!-- 当你在模板中直接写 age="18" 时，Vue 会将其视为字符串类型的值。而使用 v-bind 指令，可以让 Vue 对绑定的值进行 JavaScript 表达式的求值 -->
    <Student name="李四" :age="18" sex="男"></Student>
  </div>
</template>

<script>
import Student from './components/Student'

export default {
  name: 'App',
  data() {
    return {
      msg: '欢迎学习Vue'
    }
  },
  components: {Student}
}

</script>