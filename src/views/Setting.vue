<template>
  <div class="container">
    <div class="leftContainer"><NavBar /></div>
    <div class="rightContainer"></div>
  </div>
</template>
<script>
import NavBar from "./../components/NavBar";
export default {
  components: {
    NavBar
  }
}
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: 26% auto;
  max-width: 1440px;
}
.leftContainer {
  height: 100vh;
}

</style>