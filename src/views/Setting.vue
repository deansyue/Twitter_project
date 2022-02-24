<template>
  <div class="container">
    <div class="leftContainer"><NavBar /></div>
    <div class="rightContainer">
      <div class="title">帳戶設定</div>
      <signEditing />
    </div>
  </div>
</template>
<script>
import NavBar from "./../components/NavBar";
import signEditing from "./../components/SignEditing";
export default {
  components: {
    NavBar,
    signEditing,
  },
};
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: 26% 74%;
  max-width: 1440px;
}
.leftContainer {
  height: 100vh;
}
.rightContainer {
  border: 1px solid #e6ecf0;
}
.title {
  border-bottom: 1px solid #e6ecf0;
  height: 55px;
  font-size: 19px;
  font-weight: 700;
  padding-left: 20px;
  padding-top: 13px;
}
</style>