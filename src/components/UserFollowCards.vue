<template>
  <div>
    <div class="userFollowCards" v-for="followCard in followCards" :key="followCard.id">
      <div class="userFollowCards-left avatar">
        <img class="avatar" :src="followCard.avatar">
      </div>
      <div class="userFollowCards-right">
        <button
          @click="deleteFollow(followCard.id)"
          v-if="followCard.isFollow"
          class="btn active"
        >正在跟隨</button>
        <button 
          @click="addFollow(followCard.id)"
          v-else class="btn"
        >跟隨</button>
        <h5>{{ followCard.name }}</h5>
        <h5>{{ followCard.account | accountTag }}</h5>
        <p>{{ followCard.introduction }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { accountTagFilter } from '../utils/mixins'

const dummyData = [
  {
    id: 2,
    account: "suser1",
    email: "user1@example.com",
    password: "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
    name: "user1",
    avatar:
      "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
    cover: "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
    introduction: "Culpa minus ea ullam.",
    role: "user",
    createdAt: "2022-02-24T08:19:30.000Z",
    updatedAt: "2022-02-24T08:19:30.000Z",
    isFollow: true,
  },
  {
    id: 3,
    account: "suser2",
    email: "user2@example.com",
    password: "$2a$10$YJJ73FrX..vmv62zuQSKkOv7ab58cCsMn3.M//m96OcSEcnK8nKCW",
    name: "user2",
    avatar:
      "https://loremflickr.com/g/320/240/people/?random=25.554631896129855",
    cover:
      "https://loremflickr.com/g/600/240/shop/?random=40.433590504699815",
    introduction: "Rem eum quia qui.",
    role: "user",
    createdAt: "2022-02-24T08:19:30.000Z",
    updatedAt: "2022-02-24T08:19:30.000Z",
    isFollow: false,
  },
  {
    id: 4,
    account: "suser3",
    email: "user3@example.com",
    password: "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
    name: "user3",
    avatar:
      "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
    cover: "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
    introduction: "Culpa minus ea ullam.",
    role: "user",
    createdAt: "2022-02-24T08:19:30.000Z",
    updatedAt: "2022-02-24T08:19:30.000Z",
    isFollow: false,
  },
  {
    id: 5,
    account: "suser4",
    email: "user4@example.com",
    password: "$2a$10$YJJ73FrX..vmv62zuQSKkOv7ab58cCsMn3.M//m96OcSEcnK8nKCW",
    name: "user4",
    avatar:
      "https://loremflickr.com/g/320/240/people/?random=25.554631896129855",
    cover:
      "https://loremflickr.com/g/600/240/shop/?random=40.433590504699815",
    introduction: "Rem eum quia qui.",
    role: "user",
    createdAt: "2022-02-24T08:19:30.000Z",
    updatedAt: "2022-02-24T08:19:30.000Z",
  },
  {
    id: 6,
    account: "suser5",
    email: "user5@example.com",
    password: "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
    name: "user5",
    avatar:
      "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
    cover: "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
    introduction: "Culpa minus ea ullam.",
    role: "user",
    createdAt: "2022-02-24T08:19:30.000Z",
    updatedAt: "2022-02-24T08:19:30.000Z",
    isFollow: false,
  },
  {
    id: 7,
    account: "suser7",
    email: "user7@example.com",
    password: "$2a$10$YJJ73FrX..vmv62zuQSKkOv7ab58cCsMn3.M//m96OcSEcnK8nKCW",
    name: "user7",
    avatar:
      "https://loremflickr.com/g/320/240/people/?random=25.554631896129855",
    cover:
      "https://loremflickr.com/g/600/240/shop/?random=40.433590504699815",
    introduction: "Rem eum quia qui.",
    role: "user",
    createdAt: "2022-02-24T08:19:30.000Z",
    updatedAt: "2022-02-24T08:19:30.000Z",
    isFollow: false,
  },
  {
    id: 8,
    account: "suser8",
    email: "user8@example.com",
    password: "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
    name: "user8",
    avatar:
      "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
    cover: "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
    introduction: "Culpa minus ea ullam.",
    role: "user",
    createdAt: "2022-02-24T08:19:30.000Z",
    updatedAt: "2022-02-24T08:19:30.000Z",
    isFollow: false,
  },
  {
    id: 9,
    account: "suser9",
    email: "user9@example.com",
    password: "$2a$10$YJJ73FrX..vmv62zuQSKkOv7ab58cCsMn3.M//m96OcSEcnK8nKCW",
    name: "user9",
    avatar:
      "https://loremflickr.com/g/320/240/people/?random=25.554631896129855",
    cover:
      "https://loremflickr.com/g/600/240/shop/?random=40.433590504699815",
    introduction: "Rem eum quia qui.",
    role: "user",
    createdAt: "2022-02-24T08:19:30.000Z",
    updatedAt: "2022-02-24T08:19:30.000Z",
    isFollow: false,
  },
  {
    id: 10,
    account: "suser10",
    email: "user10@example.com",
    password: "$2a$10$Is0KM9XOstEfEjeTqskiBeCCz1UURsKxNrPCCMCMb9G8eCqIB1Seu",
    name: "user10",
    avatar:
      "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
    cover: "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
    introduction: "Culpa minus ea ullam.",
    role: "user",
    createdAt: "2022-02-24T08:19:30.000Z",
    updatedAt: "2022-02-24T08:19:30.000Z",
    isFollow: false,
  },
  {
    id: 11,
    account: "suser11",
    email: "user11@example.com",
    password: "$2a$10$YJJ73FrX..vmv62zuQSKkOv7ab58cCsMn3.M//m96OcSEcnK8nKCW",
    name: "user11",
    avatar:
      "https://loremflickr.com/g/320/240/people/?random=25.554631896129855",
    cover:
      "https://loremflickr.com/g/600/240/shop/?random=40.433590504699815",
    introduction: "Rem eum quia qui.",
    role: "user",
    createdAt: "2022-02-24T08:19:30.000Z",
    updatedAt: "2022-02-24T08:19:30.000Z",
    isFollow: false,
  },
]

export default {
  mixins: [accountTagFilter],
  data() {
    return {
      followCards: []
    }
  },
  methods: {
    fetchFollowCards() {
      // todo:修改資料來源
      this.followCards = [ ...dummyData ]
    },
    addFollow(userId) {
      // todo: 串接 API
      this.followCards = this.followCards.map(card => {
        if (card.id !== userId) return card
        else return {
          ...card,
          isFollow: true
        }
      })
    },
    deleteFollow(userId) {
      // todo: 串接 API
      this.followCards = this.followCards.map(card => {
        if (card.id !== userId) return card
        else return {
          ...card,
          isFollow: false
        }
      })
    }
  },
  created() {
    this.fetchFollowCards()
  }
}
</script>