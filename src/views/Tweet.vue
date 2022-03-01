<template>
  <div class="app-tripple-column" v-if="!isLoading">
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
                :src="user.avatar"
              />
            </div>
            <div class="card-head-right">
              <h5 @click="linkedUser(userId)">{{ user.name }}</h5>
              <h5>{{ user.account | accountTag }}</h5>
            </div>
          </div>
          <div class="tweet-body">
            <p>{{ description }}</p>
            <h5>{{ createdAt | timeFormat }}</h5>
          </div>
          <div class="tweet-footer">
            <div class="tweet-footer-info">
              <h4><strong>{{ replyCards.length }}</strong> 回覆</h4>
              <h4><strong>{{ likeCount }}</strong> 喜歡次數</h4>
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
import tweetsAPI from "../apis/tweets"
import { accountTagFilter, timeFormatFilter } from "../utils/mixins";
import { Toast } from "../utils/helpers"

export default {
  name: "Tweet",
  components: {
    NavBar,
    ReplyCard,
    Popular,
    ReplyCreate,
  },
  mixins: [accountTagFilter, timeFormatFilter],
  data() {
    return {
      paramsId: 0,
      tweetId: 0,
      user: {},
      description: '',
      createdAt: '',
      isLiked: false,
      likeCount: 0,
      replyCards: [],
      isLoading: false
    };
  },
  methods: {
    async fetchRepliedTweet(paramsId) {
      // 主貼文資料：
      try {
        this.isLoading = true
        const { data, statusText } = await tweetsAPI.getRepliedTweet({ tweetId: paramsId })
        if (statusText !== "OK") throw new Error(statusText)
        this.isLoading = false
        const { id, User, description, createdAt, isLiked, likeCount } = data
        console.log(data)
        this.tweetId = id
        this.user = User
        this.description = description
        this.createdAt = createdAt
        this.isLiked = isLiked
        this.likeCount = likeCount
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: "error",
          title: "無法取得推文內容，請稍後再試"
        })
      }
    },
    async fetchTweetReplyCards(paramsId) {
      // 所有回覆卡片的陣列
      try {
        this.isLoading = true
        const { data, statusText } = await tweetsAPI.getAllReplies({ tweetId: paramsId })
        if (statusText !== "OK") throw new Error(statusText)
        this.isLoading = false
        this.replyCards = [ ...data ]
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: "error",
          title: "無法取得回覆推文，請稍後再試"
        })
      }
    },
    addLike() {
      // to: connect API
      this.isLiked = true;
      this.likeCount ++
    },
    deleteLike() {
      // to: connect API
      this.isLiked = false;
      this.likeCount --
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
    const { id } = this.$route.params
    this.paramsId = Number(id)
    this.fetchRepliedTweet(this.paramsId)
    this.fetchTweetReplyCards(this.paramsId);
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.paramsId = Number(id)
    this.fetchRepliedTweet(this.paramsId)
    this.fetchTweetReplyCards(this.paramsId)
    next()
  }
};
</script>