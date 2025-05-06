<template>
  <div>
    <ul class="todo-main">
      <MyItem
          v-for="todoObj in this.dataList"
          :key="todoObj.id"
          :todoObj="todoObj"
          :handleCheckObj="handleCheckObj"
          :deleteObj="deleteObj"
      />
    </ul>
  </div>
</template>

<script>
import MyItem from "@/components/MyItem";

export default {
  name: 'MyList',
  components: {MyItem},
  props:['dataList', 'handleCheckObj', 'deleteObj']
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