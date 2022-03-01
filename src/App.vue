<template>
  <div id="app">
    <router-view />
    <!-- Modal -->
    <TweetCreate />
    <ReplyCreate />
    <!-- Modal -->
  </div>
</template>

<script>
import TweetCreate from "../src/components/TweetCreate.vue";
import ReplyCreate from "../src/components/ReplyCreate.vue";

export default {
  components: {
    TweetCreate,
    ReplyCreate
  },
  mounted() {
    window.addEventListener("unload", this.saveState);
  },
  created() {
    this.getState();
  },
  methods: {
    // 新增推文 modal
    showNewCreateModal() {
      this.$modal.show("tweetCreate");
    },
    hideNewCreateModal() {
      this.$modal.hide("tweetCreate");
    },
    // 新增回覆 modal
    showReplyModal() {
      this.$modal.show("replyCreate");
    },
    hideReplyModal() {
      this.$modal.hide("replyCreate");
    },
    saveState() {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    },
    getState() {
      if (sessionStorage.getItem("state")) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(sessionStorage.getItem("state"))
          )
        );
        sessionStorage.clear();
      }
    },
  },
};
</script>

<style lang="scss">
@import "/src/scss/App.scss";
</style>