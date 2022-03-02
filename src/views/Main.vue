<template>
  <div class="app-tripple-column">
    <div class="left-container">
      <NavBar />
    </div>
    <div class="middle-container">
      <div class="main-wrapper">
        <h3 class="main-title">首頁</h3>
        <div class="main-create" @click="showNewCreateModal()">
          <img class="avatar" :src="currentUser.avatar | emptyImage" />
          <p>有什麼新鮮事？</p>
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
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import TweetCard from "../components/TweetCard.vue";
import Popular from "../components/Popular.vue";
import { mapState } from "vuex";
import tweetsAPI from "../apis/tweets"
import { Toast } from '../utils/helpers';
import { emptyImageFilter } from "../utils/mixins";

export default {
  name: "Main",
  mixins: [emptyImageFilter],
  components: {
    NavBar,
    TweetCard,
    Popular,
  },
  data() {
    return {
      tweetCards: [],
      isLoading: false
    };
  },
  computed: {
    ...mapState(["currentUser", "tweetCreate"]),
  },
  methods: {
    async fetchTweetCards() {
      try {
        this.isLoading = true
        const { data, statusText } = await tweetsAPI.getAllTweets()
        if (statusText !== "OK") throw new Error(statusText)
        this.isLoading = false
        this.tweetCards = [ ...data ]

      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得主頁資料，請稍後再試'
        })
      }
    },
    afterSubmitTweetCreate(data) {
      // 從 vuex 中取出 tweetCreate 資料並塞入 tweetCards
      this.tweetCards.unshift({
        createdAt: data.createdAt,
        id: data.id,
        isLiked: false,
        likeCount: 0,
        replyCount: 0,
        User: {
          account: this.currentUser.account,
          avatar:this.currentUser.avatar,
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
        description: data.description,
      })
    },
    showNewCreateModal() {
      this.$modal.show("tweetCreate");
    },
  },
  created() {
    this.fetchTweetCards();
  },
  watch: {
    tweetCreate (newValue) {
      this.afterSubmitTweetCreate(newValue)
    }
  }
};
</script>