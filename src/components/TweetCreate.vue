<template>
  <modal name="tweetCreate"       
    classes="tweetCreat-modal"
    :width="600" :height="300">
    <div class="tweetCreate-wrapper">
      <div class="tweetCreate-head">
        <img class="cross-orange" @click="closeModal">
      </div>
      <div class="tweetCreate-body">
        <div class="tweetCreate-left">
          <img class="avatar" src="https://loremflickr.com/g/320/240/people/?random=91.66143782652539">
        </div>
        <div class="tweetCreate-right">
          <textarea 
            v-model="message"
            placeholder="有什麼新鮮事？"
            focus
          ></textarea>
          <button class="btn active" @click="submitTweet">
            推文
          </button>
        </div>
      </div>
    </div>
  </modal> 
</template>


<script>
// todo: 接收大頭照資料(顯示畫面)、使用者 id 等資料(API新增貼文時要用到的...)

export default {
  name: 'tweetCreate',
  data() {
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
    submitTweet() {
      // for check
      console.log({ formData: this.message })
      // todo: 串接 API
      // 更新主畫面: 應該要顯示在第一個...
      // this.closeModal()
    }
  }
}
</script>