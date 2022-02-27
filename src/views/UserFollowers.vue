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
import usersAPI from "../apis/users"
import { Toast } from "../utils/helpers"

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
      followerCards: [],
      isFollowerPage: true,
      paramsId: 0, // 從網址取得目標使用者的 id
    }
  },
  methods: {
    async fetchFollowerCards(paramsId) {
      try {
        console.log('before')
        console.log(paramsId)
        const response = await usersAPI.getFollowers({ userId: paramsId })
        console.log('finish')
        console.log(response)
        // todo: 待資料庫可連線後、確認資料內容
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得追隨者資料，請稍後再試'
        })
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.paramsId = Number(id)
    this.fetchFollowerCards(this.paramsId)
  },
  beforeRouteUpdate (to, from, next) {
    // 當使用者直接從網址改變 params 時
    const { id } = to.params
    this.paramsId = Number(id)
    this.fetchFollowerCards(this.paramsId)
    next()
  }
};
</script>