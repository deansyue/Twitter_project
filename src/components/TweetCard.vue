<template>
  <div class="tweetCard-wrapper">
    <div class="card-left avatar" @click="linkedUser(tweetUser.id)">
      <img class="avatar" :src="tweetUser.avatar | emptyImage" />
    </div>
    <div class="card-right" @click="linkedReply($event, id)">
      <div class="card-head">
        <h5 class="card-name" @click="linkedUser(tweetUser.id)">
          {{ tweetUser.name }}
        </h5>
        <h5 class="card-account">
          {{ tweetUser.account | accountTag }}
        </h5>
        <span>．</span>
        <h5 class="card-time">
          {{ createdAt | fromNow }}
        </h5>
      </div>
      <p>
        {{ description }}
      </p>

      <p></p>
      <div class="card-foot">
        <img class="reply" @click="showReplyModal()" />
        <h6>{{ replysCount }}</h6>
        <img
          v-if="isLiked"
          @click="deleteLikes()"
          class="heart-active"
        />
        <img
          v-else
          @click="addLikes()"
          class="heart"
        />
        <h6>{{ likeCount }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import tweetsAPI from "../apis/tweets";
import { Toast } from "../utils/helpers"
import { fromNowFilter, accountTagFilter, emptyImageFilter } from "../utils/mixins";
import { mapState } from "vuex";

export default {
  mixins: [fromNowFilter, accountTagFilter, emptyImageFilter],
  props: {
    tweetCard: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: 0,
      tweetUser: {},
      description: "",
      createdAt: "",
      replysCount: 0,
      likeCount: 0,
      isLiked: false,
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    fetchTweetCard() {
      const {
        User,
        description,
        id,
        createdAt,
        replyCount,
        likeCount,
        isLiked,
      } = this.tweetCard;
      this.id = id;
      this.tweetUser = User;
      this.description = description;
      this.createdAt = createdAt;
      this.replysCount = replyCount;
      this.likeCount = likeCount;
      this.isLiked = isLiked;
    },
    async addLikes() {
      try {
        this.isProcessing = true
        const { statusText, data } = await tweetsAPI.addLike({
          tweetId: this.id
        })
        if (statusText !== "OK" || data.status !== "success") throw new Error(statusText)
        this.isProcessing = false
        this.isLiked = true;
        this.likeCount++;
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法加入最愛，請稍後再試"
        })
      }
    },
    async deleteLikes() {
      try {
        this.isProcessing = true
        const { statusText, data } = await tweetsAPI.deleteLike({ 
          tweetId: this.id
        })
        if (statusText !== "OK" || data.status !== "success") throw new Error(statusText)
        this.isProcessing = false
        this.isLiked = false;
        this.likeCount--;
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法取消最愛，請稍後再試"
        })
      }
    },
    linkedUser(userId) {
      if (userId === this.currentUser.id) {
        this.$router.push({ name: "userSelf" });
      } else {
        this.$router.push({ name: "user", params: { id: userId } });
      }
    },
    linkedReply($event, tweetId) {
      // 點擊卡片可進入瀏覽回覆頁面、若點擊到愛心則不跳轉畫面
      if (
        $event.target.matches(".reply") ||
        $event.target.matches(".heart") ||
        $event.target.matches(".heart-active") ||
        $event.target.matches(".avatar") ||
        $event.target.matches(".card-name")
      )
        return;

      this.$router.push({ name: "tweet", params: { id: tweetId } });
    },
    showReplyModal() {
      this.$modal.show("replyCreate");
      const replyTargetData = {
        id: this.id,
        name: this.tweetUser.name,
        userId: this.tweetUser.id,
        account: this.tweetUser.account,
        avatar: this.tweetUser.avatar,
        description: this.description,
        createdAt: this.createdAt,
      }
      this.$store.commit("setTweetReplyTarget", replyTargetData)
    }
  },
  created() {
    this.fetchTweetCard();
  },
  watch: {
    tweetCard(newValue) {
      this.tweetCard = newValue;
      this.fetchTweetCard();
    },
  },
};
</script>