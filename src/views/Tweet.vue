<template>
  <div class="app-tripple-column">
    <div class="left-container">
      <NavBar />
    </div>
    <div class="middle-container">
      <div v-for="replyCard in replyCards" :key="replyCard.id">
        <ReplyCard 
          :relyer="replyer"
          :reply-card="replyCard"
        />
      </div>
    </div>
    <div class="right-container">

    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import ReplyCard from '../components/ReplyCard.vue'

// 單篇推文的回覆內容：
// const dataOne

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
    ReplyCard
  },
  data () {
    return {
      // todo: 本頁的主推文資料＆切版
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
    }
  },
  created () {
    this.fetchOtherReplyCards ()
  }
}
</script>