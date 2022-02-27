<template>
  <div class="app-tripple-column">
    <div class="left-container">
      <NavBar />
    </div>
    <div class="middle-container">
      <UserFollowTabs :is-follower-page="isFollowerPage" :params-id="paramsId"/>
      <div 
        v-for="followerCard in followerCards"
        :key="followerCard.id"
      >
        <UserFollowCards  :initial-follow-card="followerCard" />
      </div>
      
    </div>
    <div class="right-container">
      <Popular />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import UserFollowTabs from "../components/UserFollowTabs.vue"
import UserFollowCards from "../components/UserFollowCards.vue"
import Popular from "../components/Popular.vue";
import usersAPI from "../apis/users"
import { Toast } from "../utils/helpers"

// todo: 串接 API 取得資料
export default {
  mame: "UserFollowers",
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
        const { data, statusText } = await usersAPI.getFollowers({ userId: paramsId })
        if (statusText !== "OK") throw new Error(statusText)
        this.followerCards = data.map(card => {
          const id = card.followerId
          return {
            ...card,
            id: id
          }
        })
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