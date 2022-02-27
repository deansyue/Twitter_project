<template>
  <div class="userFollowTabs-wrapper" v-if="!isLoading">
    <div class="userFollowTabs-title">
      <img @click="$router.back()" class="arrow" />
      <div>
        <h3>{{ name }}</h3>
        <h6>{{ tweetsCount }}推文</h6>
      </div>
    </div>
    <div class="userFollowTabs-body">
      <router-link 
        :class="['userFollows-tab', { 'userFollows-tab-active': isFollowerPage}]"
        :to="{ name: 'users-followers', params: { id: paramsId }}"
      >
        追隨者
      </router-link>
      <router-link
        :class="['userFollows-tab', { 'userFollows-tab-active': !isFollowerPage}]"
        :to="{ name: 'users-followings', params: { id: paramsId }}"
      >
        正在跟隨
      </router-link>
    </div>
    <div class="userFollows-body"></div>
  </div>
</template>

<script>
import usersAPI from "../apis/users"
import { Toast } from "../utils/helpers"
// todo: 接收使用者名稱、推文數(userFollowTabs-title )
// todo: 檢查 paramsId 後兩種 tab 轉換時 paramsId 仍要一致
export default {
  props: {
    isFollowerPage: {
      type: Boolean,
      required: true
    },
    paramsId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      name: '',
      tweetsCount: 0,
      isLoading: false,
    }
  },
  methods: {
    async fetchUserName(id) {
      try {
        this.isLoading = true
        const { data } = await usersAPI.getUserTweets({ userId: id })
        this.isLoading = false
        this.name = data[0].User.name
        this.tweetsCount = data.length
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者名稱，請稍後再試"
        })
      }
    }
  },
  watch: {
    isFollowerPage(newValue) {
      // 監測傳入的頁面狀態: 追隨/正在追隨，改變標籤樣式
      this.isFollowerPage = newValue
    },
    paramsId(newValue) {
      // 監測傳入的 params 有無改變，改變時呼叫後端資料
      this.paramsId = newValue
      this.fetchUserName(this.paramsId)
    },
  },
  created() {
    this.fetchUserName(this.paramsId)
  },
}
</script>