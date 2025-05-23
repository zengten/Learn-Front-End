<template>
  <div>
    <Test1/>
    <Test2/>
    <Test3/>
    <Test4/>
  </div>
</template>

<script>
import Test1 from './components/Test1'
import Test2 from "./components/Test2";
import Test3 from "./components/Test3";
import Test4 from "./components/Test4";


export default {
  name: 'App',
  components: {Test1, Test2, Test3, Test4}
}

</script>

<style>

</style>