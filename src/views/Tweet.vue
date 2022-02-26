<template>
  <div class="app-tripple-column">
    <div class="left-container">
      <NavBar />
    </div>
    <div class="middle-container">
      <div class="tweet-wrapper">
        <div class="tweet-title">
          <img @click="$router.back()" class="arrow">
          <h3>推文</h3>
        </div>
        <div class="tweet-main">
          <div class="card-head">
            <div class="card-head-left avatar" @click="linkedUser(userId)">
              <img class="avatar" src="https://loremflickr.com/g/320/240/people/?random=91.66143782652539">
            </div>
            <div class="card-head-right">
              <h5 @click="linkedUser(userId)">名稱</h5>
              <h5>{{ '帳號' | accountTag }}</h5>
            </div>
          </div>
          <div class="tweet-body">
            <p>Maiores totam nobis corrupti dolores qui et est consectetur hic. Nec ess ita tibus rem quidem blanditiis iusto reiciendis ipsam id archi tecto.</p>
            <h5>{{ '2022-02-23T23:19:20.000Z' | timeFormat }}</h5>
          </div>
          <div class="tweet-footer">
            <div class="tweet-footer-info">
              <h4><strong>34</strong> 回覆</h4>
              <h4><strong>808</strong> 喜歡次數</h4>
            </div>
            <div class="tweet-footer-buttons">
              <img class="reply-big">
              <img v-if="isLiked" @click="deleteLike()" class="heart-big-active">
              <img v-else @click="addLike()" class="heart-big">
            </div>
          </div>
        </div>
      </div>
      <div class="tweet-replies"
        v-for="replyCard in replyCards"
        :key="replyCard.id"
      >
        <ReplyCard 
          :relyer="replyer" :reply-card="replyCard"
        />
      </div>
    </div>
    <div class="right-container">
      <Popular />
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import ReplyCard from '../components/ReplyCard.vue'
import Popular from '../components/Popular.vue'
import { accountTagFilter, timeFormatFilter } from '../utils/mixins'

// 個人主頁的回覆內容：
const dummyDataTwo = {
  User: {
    id: 2,
    account: "user1",
    email: "user1@example.com",
    password: "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
    name: "user1",
    avatar:
      "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
    cover: "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
    introduction: "Culpa minus ea ullam.",
    role: "user",
    createdAt: "2022-02-24T08:19:30.000Z",
    updatedAt: "2022-02-24T08:19:30.000Z"
  },
  Replies: [
    {
      id: 1,
      UserId: 2,
      TweetId: 1,
      comment:
        "Maiores totam nobis corrupti dolores qui et est consectetur hic. Necessitatibus rem quidem blanditiis iusto reiciendis ipsam id architecto. ",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      Tweet: {
        id: 1,
        UserId: 2,
        description: "a",
        createdAt: "2022-02-24T08:19:31.000Z",
        updatedAt: "2022-02-24T08:19:31.000Z",
        User: {
          id: 2,
          name: "user1",
          account: "user1"
        }
      }
    },
    {
      id: 2,
      UserId: 2,
      TweetId: 1,
      comment: "odit",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      Tweet: {
        id: 1,
        UserId: 2,
        description: "a",
        createdAt: "2022-02-24T08:19:31.000Z",
        updatedAt: "2022-02-24T08:19:31.000Z",
        User: {
          id: 2,
          name: "user1",
          account: "user1"
        }
      }
    },
    {
      id: 3,
      UserId: 4,
      TweetId: 1,
      comment:
        "Quasi modi sint fuga recusandae. Et et ducimus consectetur soluta. Deleniti inventore error possimus nesciunt itaque ut sunt.",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      Tweet: {
        id: 1,
        UserId: 2,
        description: "a",
        createdAt: "2022-02-24T08:19:31.000Z",
        updatedAt: "2022-02-24T08:19:31.000Z",
        User: {
          id: 2,
          name: "user1",
          account: "user1"
        }
      }
    },
    {
      id: 4,
      UserId: 2,
      TweetId: 2,
      comment: "Nulla est veniam.\nEius nihil ex.",
      createdAt: "2022-02-24T08:19:31.000Z",
      updatedAt: "2022-02-24T08:19:31.000Z",
      Tweet: {
        id: 2,
        UserId: 2,
        description:
          "Ipsam expedita natus accusamus eos expedita doloribus qui veniam est. Mollitia est eos et ratione eaque distinctio. Eum magnam dolor. Odio nobis minus at cum illum et ex dignissimos.",
        createdAt: "2022-02-24T08:19:31.000Z",
        updatedAt: "2022-02-24T08:19:31.000Z",
        User: {
          id: 2,
          name: "user1",
          account: "user1"
        }
      }
    }
  ]
};

export default {
  components: {
    NavBar,
    ReplyCard,
    Popular
  },
  mixins: [accountTagFilter, timeFormatFilter],
  data () {
    return {
      // todo: 主貼文資料、串接 API
      isLiked: false,
      // todo: 本頁的下方回覆卡片資料、串接 API
      replyer: {},
      replyCards: []
    }
  },
  methods: {
    // 個人主頁：
    fetchOtherReplyCards () {
      // todo: 串接 API
      this.replyer = { ...dummyDataTwo.User }
      this.replyCards = [ ...dummyDataTwo.Replies ]
    },
    addLike () {
      // to: connect API
      this.isLiked = true
    },
    deleteLike() {
      // to: connect API
      this.isLiked = false
    },
    linkedUser(userId) {
      // todo: check id after connect API
      this.$router.push({ name: 'user', params: { id: userId }})
    },
  },
  created () {
    this.fetchOtherReplyCards ()
  }
}
</script>