<template>
  <div class="userSelf-wrapper">
    <div class="left-container"><NavBar /></div>
    <div class="middle-container"></div>
    <div class="right-container"><Popular /></div>
  </div>
</template>
<script>
import NavBar from "./../components/NavBar";
import Popular from "./../components/Popular";
export default {
  components: {
    NavBar,
    Popular
  },
}
</script>
<style lang="scss">//要放popular先畫框架最後刪掉
.userSelf-wrapper {
  max-width: 1440px;
  display: grid;
  grid-template-columns: 26% 42% 32%;
  margin: 0 auto;
  .middle-container {
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  height: 100vh;
  }
} 
</style>