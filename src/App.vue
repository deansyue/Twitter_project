<template>
  <div id="app">
    <router-view/>
    <!-- Modal -->
    <TweetCreate />
    <!-- Modal -->
  </div>
</template>

<script>
import TweetCreate from "../src/components/TweetCreate.vue";

export default {
  components: {
    TweetCreate
  },
  methods: {
    showModal() {
      // 打開 modal
      this.$modal.show("tweetCreate");
    },
    hideModal() {
      // 關閉 modal
      this.$modal.hide("tweetCreate");
    },
  }
}
</script>

<style lang="scss">
@import "/src/scss/App.scss";
</style>