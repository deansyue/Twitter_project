<template>
  <modal name="replyCreate"
    classes="replyCreate-model"
    :width="600" :height="450">
    <div class="replyCreate-wrapper">
      <div class="replyCreate-head">
        <img class="cross-orange" @click="closeModal()">
      </div>
      <div class="replyCreate-body">
        <div class="target-image">
          <img class="avatar" src="https://loremflickr.com/g/320/240/people/?random=91.66143782652539">
          <span></span>
        </div>
        <div class="target-tweet">
          <div class="target-tweet-head">
            <h5 class="target-tweet-head-name">回覆對象name</h5>
            <h5>回覆對象account</h5>
            <span>．</span>
            <h5>3小時</h5>
          </div>
          <p>回覆對象：內容</p>
          <h5>回覆給 <strong>@回覆對象account</strong></h5>
        </div>
        <div class="replyer-image">
          <img class="avatar" src="https://loremflickr.com/g/320/240/people/?random=91.66143782652539">
        </div>
        <div class="replyer-tweet">
          <textarea 
            v-model="message"
            placeholder="有什麼新鮮事？"
            focus
          ></textarea>
        </div>
      </div>
      <button class="btn active">回覆</button>
    </div>
  </modal>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    closeModal() {
      // 關閉 modal、清空輸入框
      this.$modal.hide('tweetCreate')
      this.message = ''
    },
  }
}
</script>