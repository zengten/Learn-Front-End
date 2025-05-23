<template>
  <div>
    <ul class="todo-main">
      <!--第二种写法，使用transition-group-->
      <transition-group
          name="animate__animated animate__bounce"
          appear
          enter-active-class="animate__fadeInTopRight"
          leave-active-class="animate__fadeOutDown"
      >
        <MyItem
            v-for="todoObj in this.dataList"
            :key="todoObj.id"
            :todoObj="todoObj"
        />
      </transition-group>
    </ul>
  </div>
</template>

<script>
import MyItem from "@/components/MyItem";

export default {
  name: 'MyList',
  components: {MyItem},
  props: ['dataList']
}
</script>

<style scoped>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>