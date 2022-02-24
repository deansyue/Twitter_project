<template>
  <div class="tweetCard-wrapper">
    <div class="card-left">
      <img
        class="avatar-S" alt=""
        :src="tweetCard.User.avatar"
      >
    </div>
    <div class="card-right">
      <div class="card-head">
        <h5 class="card-name">{{ tweetCard.User.name }}</h5>
        <h5 class="card-account">{{ tweetCard.User.account | accountTag }}</h5>
        <span>●</span>
        <h5 class="card-time">{{ tweetCard.createdAt | fromNow}}</h5>
      </div>
      <p>
        {{ tweetCard.description }}
      <p>
      <div class="card-foot">
        <img class="reply" alt="">
        <h6>{{ tweetCard.Replies.length }}</h6>
        <img class="heart" alt="">
        <h6>{{ tweetCard.Likes.length }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, accountTagFilter, timeFormatFilter } from '../utils/mixins'
export default {
  // todo: 修正 mixins 日期格式
  mixins: [fromNowFilter, accountTagFilter, timeFormatFilter],
  props: {
    tweetCard: {
      type: Object,
      required: true,
    }
  }
}
</script>