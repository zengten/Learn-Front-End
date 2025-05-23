<template>
  <div>
    <button @click="getStudentList">点击获取学生信息</button>
    <button @click="getCarList">点击获取汽车信息</button>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'App',
  methods: {
    getStudentList() {
      axios.get('http://localhost:8889/api1/students').then(resp => {
        console.log(resp.data)
      }, error => {
        console.log(error.message)
      })
    },
    getCarList() {
      axios.get('http://localhost:8889/api2/cars').then(resp => {
        console.log(resp.data)
      }, error => {
        console.log(error.message)
      })
    }
  }
}

</script>

