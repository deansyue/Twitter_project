<template>
  <div class="app-tripple-column">
    <div class="left-container">
      <NavBar />
    </div>
    <div class="middle-container">
      <div class="main-wrapper">
        <h3 class="main-title">首頁</h3>
        <div class="main-create" @click.prevent.stop="showModal('tweetCreate')">
          <img class="avatar" :src="currentUser.avatar" />
          <p>有什麼新鮮事？</p>
          <!-- todo: modal -->
          <button class="btn active">推文</button>
        </div>
      </div>
      <div
        class="main-tweets"
        v-for="tweetCard in tweetCards"
        :key="tweetCard.id"
      >
        <TweetCard :tweet-card="tweetCard" />
      </div>
    </div>
    <div class="right-container">
      <Popular />
    </div>
    <!-- Modal -->
    <TweetCreate />
    <!-- Modal  -->
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import TweetCard from "../components/TweetCard.vue";
import Popular from "../components/Popular.vue";
import TweetCreate from "../components/TweetCreate.vue";
import { mapState } from "vuex";

// todo: 注意資料是否新增 likedCount、repliedCount、isLiked 屬性
const dummyData = [
  {
    id: 504,
    UserId: 14,
    description: "1111",
    createdAt: "2022-02-26T13:57:17.000Z",
    updatedAt: "2022-02-26T13:57:17.000Z",
    User: {
      id: 14,
      account: "user1",
      email: "user1@example.com",
      password: "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
      name: "user1",
      avatar:
        "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
      cover: "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
      introduction: "Nihil et error voluptatem incidunt.",
      role: "user",
      createdAt: "2022-02-26T13:31:32.000Z",
      updatedAt: "2022-02-26T13:31:32.000Z",
    },
  },
  {
    id: 14,
    UserId: 14,
    description:
      "Ad et rerum quis ea ea veniam. Inventore repellat et. Esse amet alias. Ullam excepturi quo voluptatem animi molestiae iure et possimus ut. Vitae autem ipsum accusantium sint voluptatem sed.",
    createdAt: "2022-02-26T13:31:32.000Z",
    updatedAt: "2022-02-26T13:31:32.000Z",
    User: {
      id: 14,
      account: "user1",
      email: "user1@example.com",
      password: "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
      name: "user1",
      avatar:
        "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
      cover: "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
      introduction: "Nihil et error voluptatem incidunt.",
      role: "user",
      createdAt: "2022-02-26T13:31:32.000Z",
      updatedAt: "2022-02-26T13:31:32.000Z",
    },
  },
  {
    id: 24,
    UserId: 14,
    description: "Ullam omnis occaecati repudiandae vero a.",
    createdAt: "2022-02-26T13:31:32.000Z",
    updatedAt: "2022-02-26T13:31:32.000Z",
    User: {
      id: 14,
      account: "user1",
      email: "user1@example.com",
      password: "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
      name: "user1",
      avatar:
        "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
      cover: "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
      introduction: "Nihil et error voluptatem incidunt.",
      role: "user",
      createdAt: "2022-02-26T13:31:32.000Z",
      updatedAt: "2022-02-26T13:31:32.000Z",
    },
  },
  {
    id: 34,
    UserId: 14,
    description:
      "Nobis repellendus saepe nobis quibusdam quia ipsa nostrum provident.\nNihil eos error aliquam assumenda qui minima.",
    createdAt: "2022-02-26T13:31:32.000Z",
    updatedAt: "2022-02-26T13:31:32.000Z",
    User: {
      id: 14,
      account: "user1",
      email: "user1@example.com",
      password: "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
      name: "user1",
      avatar:
        "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
      cover: "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
      introduction: "Nihil et error voluptatem incidunt.",
      role: "user",
      createdAt: "2022-02-26T13:31:32.000Z",
      updatedAt: "2022-02-26T13:31:32.000Z",
    },
  },
  {
    id: 44,
    UserId: 14,
    description: "Ducimus veritatis deleniti eligendi voluptatibus non labore.",
    createdAt: "2022-02-26T13:31:32.000Z",
    updatedAt: "2022-02-26T13:31:32.000Z",
    User: {
      id: 14,
      account: "user1",
      email: "user1@example.com",
      password: "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
      name: "user1",
      avatar:
        "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
      cover: "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
      introduction: "Nihil et error voluptatem incidunt.",
      role: "user",
      createdAt: "2022-02-26T13:31:32.000Z",
      updatedAt: "2022-02-26T13:31:32.000Z",
    },
  },
  {
    id: 54,
    UserId: 14,
    description: "Neque quam tempora ea minima nemo officiis dolor.",
    createdAt: "2022-02-26T13:31:32.000Z",
    updatedAt: "2022-02-26T13:31:32.000Z",
    User: {
      id: 14,
      account: "user1",
      email: "user1@example.com",
      password: "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
      name: "user1",
      avatar:
        "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
      cover: "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
      introduction: "Nihil et error voluptatem incidunt.",
      role: "user",
      createdAt: "2022-02-26T13:31:32.000Z",
      updatedAt: "2022-02-26T13:31:32.000Z",
    },
  },
  {
    id: 74,
    UserId: 14,
    description:
      "Nulla asperiores quibusdam iste quaerat explicabo id dignissimos nulla quo. Culpa aut ut aperiam in enim molestiae dolorem laborum. Quam ab soluta nostrum omnis qui ut consequatur.",
    createdAt: "2022-02-26T13:31:32.000Z",
    updatedAt: "2022-02-26T13:31:32.000Z",
    User: {
      id: 14,
      account: "user1",
      email: "user1@example.com",
      password: "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
      name: "user1",
      avatar:
        "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
      cover: "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
      introduction: "Nihil et error voluptatem incidunt.",
      role: "user",
      createdAt: "2022-02-26T13:31:32.000Z",
      updatedAt: "2022-02-26T13:31:32.000Z",
    },
  }
];

export default {
  components: {
    NavBar,
    TweetCard,
    Popular,
    TweetCreate,
  },
  data() {
    return {
      tweetCards: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    fetchTweetCards() {
      // todo: 串接 API
      this.tweetCards = [...dummyData];
    },
    showModal() {
      // 打開 modal
      this.$modal.show("tweetCreate");
    },
    hideModal() {
      // (預設)關閉 modal
      this.$modal.hide("tweetCreate");
    },
  },
  created() {
    this.fetchTweetCards();
  },
};
</script>