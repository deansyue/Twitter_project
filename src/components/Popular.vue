<template>
  <div class="popular-wrapper">
    <div class="title">Popular</div>
    <div class="popularCard" v-for="user in popularUser" :key="user.id">
      <div class="avatar-wrapper">
        <img :src="user.avatar" alt="" @click="linkedUser(user.id)" />
      </div>
      <div class="name-wrapper" @click="linkedUser(user.id)">
        {{ user.name }}
        <div class="account-wrapper">{{ user.account | accountTag }}</div>
      </div>
      <button
        class="addFollow btn"
        @click.stop.prevent="addFollow(user.id)"
        v-if="!user.isFollowed"
      >
        跟隨
      </button>
      <button
        class="deleteFollow btn"
        @click.stop.prevent="deleteFollow(user.id)"
        v-else
      >
        正在跟隨
      </button>
    </div>
  </div>
</template>
<script>
import { accountTagFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import usersAPI from "./../apis/users";
import { Toast } from "../utils/helpers";
export default {
  mixins: [accountTagFilter],
  data() {
    return {
      popularUser: [],
    };
  },
  created() {
    this.fetchPopular();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchPopular() {
      try {
        const response = await usersAPI.getTopUser();
        this.popularUser = response.data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得熱門使用者資料，請稍後再試",
        });
      }
    },
    linkedUser(userId) {
      if (userId === this.currentUser.id) {
        this.$router.push({ name: "userSelf" });
      } else {
        this.$router.push({ name: "user", params: { id: userId } });
      }
    },
    async addFollow(userId) {
      try {
        const { data } = await usersAPI.addFollow({ id: userId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.popularUser = this.popularUser.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: true,
            };
          }
          return user;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法追隨使用者，請稍後再試",
        });
        console.log("error", error);
      }
    },
    async deleteFollow(followingId) {
      try {
        const { data } = await usersAPI.deleteFollow({ followingId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.popularUser = this.popularUser.map((user) => {
          if (user.id === followingId) {
            return {
              ...user,
              isFollowed: false,
            };
          }
          return user;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追隨使用者，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
};
</script>