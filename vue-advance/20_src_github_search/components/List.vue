<template>
  <div class="row">
    <div v-show="info.userList.length" class="card" v-for="user in info.userList" :key="user.id">
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style='width: 100px'/>
      </a>
      <p class="card-text">{{user.login}}</p>
    </div>
    <h1 v-show="info.isFirst">Welcome!</h1>
    <h1 v-show="info.isLoading">loading</h1>
    <h1 v-show="info.errorMsg">出现错误，{{info.errorMsg}}</h1>
  </div>
</template>

<script>

export default {
  name: 'List',
  data() {
    return {
      info:{
        userList: [],
        isFirst: true,
        isLoading: false,
        errorMsg:''
      }
    }
  },
  methods: {

  },
  mounted() {
    this.$bus.$on('getUserList', (dataObj) => {
      // es6语法，合并两个对象，相同属性时后者覆盖前者
      this.info = {...this.info, ...dataObj}
    })
  }
}
</script>

<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>