<template>
  <div class="tweetCard-wrapper">
    <div class="card-left">
      <router-link :to="{ name: 'user', params: { id: tweetUser.id }}">
        <img class="avatar" :src="tweetUser.avatar">
      </router-link>
    </div>
    <div class="card-right">
      <div class="card-head">
        <router-link class="card-name"
          :to="{ name: 'user', params: { id: tweetUser.id }}"
        >
          {{ tweetUser.name }}
        </router-link>
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
        <router-link :to="{ name: 'tweet', params: { id: id }}">
          <img class="reply" alt="">
        </router-link>
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
    initialTweetCard: {
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
      replysCount: 0,
      likesCount: 0,
      isLiked: false
    }
  },
  methods: {
    fetchTweetCard() {
      const { Likes, User, Replies, description, id, createdAt } = this.initialTweetCard
      this.id = id
      this.tweetUser = User
      this.description = description
      this.createdAt = createdAt
      this.replysCount = Replies.length
      this.likesCount = Likes.length
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
    }
  },
  created() {
    this.fetchTweetCard()
  }
}
</script>