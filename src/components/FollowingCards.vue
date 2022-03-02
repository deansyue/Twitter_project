<template>
  <div class="followship-wrapper">
    <img @click="$router.back()" class="arrow" />
    <h3>使用者名稱</h3>
    <h6>25篇推文</h6>
    <div class="followTabs">
      <router-link :to="{ name: 'user-followers', params: { id: 194 }}">
        <h4 class="followTab">
          追隨者
        </h4>
      </router-link>
      <router-link :to="{ name: 'user-followings', params: { id: 194 }}">
        <h4 class="followTab">
          正在追隨
        </h4>
      </router-link>
    </div>
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
import { Toast } from "../utils/helpers";
import { accountTagFilter, emptyImageFilter } from "../utils/mixins";

const dummyData = [
  {
      "followingId": 204,
      "account": "user3",
      "email": "user3@example.com",
      "name": "user3",
      "avatar": "https://loremflickr.com/g/320/240/people/?random=59.15705833128941",
      "cover": "https://loremflickr.com/g/600/240/shop/?random=42.8541367904834",
      "introduction": "In sit suscipit voluptate voluptatem voluptatem et ab corporis.",
      "isFollowed": true
  }
]

export default {
  mixins: [accountTagFilter, emptyImageFilter],
  data() {
    return {
      followCards: []
    }
  },
  methods: {
    fetchFollowCard() {
      // TODO: API
      this.followCards = [ ...dummyData ]
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
}
</script>