<template>
  <div class="tweetCard-wrapper">
    <div class="card-left avatar" @click="linkedUser(tweetUser.id)">
      <img class="avatar" :src="tweetUser.avatar" />
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
        <img class="reply" />
        <h6>{{ replysCount }}</h6>
        <img v-if="isLiked" @click="deleteLikes()" class="heart-active" />
        <img v-else @click="addLikes()" class="heart" />

        <h6>{{ likesCount }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, accountTagFilter } from "../utils/mixins";
import { mapState } from "vuex";
export default {
  mixins: [fromNowFilter, accountTagFilter],
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
      isLiked: false
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    fetchTweetCard() {
      const { User, description, id, createdAt, replyCount, likeCount, isLiked } = this.tweetCard
      this.id = id;
      this.tweetUser = User;
      this.description = description;
      this.createdAt = createdAt;
      this.replysCount = replyCount;
      this.likeCount = likeCount;
      this.isLiked = isLiked;
    },
    addLikes() {
      // todo: connect API
      this.isLiked = true;
      this.likesCount++;
    },
    deleteLikes() {
      // todo: connect API
      this.isLiked = false;
      this.likesCount--;
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
        $event.target.matches(".heart") ||
        $event.target.matches(".heart-active") ||
        $event.target.matches(".avatar") ||
        $event.target.matches(".card-name")
      )
        return;

      this.$router.push({ name: "tweet", params: { id: tweetId } });
    },
  },
  created() {
    this.fetchTweetCard();
  },
};
</script>