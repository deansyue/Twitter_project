<template>
  <div class="tweetCard-wrapper">
    <div class="card-left avatar" @click="linkedUser(tweetUser.id)">
      <img class="avatar" :src="tweetUser.avatar">
    </div>
    <div class="card-right">
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
        <!-- 取消ＩＣＯＮ -->
        <div class="card-cancel">
            <div class="cross-orange"></div>
        </div>
      </div>
      <div>
        {{ description }}
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
      
    }
  },
  methods: {
    fetchTweetCard() {
      const { User, description, id, createdAt } = this.tweetCard
      this.id = id
      this.tweetUser = User
      this.description = description
      this.createdAt = createdAt
    },
    linkedUser(userId) {
      this.$router.push({ name: 'user', params: { id: userId }})
    }
  },
  created() {
    this.fetchTweetCard()
  }
}
</script>