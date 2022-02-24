<template>
  <div class="settingContainer">
    <div class="leftContainer"><NavBar /></div>
    <div class="rightContainer">
      <div class="title">帳戶設定</div>
      <signEditing :currentUser="currentUser" />
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
  data() {
    return {
      currentUser: {
        id: 1,
        account: "vic123",
        name: "vic",
        email: "vvv123@gmail.com",
        password: "123",
      },//假裝是vueX的currentUser
    };
  },
};
</script>