<template>
  <modal
    name="userCardEdit"
    classes="userCardEdit-modal"
    :width="600" :height="657">
    <div class="userCardEdit-wrapper">
      <div class="userCardEdit-head">
        <img class="cross-orange" alt="">
        <h3>編輯個人資料</h3>
        <button class="btn active">儲存</button>
      </div>
      <div class="userCardEdit-body">
        <form action="" class="form-wrapper">
          <div class="form-image-wrapper">
            <div class="form-image-cover">
              <img class="cover" :src="currentUser.cover">
              <label for="cover" class="camera"></label>
              <input type="file" id="cover" name="cover" accept="image/png">
              <img class="cross-white cancel" />
            </div>
            <div class="form-image-avatar avatar">
              <label for="avatar" class="camera"></label>
              <input type="file" id="avatar">
            </div>
          </div>
          <div class="form-input-wrapper">
            <!-- 輸入框 -->
            <label for="name" :class="['label', { isInvalid: name.isInvalid }]">
            名稱
            <input v-model.trim="name.text" name="name" type="text" id="name">
            </label>
            <div class="wordLimit-wrapper">
              <h5>{{ worLimitMessage(name, 50) }}</h5>
              <h5>{{ wordLimitCount(name, 50) }}</h5>
            </div>
            <!-- 輸入框 -->
            <label for=""
              :class="['textarea', 'label', { isInvalid: introduction.isInvalid }]"
            >自我介紹
              <textarea v-model.trim="introduction.text" name="introduction">
              </textarea>
            </label>
            <div class="wordLimit-wrapper">
              <h5>{{ worLimitMessage(introduction, 160) }}</h5>
              <h5>{{ wordLimitCount(introduction, 160) }}</h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // input 一個輸入框為一組
      name: {
        text:  "哈哈",
        isInvalid: false,
      },
      introduction: {
        text: "",
        isInvalid: false,
      },
      isProcessing: false
    }
  },
  computed: {
    ...mapState(["currentUser"]),
    worLimitMessage() {
      return (input, number) => {
        if (input.text.length > number) {
          input.isInvalid = true
          return '字數超過上限！'
        } else {
          input.isInvalid = false
          return ""
        }
      }
    },
    wordLimitCount() {
      // 計算帶入input的字數
      return (input, number) => {
        if (input.text.length < 1) return ""
        else return input.text.length + "/" + number
      }
    },
  },
  created() {
    this.name.text = this.currentUser.name
  }
}
</script>