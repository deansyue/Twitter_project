<template>
  <div class="replyCard-wrapper">
    <div class="card-left avatar" @click="linkedUser(userId)">
      <img class="avatar" :src="avatar" />
    </div>
    <div class="card-right">
      <div class="card-head">
        <h5 class="card-name" @click="linkedUser(userId)">
          {{ userName }}
        </h5>
        <h5 class="card-account">
          {{ userAccount | accountTag }}
        </h5>
        <span>．</span>
        <h5 class="card-time">
          {{ createdAt | fromNow }}
        </h5>
      </div>
      <h5>
        <span>回覆</span>
        <span class="card-replyer" @click="linkedUser(targetUserId)">
          {{ targetAccount | accountTag }}
        </span>
      </h5>
      <p>{{ comment }}</p>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, accountTagFilter } from "../utils/mixins";
import { mapState } from "vuex";

// 假設：被回覆對象之資料
const dummyUser = {
  id: 25,
  account: "被回覆的對象",
  email: "user1@example.com",
  password: "$2a$10$b6erG8lmSU4h3.ZYJHuJrOqFg/YogeCVtr9/TAwUuPl9p60ycGCeG",
  name: "被回覆的對象",
  avatar: "https://loremflickr.com/g/320/240/people/?random=95.02090559814266",
  cover: "https://loremflickr.com/g/600/240/shop/?random=60.90347403010878",
  introduction: "Nihil et error voluptatem incidunt.",
  role: "user",
  createdAt: "2022-02-26T13:31:32.000Z",
  updatedAt: "2022-02-26T13:31:32.000Z",
};

export default {
  mixins: [fromNowFilter, accountTagFilter],
  props: {
    // 被回覆者的資料
    // replyTarget: {
    //   type: Object,
    //   required: true,
    // },
    // 每筆回覆貼文的資料
    replyCard: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 被回覆的對象
      targetAccount: "",
      targetUserId: 0,
      // 此卡片的其他資料
      tweetId: 0,
      userId: 0,
      comment: "",
      createdAt: "",
      userName: "",
      userAccount: "",
      avatar: "",
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    fetchReplyCard() {
      // 被回覆的對象 // todo: 待 API 加入此值
      this.targetAccount = dummyUser.account;
      this.targetUserId = dummyUser.id;
      // 此卡片的其他資料
      const { id, comment, createdAt, User } = this.replyCard;
      this.tweetId = id;
      this.userId = dummyUser.id;
      this.comment = comment;
      this.createdAt = createdAt;
      this.userName = User.name;
      this.userAccount = User.account;
      this.avatar = User.avatar;
    },
    linkedUser(userId) {
      if (userId === this.currentUser.id) {
        this.$router.push({ name: "userSelf" });
      } else {
        this.$router.push({ name: "user", params: { id: userId } });
      }
    },
  },
  created() {
    this.fetchReplyCard();
  },
  watch: {
    replyCard(newValue) {
      this.replyCard = newValue;
    },
  },
};
</script>