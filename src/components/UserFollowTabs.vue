<template>
  <div class="userFollowTabs-wrapper">
    <div class="userFollowTabs-title">
      <img @click="$router.back()" class="arrow" />
      <div>
        <h3>{{ "John Doe" }}</h3>
        <h6>{{ "25" }}推文</h6>
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
  watch: {
    isFollowerPage(newValue) {
      this.isFollowerPage = newValue
    },
    paramsId(newValue) {
      this.paramsId = newValue
    },
  }
}
</script>