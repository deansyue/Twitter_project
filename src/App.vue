<template>
  <div id="app">
    <router-view />
    <!-- Modal -->
    <TweetCreate />
    <!-- Modal -->
  </div>
</template>

<script>
import TweetCreate from "../src/components/TweetCreate.vue";

export default {
  components: {
    TweetCreate,
  },
  mounted() {
    window.addEventListener("unload", this.saveState);
  },
  created() {
    this.getState();
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