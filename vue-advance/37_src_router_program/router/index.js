import VueRouter from "vue-router";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Message from "@/pages/Message";
import News from "@/pages/News";
import Detail from "@/pages/Detail";

export default new VueRouter({
  routes: [
    {
      name: "rootPath",
      path: "/home",
      component: Home,
      // 注意子路由不用写斜杠+路径
      children: [
        {
          path: "news",
          component: News,
        },
        {
          path: "message",
          component: Message,
          children: [
            {
              name: "msgDetail", // 路由名称，可使用router-link标签进行name/path跳转
              path: "detail/:id/:title", // params参数进行占位,拼在路径中
              component: Detail,
              // props的第一种写法值为对象,该对象的所有key-value都会以props的形式传给detail组件(死数据)
              // props: { id: "001", title: "标题001" },
              // props的第二种写法,值为布尔值,当布尔值为真，就会把该路由组件收到的所有params(注意如果是query参数不会奏效的)参数以props的形式传递给detail组件
              // props: true
              // props的第三种写法,值为函数,函数被回调会将$route传进去,刚刚好可以从route中取出来params或者query参数(动态数据)
              // props($route) {
              //   return {
              //     id: $route.params.id,
              //     title: $route.params.title
              //   }
              // }

              // 使用解构的形式简写
              // props({ params }) {
              //   return {
              //     id: params.id,
              //     title: params.title,
              //   };
              // },

              // 把$route对象连续解构
              props({ params: { id, title } }) {
                return { id, title };
              },
            },
          ],
        },
      ],
    },
    {
      path: "/about",
      component: About,
    },
  ],
});
