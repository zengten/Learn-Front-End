<template>
  <div>
    <h2 @click="showName">学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>学生年龄：{{ age + 1 }}</h2>
    <h2>学生心理年龄: {{ myAge }}</h2>
    <button @click="changeAge">点我修改年龄</button>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      myAge: this.age + 20
    }
  },
  methods: {
    showName() {
      alert(this.name);
    },
    changeAge() {
      // 使用props配置的属性，不允许再修改，除非使用变量中转
      // this.age++;
      this.myAge++;
    },
  },
  // props简单写法
  // props: ["name", "age", "sex"],
  // 限制props中属性的类型 类型错误了会提示错误信息
  // props: {
  //   name: String,
  //   age: Number,
  //   sex: String,
  // },
  // 接收时不仅限制类型还加上默认值的指定并指定它的必须性
  props: {
    name: {
      required: true,
      type: String,
    },
    age: {
      required: false,
      type: Number,
      default: 99,
    },
    sex: String,
  },
};
</script>