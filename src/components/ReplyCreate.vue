<template>
  <modal name="replyCreate"
    classes="replyCreate-model"
    :width="600" :height="450"
    :clickToClose="false">
    <div class="replyCreate-wrapper">
      <div class="replyCreate-head">
        <img class="cross-orange" @click="closeModal()">
      </div>
      <div class="replyCreate-body">
        <div class="target-image">
          <img class="avatar"
            :src="replyTargetInfo.User.avatar">
          <span></span>
        </div>
        <div class="target-tweet">
          <div class="target-tweet-head">
            <h5 class="target-tweet-head-name">{{ replyTargetInfo.User.name }}</h5>
            <h5>{{ replyTargetInfo.User.account | accountTag }}</h5>
            <span>．</span>
            <h5>{{ replyTargetInfo.createdAt | fromNow }}</h5>
          </div>
          <p>{{ replyTargetInfo.description }}</p>
          <h5>回覆給 <strong>{{ replyTargetInfo.User.account | accountTag }}</strong></h5>
        </div>
        <div class="replyer-image">
          <img class="avatar" :src="currentUser.avatar">
        </div>
        <div class="replyer-tweet">
          <textarea 
            v-model="comment"
            placeholder="有什麼新鮮事？"
            focus
          ></textarea>
        </div>
      </div>
      <button
        class="btn active"
        @click="submitReply()"
        :disabled="isProcessing">回覆</button>
    </div>
  </modal>
</template>

<script>
import tweetsAPI from "../apis/tweets"
import { mapState } from "vuex";
import { fromNowFilter, accountTagFilter } from '../utils/mixins'
import { Toast } from "../utils/helpers"

export default {
  mixins: [fromNowFilter, accountTagFilter],
  props: {
    replyTargetInfo: {
      type: Object,
      default: () => ({
        User: {
          account: "",
          name: "",
          avatar: ""
        },
        createdAt: "",
        description: "",
        id: 0,
        isLiked: false,
        likeCount: 0
      })
    }
  },
  data () {
    return {
      replyTarget: {},
      paramsId: 0,
      comment: '',
      isProcessing: false
    }
  },
  methods: {
    async submitReply() {
      try {
        if (this.comment.length < 1) {
          return Toast.fire({
            icon: 'warning',
            title: '請輸入訊息'
          })
        }
        this.isProcessing = true
        const { statusText, data } = await tweetsAPI.addNewReply({
          tweetId: this.paramsId,
          comment: 
          this.comment
        })
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText)
        }
        this.isProcessing = false
        this.$emit('reply-comment', this.comment)
        this.closeModal()
        Toast.fire({
          icon: "success",
          title: data.message
        })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法新增回覆，請稍後再試"
        })
      }
    },
    closeModal() {
      // 關閉 modal、清空輸入框
      this.$modal.hide('replyCreate')
      this.comment = ''
    },
  },
  created() {
    const { id } = this.$route.params
    this.paramsId = Number(id)
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  watch: {
    replyTargetInfo(newValue) {
      this.replyTargetInfo = newValue
    }
  }
}
</script>