<template>
  <div>
    <!-- 1組輸入框 -->
    <div class="input-group">
      <label for="" :class="['label', { isInvalid: inputOne.isLabelInvalid }]">
        帳號
        <input v-model.trim="inputOne.text" type="text">
      </label>
      <h5 class="wordLimit">{{ wordLimit(inputOne) }}/50</h5>
    </div>
    <!-- 按鈕 -->
    <div>
      <button :class="['btn', { active: isBtnActive }]">
        跟隨
      </button>
    </div>
  </div>
</template>

<script>
// 表單驗證參考: https://homura0731.github.io/post/2017/09/vue-form-check/
export default {
  data() {
    return {
      // input 一個輸入框為一組，todo: 控制 isLabelInvalid
      inputOne: {
        text: "",
        isLabelInvalid: false, // 待驗證輸入字數來控制
      },
      // todo: 控制按鈕樣式
      isBtnActive: false
    }
  },
  computed: {
    wordLimit() {
      // 計算帶入input的字數
      return (input) => { return input.text.length }
    }
  },
}
</script>