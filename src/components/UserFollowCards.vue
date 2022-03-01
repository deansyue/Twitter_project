<template>
  <div class="userFollowCards">
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
      <!-- TODO: 待 API 後改成 followCard.name -->
      <h5 class="name">{{ '使用者名稱' }}</h5>
      <h5 class="account">{{ followCard.account | accountTag }}</h5>
      <p>{{ followCard.introduction }}</p>
    </div>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import { accountTagFilter, emptyImageFilter } from "../utils/mixins";

export default {
  mixins: [accountTagFilter, emptyImageFilter],
  props: {
    initialFollowCard: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      followCard: {}
    }
  },
  methods: {
    fetchFollowCard() {
      this.followCard = { ...this.initialFollowCard }
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
    this.fetchFollowCard()
  },
  watch: {
    initialFollowCard(newValue) {
      this.initialFollowCard = newValue
      this.fetchFollowCard()
    }
  }
}
</script>