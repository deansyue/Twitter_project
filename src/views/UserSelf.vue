<template>
  <div class="app-tripple-column">
    <div class="left-container"><NavBar /></div>
    <div class="middle-container">
      <UserCard
        :tweets="tweets"
        :currentUserData="currentUserData"
        :whichPage="whichPage"
      />
      <div class="switchTabs">
        <div
          class="tweetTab"
          :class="[{ activeTabs: tabNow === 1 }]"
          @click="tabNow = 1"
        >
          推文
        </div>
        <div
          class="replyTab"
          :class="[{ activeTabs: tabNow === 2 }]"
          @click="tabNow = 2"
        >
          推文與回覆
        </div>
        <div
          class="likeTab"
          :class="[{ activeTabs: tabNow === 3 }]"
          @click="tabNow = 3"
        >
          喜歡的內容
        </div>
      </div>
      <div class="self-tweet-wrapper" v-if="tabNow === 1">
        <div class="self-tweet" v-for="tweet in tweets" :key="tweet.id">
          <TweetCard :tweet-card="tweet" />
        </div>
      </div>
      <div class="self-reply-wrapper" v-else-if="tabNow === 2">
        <div class="self-reply" v-for="reply in replys" :key="reply.id">
          <ReplyCard :replyCard="reply" />
        </div>
      </div>
      <div class="self-like-wrapper" v-else>
        <div
          class="self-like"
          v-for="likeTweet in likeTweets"
          :key="likeTweet.id"
        >
          <TweetCard :tweet-card="likeTweet" />
        </div>
      </div>
    </div>
    <div class="right-container"><Popular /></div>
  </div>
</template>
<script>
import NavBar from "./../components/NavBar";
import Popular from "./../components/Popular";
import UserCard from "./../components/UserCard";
import TweetCard from "../components/TweetCard.vue";
import ReplyCard from "../components/ReplyCard.vue";
import usersAPI from "./../apis/users";
import { Toast } from "../utils/helpers";

import { mapState } from "vuex";

export default {
  components: {
    NavBar,
    Popular,
    UserCard,
    TweetCard,
    ReplyCard,
  },
  data() {
    return {
      tweets: [],
      likeTweets: [],
      replys: [],
      currentUserData: {
        id: -1,
        account: "",
        name: "",
        email: "",
        avatar: "",
        cover: "",
        introduction: "",
        followingCount: -1,
        follwerCount: -1,
      },
      whichPage: true, //true代表個人false代表他人
      tabNow: 1, //1推文 2回復 3喜歡
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchUser() {
      try {
          const response = await usersAPI.getUser({
          userId: this.currentUser.id,
        });

        this.currentUserData = {
        id: response.data.id,
        account: response.data.account,
        name: response.data.name,
        email: response.data.email,
        avatar: response.data.avatar,
        cover: response.data.cover,
        introduction: response.data.introduction,
        followingCount: response.data.followingCount,
        follwerCount: response.data.follwerCount,
      };   
      } catch (error) {
          Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }    
     
    },
    async fetchLikeTweets() {
      try {
        const response = await usersAPI.getUserLikes({
          userId: this.currentUser.id,
        });
        this.likeTweets = response.data.map((like) => like.Tweet);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得最愛貼文資料，請稍後再試",
        });
      }
    },
    async fetchUserTweets() {
      try {
        const response = await usersAPI.getUserTweets({
          userId: this.currentUser.id,
        });
        this.tweets = response.data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得所有貼文資料，請稍後再試",
        });
      }
    },
    async fetchUserReplies() {
      try {
        const response = await usersAPI.getUserReplies({
          userId: this.currentUser.id,
        });
        this.replys = response.data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得所有回文資料，請稍後再試",
        });
      }
    },
  },
  created() {
    this.fetchUser();
    this.fetchLikeTweets();
    this.fetchUserTweets()
    this.fetchUserReplies()
  },
};
</script>
