<template>
  <div class="app">
    <School></School>
    <hr>
    <Student></Student>
  </div>
</template>

<script>
import School from './components/School'
import Student from './components/Student'

export default {
  name: 'App',
  components: {School, Student}
}

</script>

<style>
.app {
  background: gray;
  padding: 5px;
}
</style>