<template>
  <div class="app-double-column">
    <div class="left-container">
      <AdminNavBar />
    </div>
    <div class="middle-container">
      <div class="main-wrapper">
        <h3 class="main-title">使用者清單</h3>
      </div>
      <div class="adminusers__container">
      <div class="adminuser__tweets"
        v-for="tweetCard in tweetCards" :key="tweetCard.id"
      >
        <AdminUserList :tweet-card="tweetCard"/>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavBar from '../components/AdminNavBar.vue';
import AdminUserList from '../components/AdminUserList.vue';
import { mapState } from "vuex";
import tweetsAPI from "../apis/tweets";
import { Toast } from '../utils/helpers';


export default {
  components: {
    AdminNavBar,
    AdminUserList,
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
  },
  created() {
    this.fetchTweetCards();
  },
};
</script>