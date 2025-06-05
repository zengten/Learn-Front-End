<template>
  <div class="container">
    <Category title="美食">
      <template scope="obj">
        <ul>
          <li v-for="(item, index) in obj.dataList" :key="index">
            {{ item }}
          </li>
        </ul>
      </template>
    </Category>
    <Category title="美食">
      <!--可以使用es语法进行解构-->
      <template scope="{dataList}">
        <ul>
          <li style="color:yellow" v-for="(item, index) in dataList" :key="index">
            {{ item }}
          </li>
        </ul>
      </template>
    </Category>
    <Category title="美食">
      <!--      <template slot-scope="{dataList}">-->
      <!--        <h4 v-for="(item, index) in dataList" :key="index">-->
      <!--          {{ item }}-->
      <!--        </h4>-->
      <!--      </template>-->
      <!--      另外的写法：slot-scope和v-slot，但是slot-scope也已经被弃用了-->
      <template v-slot={dataList}>
        <h4 v-for="(item, index) in dataList" :key="index">
          {{ item }}
        </h4>
      </template>
    </Category>
  </div>
</template>

<script>
import Category from './components/Category'

export default {
  name: 'App',
  components: {Category}
}

</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
}

img {
  width: 100%;
}


h4 {
  text-align: center;
}

</style>