<template>
  <div class="replyCard-wrapper">
    <div class="card-left">
      <router-link :to="{ name: 'user', params: { id: userId }}">
        <img class="avatar" :src="image">
      </router-link>
    </div>
    <div class="card-right">
      <div class="card-head">
        <router-link class="card-name"
          :to="{ name: 'user', params: { id: userId }}"
        >
          {{ userName }}
        </router-link>
        <h5 class="card-account">
          {{ userAccount | accountTag }}
        </h5>
        <span>．</span>
        <h5 class="card-time">
          {{ createdAt | fromNow }}
        </h5>
      </div>
      <h5>回覆
        <router-link
          class="card-replyer"
          :to="{ name: 'user', params: { id: targetUserId }}"
        >
          {{ targetAccount | accountTag }}
        </router-link>
      </h5>
      <p>{{ comment }}</p>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, accountTagFilter } from '../utils/mixins'

// 假設傳入的資料
const dummyData = {
  // 被回覆的對象
  targetAccount: '被回覆的對象',
  targetUserId: 3,
  // 此卡片的其他資料
  tweetId: 13,
  userId: 4,
  comment: 'Maiores totam nobis corrupti dolores qui et est consectetur hic. Nec ess ita tibus rem quidem blanditiis iusto reiciendis ipsam id archi tecto.',
  createdAt: '2022-02-24T08:19:31.000Z',
  userName: '此卡片user',
  userAccount: '此卡片account',
  image: 'https://loremflickr.com/g/320/240/people/?random=91.66143782652539'
}

export default {
  mixins: [fromNowFilter, accountTagFilter],
  // props: {
  //   replyCard: {
  //     type: Object,
  //     required: true,
  //   }
  // },
  data() {
    return {
      // 被回覆的對象
      targetAccount: '',
      targetUserId: 0,
      // 此卡片的其他資料
      tweetId: 0,
      userId: 0,
      comment: '',
      createdAt: '',
      userName: '',
      userAccount: '',
      image: ''
    }
  },
  methods: {
    fetchReplyCard() {
      this.targetAccount = dummyData.targetAccount
      this.targetUserId = dummyData.targetUserId
      this.tweetId = dummyData.tweetId
      this.userId = dummyData.userId
      this.comment = dummyData.comment
      this.createdAt = dummyData.createdAt
      this.userName = dummyData.userName
      this.userAccount = dummyData.userAccount
      this.image = dummyData.image
    },
  },
  created() {
    this.fetchReplyCard()
  }
}
</script>