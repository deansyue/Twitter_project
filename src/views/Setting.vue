<template>
  <div class="setting-wrapper">
    <div class="leftContainer"><NavBar /></div>
    <div class="rightContainer">
      <div class="title">帳戶設定</div>
      <signEditing :currentUser="currentUser" :pageNow="pageNow" />
    </div>
  </div>
</template>
<script>
import NavBar from "./../components/NavBar";
import signEditing from "./../components/SignEditing";
import { mapState } from "vuex";
export default {
  components: {
    NavBar,
    signEditing,
  },
  data(){
    return{
      pageNow:true
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  
};
</script>