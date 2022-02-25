<template>
  <div class="replyCard-wrapper">
    <div class="card-left">
      <router-link :to="{ name: 'user', params: { id: userId }}">
        <img class="avatar" src="https://loremflickr.com/g/320/240/people/?random=91.66143782652539">
      </router-link>
    </div>
    <div class="card-right">
      <div class="card-head">
        <router-link class="card-name"
          :to="{ name: 'user', params: { id: userId }}"
        >
          name
        </router-link>
        <h5 class="card-account">
          account
        </h5>
        <span>．</span>
        <h5 class="card-time">
          {{ createdAt | fromNow }}
        </h5>
      </div>
      <h5>回覆
        <router-link
          class="card-replyer"
          :to="{ name: 'user', params: { id: userId }}"
        >
          {{ name | accountTag }}
        </router-link>
      </h5>
      <p>亂碼碼</p>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, accountTagFilter } from '../utils/mixins'
export default {
  mixins: [fromNowFilter, accountTagFilter],
  props: {
    replyCard: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      id: 0,
      userId: 0,
      comment: '',
      createdAt: '',
      name: 'apple' // waiting check
    }
  },
  methods: {
    fetchReplyCard() {
      const { id, UserId, comment, createdAt } = this.replyCard
      this.id = id
      this.userId = UserId
      this.comment = comment
      this.createdAt = createdAt
    },
  },
  created() {
    this.fetchReplyCard()
  }
}
</script>