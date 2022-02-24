<template>
  <div class="signup-wrapper">
    <img class="logo-big" alt="" />
    <h2>登入 Alphaitter</h2>
    <signEditing />
    <div class="cancel-wrapper">
      <router-link to="/signin" class="link"> 取消 </router-link>
    </div>
  </div>
</template>
<script>
import signEditing from "./../components/SignEditing";

export default {
  components: {
    signEditing,
  },
};
</script>