<template>
  <div class="app-tripple-column" v-if="!isLoading">
    <div class="left-container">
      <NavBar />
    </div>
    <div class="middle-container">
      <UserFollowTabs :is-follower-page="isFollowerPage" :params-id="paramsId"/>
      <div 
        v-for="followingCard in followingCards"
        :key="followingCard.id"
      >
        <UserFollowCards :initial-follow-card="followingCard"/>
      </div>
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
  name: "UserFollowings",
  components: {
    NavBar,
    UserFollowTabs,
    UserFollowCards,
    Popular,
  },
  data() {
    return {
      followingCards: [],
      isFollowerPage: false,
      paramsId: 0,
      isLoading: true,
    }
  },
  methods: {
    async fetchFollowingCards(paramsId) {
      try {
        const { data, statusText } = await usersAPI.getFollowings({ userId: paramsId })
        if (statusText !== "OK") throw new Error(statusText)
        this.followingCards = data.map(card => {
          const id = card.followingId
          return {
            ...card,
            id: id
          }
        })
        this.isLoading = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得正在跟隨資料，請稍後再試'
        })
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.paramsId = Number(id)
    this.fetchFollowingCards(this.paramsId)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.paramsId = Number(id)
    this.fetchFollowingCards(this.paramsId)
    next()
  }
};
</script>