<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="keyword"/>&nbsp;
      <button @click="queryUserList">Search</button>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: 'Search',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    queryUserList() {
      if (!this.keyword) {
        alert('搜索关键字不能为空！')
        return
      }
      console.log(this)
      // 在发请求之前传参一次，让isLoading页面加载出来
      this.$bus.$emit('getUserList', {
        'isFirst': false,
        'userList': [],
        'isLoading': true,
        'errorMsg': '',
      })
      this.$http.get(`https://api.github.com/search/users?q=${this.keyword}`).then(resp => {
        this.$bus.$emit('getUserList', {
          'userList': resp.data.items,
          'isLoading': false,
          'errorMsg': ''
        })
      }).catch(error => {
        console.log('出现错误 ' + error.message)
        this.$bus.$emit('getUserList', {
          'userList': [],
          'isLoading': false,
          'errorMsg': error.message
        })
      })
    }
  }
}
</script>

<style scoped>

</style>