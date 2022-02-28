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

export default {
  name: "Main",
  components: {
    NavBar,
    TweetCard,
    Popular,
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
    async fetchTweetCards() {
      try {
        const { data, statusText } = await tweetsAPI.getAllTweets()
        // console.log(statusText)
        // console.log(data)
        // todo: 注意資料是否新增 likedCount、repliedCount、isLiked 屬性
        if (statusText !== "OK") throw new Error(statusText)
        this.tweetCards = [ ...data ]

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得主頁資料，請稍後再試'
        })
      }
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