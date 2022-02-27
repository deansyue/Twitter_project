<template>
  <div class="userFollowCards">
    <div class="userFollowCards-left avatar">
      <img class="avatar" :src="followCard.avatar">
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
import { accountTagFilter } from "../utils/mixins"

export default {
  mixins: [accountTagFilter],
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
    addFollow(id) {
      // todo: 串接 API
      console.log(id)
      this.followCard = {
        ...this.followCard,
        isFollowed: true
      }
    },
    deleteFollow(id) {
      // todo: 串接 API
      console.log(id)
      this.followCard = {
        ...this.followCard,
        isFollowed: false
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