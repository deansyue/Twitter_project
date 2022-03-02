<template>
  <div>
    <div class="followship-wrapper">
      <ul class="followship-tabs">
        <li class="followship-tab">
          <router-link :to="{ path: `/users/${paramsId}/followers` }">
            追隨者
          </router-link>
        </li>
        <li class="followship-tab">
          <router-link :to="{ path: `/users/${paramsId}/followings` }">
            正在追隨
          </router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      paramsId: 0
    }
  },
  created() {
    // this.fetchFollowCard()
    const { id } = this.$route.params
    this.paramsId = Number(id)
  },
  beforeRouteUpdate() {
    // this.fetchFollowCard()
    const { id } = this.$route.params
    this.paramsId = Number(id)
  }
};
</script>
