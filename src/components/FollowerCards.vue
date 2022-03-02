<template>
  <div class="followship-wrapper">
    <div class="userFollowCards" 
      v-for="followCard in followCards" :key="followCard.id">
      <div class="userFollowCards-left avatar">
        <img class="avatar" :src="followCard.avatar | emptyImage">
      </div>
      <div class="userFollowCards-right">
        <button
          @click="deleteFollow(followCard.id)"
          v-if="followCard.isFollowed"
          class="btn active"
        >正在跟隨</button>
        <button 
          @click="addFollow(followCard.id)"
          v-else class="btn"
        >跟隨</button>
        <h5 class="name">{{ followCard.name }}</h5>
        <h5 class="account">{{ followCard.account | accountTag }}</h5>
        <p>{{ followCard.introduction }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import { mapState } from "vuex";
import { Toast } from "../utils/helpers";
import { accountTagFilter, emptyImageFilter } from "../utils/mixins";

export default {
  mixins: [accountTagFilter, emptyImageFilter],
  computed: {
    ...mapState(["currentUser"]),
  },
  data() {
    return {
      paramsId: 0,
      followCards: []
    }
  },
  methods: {
    async fetchFollowCard(userId) {
      try {
        const { statusText, data } = await usersAPI.getFollowers({ userId })
        if (statusText !== "OK") throw new Error()
        this.followCards = [ ...data ]

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error.message
        })
      }
    },
    async addFollow(id) {
      try {
        const { statusText, data } = await usersAPI.addFollow({ id })
        if (statusText !== "OK" || data.status !== "success") throw new Error()
        Toast.fire({
          icon: "success",
          title: data.message
        })
        this.followCard = {
          ...this.followCard,
          isFollowed: true
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法進行追蹤，請稍後再試"
        })
      }
    },
    async deleteFollow(id) {
      try {
        const { statusText, data } = await usersAPI.deleteFollow({
          followingId: id
        })
        if (statusText !== "OK" || data.status !== "success") throw new Error()
        Toast.fire({
          icon: "success",
          title: data.message
        })
        this.followCard = {
          ...this.followCard,
          isFollowed: false
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法進行追蹤，請稍後再試"
        })
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.paramsId = Number(id)
    this.fetchFollowCard(this.paramsId)
  },
  beforeRouteUpdate() {
    const { id } = this.$route.params
    this.paramsId = Number(id)
    this.fetchFollowCard(this.paramsId)
  }
}
</script>