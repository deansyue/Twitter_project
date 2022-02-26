<template>
  <div class="app-tripple-column">
    <div class="left-container">
      <NavBar />
    </div>
    <div class="middle-container">
      <UserFollowTabs :is-follower-page="isFollowerPage" :params-id="paramsId"/>
      <UserFollowCards />
    </div>
    <div class="right-container">
      <Popular />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import UserFollowTabs from '../components/UserFollowTabs.vue'
import UserFollowCards from '../components/UserFollowCards.vue'
import Popular from "../components/Popular.vue";

// todo: 串接 API 取得資料
export default {
  components: {
    NavBar,
    UserFollowTabs,
    UserFollowCards,
    Popular,
  },
  data() {
    return {
      isFollowerPage: true,
      paramsId: 0,
    }
  },
  created() {
    const { id } = this.$route.params
    this.paramsId = Number(id)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.paramsId = Number(id)
    next()
  }
};
</script>