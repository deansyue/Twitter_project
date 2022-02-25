<template>
  <div class="signup-wrapper">
    <img class="logo-big" alt="" />
    <h2>建立你的帳號</h2>
    <signEditing :pageNow="pageNow" />
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
  data(){
    return{
      pageNow:false
    }
  },
};
</script>