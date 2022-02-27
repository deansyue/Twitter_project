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
              <img class="camera" alt="">
              <img class="cross-white" alt="">
            </div>
            <div class="form-image-avatar avatar">
              <img class="camera" alt="">
            </div>
          </div>
          <div class="form-input-wrapper">
            <!-- 輸入框 -->
            <label for=""
              :class="['label', { isInvalid: name.isInvalid }]"
            >名稱
            <input v-model.trim="name.text" name="name" type="text">
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
export default {
  data() {
    return {
      // input 一個輸入框為一組
      name: {
        text: "",
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
}
</script>