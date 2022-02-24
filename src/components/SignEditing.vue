<template>
  <div class="formContainer">
    <div class="form-wrapper">
      <form id="signInForm" @submit.prevent.stop="handleFormSubmit">
        <!-- 輸入框 -->
        <label for="" :class="['label', { isInvalid: account.isInvalid }]">
          帳號
          <input v-model.trim="account.text" name="account" type="text" />
        </label>
        <div class="wordLimit-wrapper">
          <h5>{{ worLimitMessage(account) }}</h5>
          <h5>{{ wordLimitCount(account) }}</h5>
        </div>
        <!-- 輸入框 -->
        <label for="" :class="['label', { isInvalid: name.isInvalid }]">
          名稱
          <input v-model.trim="name.text" name="name" type="text" />
        </label>
        <div class="wordLimit-wrapper">
          <h5>{{ worLimitMessage(name) }}</h5>
          <h5>{{ wordLimitCount(name) }}</h5>
        </div>
        <!-- 輸入框 -->
        <label for="" :class="['label', { isInvalid: email.isInvalid }]">
          email
          <input v-model.trim="email.text" name="email" type="text" />
        </label>
        <div class="wordLimit-wrapper">
          <h5>{{ worLimitMessage(email) }}</h5>
          <h5>{{ wordLimitCount(email) }}</h5>
        </div>
        <!-- 輸入框 -->
        <label for="" :class="['label', { isInvalid: password.isInvalid }]">
          密碼
          <input v-model.trim="password.text" name="password" type="text" />
        </label>
        <div class="wordLimit-wrapper">
          <h5>{{ worLimitMessage(password) }}</h5>
          <h5>{{ wordLimitCount(password) }}</h5>
        </div>
        <!-- 輸入框 -->
        <label
          for=""
          :class="['label', { isInvalid: passwordCheck.isInvalid }]"
        >
          密碼確認
          <input
            v-model.trim="passwordCheck.text"
            name="passwordCheck"
            type="text"
          />
        </label>
        <div class="wordLimit-wrapper">
          <h5>{{ worLimitMessage(passwordCheck) }}</h5>
          <h5>{{ wordLimitCount(passwordCheck) }}</h5>
        </div>
        <button type="submit" form="signInForm" class="btn active">儲存</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // input 一個輸入框為一組
      account: {
        text: "",
        isInvalid: false,
      },
      password: {
        text: "",
        isInvalid: false,
      },
      name: {
        text: "",
        isInvalid: false,
      },
      email: {
        text: "",
        isInvalid: false,
      },
      passwordCheck: {
        text: "",
        isInvalid: false,
      },
    };
  },
  computed: {
    worLimitMessage() {
      return (input) => {
        if (input.text.length > 50) {
          input.isInvalid = true;
          return "字數超過上限！";
        } else {
          input.isInvalid = false;
          return "";
        }
      };
    },
    wordLimitCount() {
      // 計算帶入input的字數
      return (input) => {
        if (input.text.length < 1) return "";
        else return input.text.length + "/50";
      };
    },
  },
  methods: {
    handleFormSubmit(e) {
      // todo: sweet alert 2
      if (!this.account.text) return console.log("帳號不可空白");
      else if (!this.password.text) return console.log("密碼不可空白");
      // todo: connect API - POST
      const form = e.target;
      const formData = new FormData(form);
      // for check
      console.log(formData);
      console.log(formData.get("account"));
      console.log(formData.get("password"));
    },
  },
};
</script>