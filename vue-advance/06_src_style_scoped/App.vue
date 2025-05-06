<template>
  <div>
    <School></School>
    <hr>
    <Student></Student>
  </div>
</template>

<script>
import School from './components/School'
// Student组件后引入，如果发生样式冲突，以student中的为准
import Student from './components/Student'

export default {
  name: 'App',
  components: {School, Student}
}

</script>

<style>
.title {
  color: red;
}
</style>