<template>
  <div class="app-double-column">
    <div class="left-container">
      <AdminNavBar />
    </div>
    <div class="middle-container">
      <div class="main-wrapper">
        <h3 class="main-title">推文清單</h3>
      </div>
      <div
        class="main-tweets"
        v-for="tweetCard in tweetCards"
        :key="tweetCard.id"
      >
        <AdminFeedList :tweet-card="tweetCard" />
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavBar from '../components/AdminNavBar.vue';
import AdminFeedList from '../components/AdminFeedList.vue';
import { mapState } from "vuex";
import tweetsAPI from "../apis/tweets";
import { Toast } from '../utils/helpers';


export default {
  components: {
    AdminNavBar,
    AdminFeedList
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