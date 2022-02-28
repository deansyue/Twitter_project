<template>
  <div class="popular-wrapper">
    <div class="title">Popular</div>
    <div class="popularCard" v-for="user in popularUser" :key="user.id">
      <div class="avatar-wrapper">
        <img :src="user.avatar" alt="" @click="linkedUser(user.id)" />
      </div>
      <div class="name-wrapper" @click="linkedUser(user.id)">
        {{ user.name }}
        <div class="account-wrapper">{{ user.account | accountTag }}</div>
      </div>
      <button
        class="addFollow btn"
        @click.stop.prevent="addFollow(user.id)"
        v-if="!user.isFollow"
      >
        跟隨
      </button>
      <button
        class="deleteFollow btn"
        @click.stop.prevent="deleteFollow(user.id)"
        v-else
      >
        正在跟隨
      </button>
    </div>
  </div>
</template>
<script>
import { accountTagFilter } from "./../utils/mixins";
import { mapState } from "vuex";
const dummyData = {
  popularUser: [
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
      id: 1,
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
  ],
};
export default {
  mixins: [accountTagFilter],
  data() {
    return {
      popularUser: [],
    };
  },
  created() {
    this.fetchPopular();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    fetchPopular() {
      this.popularUser = dummyData.popularUser;
    },
    linkedUser(userId) {
      if (userId === this.currentUser.id) {
        this.$router.push({ name: "userSelf" });
      } else {
        this.$router.push({ name: "user", params: { id: userId } });
      }
    },
    addFollow(userId) {
      this.popularUser = this.popularUser.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isFollow: true,
          };
        }
        return user;
      });
    },
    deleteFollow(userId) {
      this.popularUser = this.popularUser.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isFollow: false,
          };
        }
        return user;
      });
    },
  },
};
</script>