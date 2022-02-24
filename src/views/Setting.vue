<template>
  <div class="settingContainer">
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