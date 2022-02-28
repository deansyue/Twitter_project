<template>
  <modal name="tweetCreate"       
    classes="tweetCreat-modal"
    :width="600" :height="300"
  >
    <div class="tweetCreate-wrapper">
      <div class="tweetCreate-head">
        <img class="cross-orange" @click="closeModal">
      </div>
      <div class="tweetCreate-body">
        <div class="tweetCreate-left">
          <img class="avatar" :src="currentUser.avatar">
        </div>
        <div class="tweetCreate-right">
          <textarea 
            v-model="comment"
            placeholder="有什麼新鮮事？"
            focus
          ></textarea>
          <button class="btn active" @click="submitTweet()">
            推文
          </button>
        </div>
      </div>
    </div>
  </modal> 
</template>


<script>
import tweetsAPI from "../apis/tweets"
import { mapState } from "vuex"
import { Toast } from "../utils/helpers"

export default {
  name: 'tweetCreate',
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    closeModal() {
      // 關閉 modal、清空輸入框
      this.$modal.hide('tweetCreate')
      this.comment = ''
    },
    async submitTweet() {
      try {
        console.log(this.comment)
        const response = await tweetsAPI.addNewTweet({ comment: this.comment })
        console.log(response)
        // 更新主畫面: 應該要顯示在第一個...
        // this.closeModal()
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增推文，請稍後再試"
        })
      }
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
}
</script>