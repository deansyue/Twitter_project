<template>
  <div class="userCard-wrapper">
    <div class="title-wrapper">
      <button @click="$router.back()">
        <img alt="" class="arrow" />
      </button>
      <div class="name-wrapper">
        {{ userData.name }}
        <div class="tweetCount">{{ tweets.length }}推文</div>
      </div>
    </div>
    <div class="user-wrapper">
      <img :src="userData.cover" alt="" class="cover" />
      <img :src="userData.avatar" alt="" class="avatar-big" />
      <button class="btn btn-edit" v-if="whichPage">編輯個人資料</button>
      <div class="otherButton" v-else>
        <img src="" alt="" class="message" />
        <img
          src=""
          alt=""
          class="notice"
          v-if="isNotice"
          @click="isNotice = false"
        />
        <img
          src=""
          alt=""
          class="notice-active"
          v-else
          @click="isNotice = true"
        />
        <button
          class="btn btnDeleteFollow"
          v-if="userData.isFollowed"
          @click="userData.isFollowed = false"
        >
          正在追隨
        </button>
        <button class="btn btnAddFollow" v-else @click="userData.isFollowed = true">
          追隨
        </button>
      </div>
      <div class="information-wrapper">
        <div class="name">{{ userData.name }}</div>
        <div class="account">{{ userData.account | accountTag }}</div>
        <div class="introduce">{{ userData.introduction }}</div>
        <div class="follow">
          <router-link
            :to="{ name: 'users-followings', params: { id: userData.id } }"
            class="strong"
          >
            {{ userData.followingCount | numberFormatTC}}個
          </router-link>
          追隨中<router-link
            :to="{ name: 'users-followers', params: { id: userData.id } }"
            class="strong2"
            >{{ userData.follwerCount | numberFormatTC}}位</router-link
          >追隨者
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { accountTagFilter } from "./../utils/mixins";
import { numberFormatTCFilter } from "./../utils/mixins";
export default {
  mixins: [accountTagFilter,numberFormatTCFilter],
  props: {
    currentUserData: {
      type: Object,
      default: () => ({
        id: -1,
        account: "",
        name: "",
        email: "",
        avatar: "",
        cover: "",
        introduction: "",
        followingCount: -1,
        follwerCount: -1,
        isFollowed: ""
      }),
    },
    tweets: {
      type: Array,
      require: true,
    },
    whichPage: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      userData: {
        id: -1,
        account: "",
        name: "",
        email: "",
        avatar: "",
        cover: "",
        introduction: "",
        followingCount: -1,
        follwerCount: -1,
        isFollowed:""
      },
      isNotice: true,
    };
  },
  watch:{
    currentUserData(newValue){
      this.userData={
        ...this.userData,
        ...newValue
      }
    }
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.userData.id = this.currentUserData.id;
      this.userData.account = this.currentUserData.account;
      this.userData.name = this.currentUserData.name;
      this.userData.email = this.currentUserData.email;
      this.userData.avatar = this.currentUserData.avatar;
      this.userData.cover = this.currentUserData.cover;
      this.userData.introduction = this.currentUserData.introduction;
      this.userData.followingCount = this.currentUserData.followingCount;
      this.userData.follwerCount = this.currentUserData.follwerCount;
      this.userData.isFollowed = this.currentUserData.isFollowed;
    },
  },
};
</script>