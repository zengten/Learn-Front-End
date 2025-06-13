<template>
  <div class="container">
    <Count/>
  </div>
</template>

<script>
import Count from './components/Count'

export default {
  name: 'App',
  components: {Count}
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