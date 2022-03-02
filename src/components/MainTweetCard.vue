<template>
  <div  class="main-wrapper">
    <div
      class="mainTweetCard-wrapper"
      v-for="tweetCard in tweetCards"
      :key="tweetCard.id">
        <div class="card-left avatar" @click="linkedUser(tweetCard.User.id)">
          <img class="avatar" :src="tweetCard.User.avatar | emptyImage" />
        </div>
        <div class="card-right" @click="linkedReply($event, tweetCard.id)">
          <div class="card-head">
            <h5 class="card-name" @click="linkedUser(tweetCard.User.id)">
              {{ tweetCard.User.name }}
            </h5>
            <h5 class="card-account">
              {{ tweetCard.User.account | accountTag }}
            </h5>
            <span>．</span>
            <h5 class="card-time">
              {{ tweetCard.createdAt | fromNow }}
            </h5>
          </div>
          <p>
            {{ tweetCard.description }}
          </p>

          <p></p>
          <div class="card-foot">
            <img class="reply" @click="showReplyModal(tweetCard)" />
            <h6>{{ tweetCard.replysCount }}</h6>
            <img
              v-if="tweetCard.isLiked"
              @click="deleteLikes(tweetCard.id)"
              class="heart-active"
            />
            <img
              v-else
              @click="addLikes(tweetCard.id)"
              class="heart"
            />
            <h6>{{ tweetCard.likeCount }}</h6>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import tweetsAPI from "../apis/tweets";
import { Toast } from "../utils/helpers";
import {
  fromNowFilter,
  accountTagFilter,
  emptyImageFilter,
} from "../utils/mixins";
import { mapState } from "vuex";

export default {
  mixins: [fromNowFilter, accountTagFilter, emptyImageFilter],
  data() {
    return {
      tweetCards: [],
      isProcessing: false,
      isLoading: false,
    };
  },
  computed: {
    ...mapState(["currentUser", "tweetCreate"]),
  },
  methods: {
    async fetchTweetCards() {
      try {
        this.isLoading = true;
        const { data, statusText } = await tweetsAPI.getAllTweets();
        // console.log(data)
        // console.log(statusText)
        if (statusText !== "OK") throw new Error(statusText);
        this.isLoading = false;
        this.tweetCards = [ ...data ];
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得主頁資料，請稍後再試",
        });
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
          avatar: this.currentUser.avatar,
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
        description: data.description,
      });
    },
    async addLikes(id) {
      try {
        this.isProcessing = true;
        const { statusText, data } = await tweetsAPI.addLike({
          tweetId: id,
        });
        if (statusText !== "OK" || data.status !== "success")
          throw new Error(statusText);
        this.isProcessing = false;
        this.tweetCard.isLiked = true;
        this.tweetCard.likeCount++;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法加入最愛，請稍後再試",
        });
      }
    },
    async deleteLikes(id) {
      try {
        this.isProcessing = true;
        const { statusText, data } = await tweetsAPI.deleteLike({
          tweetId: id,
        });
        if (statusText !== "OK" || data.status !== "success")
          throw new Error(statusText);
        this.isProcessing = false;
        this.tweetCard.isLiked = false;
        this.tweetCard.likeCount--;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法取消最愛，請稍後再試",
        });
      }
    },
    linkedUser(userId) {
      if (userId === this.currentUser.id) {
        this.$router.push({ name: "userSelf" });
      } else {
        this.$router.push({ name: "user", params: { id: userId }});
      }
    },
    linkedReply($event, id) {
      // 點擊卡片可進入瀏覽回覆頁面、若點擊到愛心則不跳轉畫面
      if (
        $event.target.matches(".reply") ||
        $event.target.matches(".heart") ||
        $event.target.matches(".heart-active") ||
        $event.target.matches(".avatar") ||
        $event.target.matches(".card-name")
      )
        return;

      this.$router.push({ name: "tweet", params: { id: id } });
    },
    showReplyModal(tweetCard) {
      this.$modal.show("replyCreate");
      const replyTargetData = {
        id: tweetCard.id,
        name: tweetCard.User.name,
        userId: tweetCard.User.id,
        account: tweetCard.User.account,
        avatar: tweetCard.User.avatar,
        description: tweetCard.description,
        createdAt:  tweetCard.createdAt,
      };
      this.$store.commit("setTweetReplyTarget", replyTargetData);
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