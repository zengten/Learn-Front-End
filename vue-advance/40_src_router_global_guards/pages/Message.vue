<template>
  <div>
    <ul>
      <li v-for="(item, id) in messageList" :key="id">
        <!-- 注意to前面写好冒号，写冒号会当js代码解析，不写就是普通字符串 -->
        <!-- 跳转路由并携带params参数，to的对象写法 -->
        <router-link
            replace
            :to="{
                    // path: '/home/message/detail',  // 当使用params参数进行跳转时,不能使用path,只能使用name,因为path中有参数占位了
                    name: 'msgDetail', // 也可以使用name进行路由跳转
                    params: {
                      id: item.id,
                      title: item.title,
                    },
                  }"
        >{{ item.title }}
        </router-link>
        <button @click="pushShow(item)">push查看</button>
        <button @click="replaceShow(item)">replace查看</button>
      </li>
    </ul>
    <hr/>
    <!-- 注意写router-view标签，不然当前的路由跳转不生效 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messageList: [
        {id: "001", title: "消息001"},
        {id: "002", title: "消息002"},
        {id: "003", title: "消息003"},
      ],
    };
  },
  methods: {
    pushShow(item) {
      // 可以拿到路由器进行跳转，注意router（路由器）,push方法进行路由跳转
      this.$router.push({
        name: 'msgDetail',
        params: {
          id: item.id,
          title: item.title,
        }
      })
    },
    replaceShow(item) {
      this.$router.replace({
        name: 'msgDetail',
        params: {
          id: item.id,
          title: item.title,
        }
      })
    }
  },
  beforeDestroy() {
    console.log("message beforeDestroy");
  },
};
</script>
<style scoped>
</style>