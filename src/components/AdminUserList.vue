<template>
  <div class="admintweetCard-wrapper">
    <!--UserAvatar-->
    <div class="adminuser__avatar">
      <img class="avatar" :src="tweetUser.avatar">
    </div>

    <!--UserInfo-->
    <div class="adminuser__info">
      <div class="adminuser__title">
        <strong>
          {{ tweetUser.name }}
        </strong>
        <h5 class="adminuser__subtitle">
          {{ tweetUser.account | accountTag }}
        </h5>
      </div>
      <div class="adminuser__heart">
        <div class="adminuser__heart01">
        <img class="reply">
        <h6>1.5k</h6>
        </div>
        <div class="adminuser__heart02">
        <img v-if="isLiked" @click="deleteLikes()" class="heart-active">
        <img v-else @click="addLikes()" class="heart">
        <h6>20k</h6>
        </div>
      </div>
      <div class="adminuser__followinfo">
        <div class="adminuser__followinfo01">
        <strong>34個</strong><h5>跟隨中</h5>
        </div>
        <div class="adminuser__followinfo02">
        <strong>59位</strong><h5>跟隨者</h5>
        </div>
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
    }
  },
  methods: {
    fetchTweetCard() {
      const { User, id} = this.tweetCard
      this.id = id
      this.tweetUser = User
    },
  },
  created() {
    this.fetchTweetCard()
  }
}
</script>