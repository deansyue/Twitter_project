<template>
  <div class="tweetCard-wrapper">
    <div class="card-left avatar" @click="linkedUser(tweetUser.id)">
      <img class="avatar" :src="tweetUser.avatar">
    </div>
    <div class="card-right" @click="linkedReply($event, id)">
      <div class="card-head">
        <h5 class="card-name" @click="linkedUser(tweetUser.id)">
          {{ tweetUser.name }}
        </h5>
        <h5 class="card-account">
          {{ tweetUser.account | accountTag }}
        </h5>
        <span>．</span>
        <h5 class="card-time">
          {{ createdAt | fromNow }}
        </h5>
      </div>
      <p>
        {{ description }}
      <p>
      <div class="card-foot">
        <img class="reply">
        <h6>{{ replysCount }}</h6>
        <img v-if="isLiked" @click="deleteLikes()" class="heart-active">
        <img v-else @click="addLikes()" class="heart">
        
        <h6>{{ likesCount }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, accountTagFilter } from '../utils/mixins'
export default {
  mixins: [fromNowFilter, accountTagFilter],
  props: {
    tweetCard: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      id: 0,
      tweetUser: {},
      description: '',
      createdAt: '',
      replysCount: 0, // 尚為預設值
      likesCount: 0, // 尚為預設值
      isLiked: false // 尚為預設值
    }
  },
  methods: {
    fetchTweetCard() {
      // 待加回 replysCount、likesCount相關屬性
      const { User, description, id, createdAt } = this.tweetCard
      this.id = id
      this.tweetUser = User
      this.description = description
      this.createdAt = createdAt
      // 待 API 加入此值
      // this.replysCount = Replies.length
      // this.likesCount = Likes.length
    },
    addLikes() {
      // todo: connect API
      this.isLiked = true
      this.likesCount++
    },
    deleteLikes() {
      // todo: connect API
      this.isLiked = false
      this.likesCount--
    },
    linkedUser(userId) {
      this.$router.push({ name: 'user', params: { id: userId }})
    },
    linkedReply($event, tweetId) {
      // 點擊卡片可進入瀏覽回覆頁面、若點擊到愛心則不跳轉畫面
      if ($event.target.matches('.heart')
        || $event.target.matches('.heart-active')
        || $event.target.matches('.avatar')
        || $event.target.matches('.card-name')) return
        
      this.$router.push({ name: 'tweet', params: { id: tweetId }})
    }
  },
  created() {
    this.fetchTweetCard()
  }
}
</script>