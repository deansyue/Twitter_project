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
    <div class="user-wrapper"></div>
  </div>
</template>
<script>
export default {
  props: {
    currentUser: {
      type: Object,
      default: () => ({
        id: "",
        account: "",
        name: "",
        email: "",
        password: "",
      }),
    },
    tweets: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      userData: {
        id: "",
        account: "",
        name: "",
        email: "",
      },
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.userData.id = this.currentUser.id;
      this.userData.account = this.currentUser.account;
      this.userData.name = this.currentUser.name;
      this.userData.email = this.currentUser.email;
    },
  },
};
</script>