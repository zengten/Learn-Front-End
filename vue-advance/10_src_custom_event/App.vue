<template>
  <div class="app">
    <!--通过绑定一个自定义事件实现了子给父传递数据(自定义事件绑在子组件上) 第一种写法使用@或v-on-->
    <!--once代表改事件只执行一次-->
    <!--    <School @getSchoolName.once="getSchoolName"></School>-->
    <!--第二种写法 使用ref-->
    <School ref="school"></School>
    <hr>
    <!--组件把@click="show"默认处理为自定义事件，而不是原生点击事件，
    此时点击student组件区域并不会触发show方法执行，但在student组件中可以使用this.$emit触发这个自定义事件-->
   <Student @getStudentName="getStudentName" @click="show"></Student>
    <!--@click.navive之后就可以使用原生点击事件了-->
    <!-- <Student @getStudentName="getStudentName" @click.native="show"></Student> -->
    <hr>
    <h2>学校名称为：{{ schoolName }}</h2>
  </div>
</template>

<script>
import School from './components/School'
import Student from './components/Student'

export default {
  name: 'App',
  data() {
    return {
      schoolName: ''
    }
  },
  components: {School, Student},
  methods: {
    // 使用es6语法arr接受后面的所有参数
    getSchoolName(name, ...arr) {
      console.log('收到School组件的数据', name, arr)
    },
    getStudentName(name) {
      console.log('收到student组件的数据', name)
    },
    show() {
      alert('哈哈')
    }
  },
  mounted() {
    // app组件挂在完毕，就在school组件上绑定事件
    // this.$refs.school.$on('getSchoolName', this.getSchoolName)
    // once修饰的事件，只调用一次
    // this.$refs.school.$once('getSchoolName', this.getSchoolName)
    // 另外一种写法，必须写成箭头函数，因为箭头函数的this会往外找，找到app组件实例
    // this.$refs.school.$on('getSchoolName', name => {
    //   console.log('收到School组件的数据', name)
    //   this.schoolName = name
    // })
    // 错误写法，使用普通函数
    this.$refs.school.$on('getSchoolName', function (name) {
      // 这里的this是school组件实例，而不是app组件实例
      console.log(this);
      // 能够收到数据，但是不能在app组件上处理响应式数据
      console.log('收到School组件的数据', name)
      // 代码不生效
      this.schoolName = name
    })
    // 在mounted中绑定事件比标签中更加灵活，可以设置过一会再绑定，下面代码是3秒后绑定事件
    // setTimeout(() => {
    //   this.$refs.school.$on('getSchoolName',  (name) =>{
    //     console.log(this);
    //     console.log('收到School组件的数据', name)
    //   })
    // }, 3000)
  }
}

</script>

<style>
.app {
  background: gray;
  padding: 5px;
}
</style>