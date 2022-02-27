<template>
  <div class="app-tripple-column">
    <div class="left-container">
      <NavBar />
    </div>
    <div class="middle-container">
      <div class="tweet-wrapper">
        <div class="tweet-title">
          <img @click="$router.back()" class="arrow" />
          <h3>推文</h3>
        </div>
        <div class="tweet-main">
          <div class="card-head">
            <div class="card-head-left avatar" @click="linkedUser(userId)">
              <img
                class="avatar"
                src="https://loremflickr.com/g/320/240/people/?random=91.66143782652539"
              />
            </div>
            <div class="card-head-right">
              <h5 @click="linkedUser(userId)">{{ "名稱" }}</h5>
              <h5>{{ "帳號" | accountTag }}</h5>
            </div>
          </div>
          <div class="tweet-body">
            <p>{{ description }}</p>
            <h5>{{ createdAt | timeFormat }}</h5>
          </div>
          <div class="tweet-footer">
            <div class="tweet-footer-info">
              <h4><strong>{{ replyCards.length }}</strong> 回覆</h4>
              <h4><strong>{{ "808" }}</strong> 喜歡次數</h4>
            </div>
            <div class="tweet-footer-buttons">
              <img class="reply-big" @click="showModal()" />
              <img
                v-if="isLiked"
                @click="deleteLike()"
                class="heart-big-active"
              />
              <img v-else @click="addLike()" class="heart-big" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="tweet-replies"
        v-for="replyCard in replyCards"
        :key="replyCard.id"
      >
        <ReplyCard :reply-target="user" :reply-card="replyCard" />
      </div>
    </div>
    <div class="right-container">
      <Popular />
    </div>
    <!-- Modal -->
    <ReplyCreate />
    <!-- Modal -->
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import ReplyCard from "../components/ReplyCard.vue";
import Popular from "../components/Popular.vue";
import ReplyCreate from "../components/ReplyCreate.vue";
import { accountTagFilter, timeFormatFilter } from "../utils/mixins";

// GET api/tweets/14 一筆推文及回覆：
const dummyData = {
  id: 14,
  UserId: 14,
  description:
    "Ad et rerum quis ea ea veniam. Inventore repellat et. Esse amet alias. Ullam excepturi quo voluptatem animi molestiae iure et possimus ut. Vitae autem ipsum accusantium sint voluptatem sed.",
  createdAt: "2022-02-26T13:31:32.000Z",
  updatedAt: "2022-02-26T13:31:32.000Z",
  Replies: [
    {
      id: 34,
      UserId: 14,
      TweetId: 14,
      comment:
        "Itaque soluta omnis sit. Impedit voluptatum ea vel autem est corrupti voluptatem mollitia dolor. Sit qui voluptatum. Et tenetur a qui est pe",
      createdAt: "2022-02-26T13:31:32.000Z",
      updatedAt: "2022-02-26T13:31:32.000Z",
      User: {
        id: 14,
        account: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
        name: "user1",
        avatar:
          "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
        cover:
          "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
        introduction: "Nihil et error voluptatem incidunt.",
        role: "user",
        createdAt: "2022-02-26T13:31:32.000Z",
        updatedAt: "2022-02-26T13:31:32.000Z",
      },
    },
    {
      id: 44,
      UserId: 24,
      TweetId: 14,
      comment: "Maiores voluptas id.",
      createdAt: "2022-02-26T13:31:32.000Z",
      updatedAt: "2022-02-26T13:31:32.000Z",
      User: {
        id: 24,
        account: "user2",
        email: "user2@example.com",
        password:
          "$2a$10$Il1etWmTyHTaQthyJ8CCaO0j7aUI1sUa2hF6l70AtY4r1ZULjjSt6",
        name: "user2",
        avatar:
          "https://loremflickr.com/g/320/240/people/?random=19.688300546759187",
        cover:
          "https://loremflickr.com/g/600/240/shop/?random=59.69861975665756",
        introduction: "Aliquam sit cupiditate recusandae error iusto.",
        role: "user",
        createdAt: "2022-02-26T13:31:32.000Z",
        updatedAt: "2022-02-26T13:31:32.000Z",
      },
    },
    {
      id: 54,
      UserId: 44,
      TweetId: 14,
      comment:
        "Illum quia illo porro accusantium fuga dolore culpa voluptatum rerum. Ab facilis repudiandae vitae ut recusandae nobis ut similique qui. Sun",
      createdAt: "2022-02-26T13:31:32.000Z",
      updatedAt: "2022-02-26T13:31:32.000Z",
      User: {
        id: 44,
        account: "user4",
        email: "user4@example.com",
        password:
          "$2a$10$pT/Fa9VgpEX5Pv8Zbflnn.Ky59RHIfyhdufbfb8bhLHgMnf5I8X7y",
        name: "user4",
        avatar:
          "https://loremflickr.com/g/320/240/people/?random=85.38506035885851",
        cover:
          "https://loremflickr.com/g/600/240/shop/?random=21.01274733805727",
        introduction: "Debitis veniam ad eos eum voluptas sit.",
        role: "user",
        createdAt: "2022-02-26T13:31:32.000Z",
        updatedAt: "2022-02-26T13:31:32.000Z",
      },
    },
  ],
};

export default {
  components: {
    NavBar,
    ReplyCard,
    Popular,
    ReplyCreate,
  },
  mixins: [accountTagFilter, timeFormatFilter],
  data() {
    return {
      tweetId: 0,
      userId: 0,
      user: {}, // todo: API 待補
      description: '',
      createdAt: '',
      replyCards: [],
      isLiked: false, // todo: API 待補 ... ?
    };
  },
  methods: {
    // 個人主頁：
    fetchTweetReplyCards() {
      // todo: 串接 API
      const { id, UserId, description, createdAt, Replies } = dummyData
      this.tweetId = id
      this.userId = UserId,
      this.description = description,
      this.createdAt = createdAt,
      this.replyCards = Replies
    },
    addLike() {
      // to: connect API
      this.isLiked = true;
    },
    deleteLike() {
      // to: connect API
      this.isLiked = false;
    },
    linkedUser(userId) {
      // todo: check id after connect API
      this.$router.push({ name: "user", params: { id: userId } });
    },
    showModal() {
      // 打開 modal
      this.$modal.show("replyCreate");
    },
    hideModal() {
      // (預設)關閉 modal
      this.$modal.hide("replyCreate");
    },
  },
  created() {
    this.fetchTweetReplyCards();
  },
};
</script>