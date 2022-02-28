<template>
  <div class="app-tripple-column" v-if="!isLoading">
    <div class="left-container">
      <NavBar />
    </div>
    <div class="middle-container">
      <div class="main-wrapper">
        <h3 class="main-title">首頁</h3>
        <div class="main-create" @click.prevent.stop="showModal('tweetCreate')">
          <img class="avatar" :src="currentUser.avatar" />
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
    <!-- Modal -->
    <TweetCreate @after-tweet-create="afterTweetCreate"/>
    <!-- Modal -->
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import TweetCard from "../components/TweetCard.vue";
import Popular from "../components/Popular.vue";
import TweetCreate from "../components/TweetCreate.vue"
import { mapState } from "vuex";
import tweetsAPI from "../apis/tweets"
import { Toast } from '../utils/helpers';

export default {
  name: "Main",
  components: {
    NavBar,
    TweetCard,
    Popular,
    TweetCreate
  },
  data() {
    return {
      tweetCards: [],
      isLoading: false
    };
  },
  computed: {
    ...mapState(["currentUser"]),
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
    afterTweetCreate(comment) {
      this.tweetCards.unshift({
        createdAt: new Date().toISOString(),
        id: 0, // TODO:可以後端回傳嗎？
        isLiked: false,
        likeCount: 0,
        replyCount: 0,
        User: {
          account: this.currentUser.account,
          avatar:this.currentUser.avatar,
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
        description: comment,
      })
    },
    showModal() {
      // 打開 modal
      this.$modal.show("tweetCreate");
    },
  },
  created() {
    this.fetchTweetCards();
  },
};
</script>