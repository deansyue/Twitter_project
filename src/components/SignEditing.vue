<template>
  <div class="signEditing-wrapper">
    <div class="form-wrapper">
      <form id="signEditingForm">
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
          <input
            v-model.trim="password.text"
            name="password"
            type="password" autocomplete="off"
          />
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
            type="password" autocomplete="off"
          />
        </label>
        <div class="wordLimit-wrapper">
          <h5>{{ worLimitMessage(passwordCheck) }}</h5>
          <h5>{{ wordLimitCount(passwordCheck) }}</h5>
        </div>
        <button
          type="submit"
          form="signEditingForm"
          v-if="pageNow"
          class="btn active"
        >
          儲存
        </button>
        <button
          type="submit"
          form="signEditingForm"
          v-else
          class="btn active"
          @click.prevent.stop="handleSignUpSubmit"
          :disabled="isProcessing"
        >
          註冊
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import authorizationAPI from "../apis/authorization";
export default {
  props: {
    currentUser: {
      type: Object,
      default: () => ({
        id: "",
        account: "",
        name: "",
        email: "",
        password: "",
      }),
    },
    pageNow: {
      type: Boolean,
      require: true,
    },
  },
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
      isProcessing: false,
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
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.account.text = this.currentUser.account;
      this.name.text = this.currentUser.name;
      this.email.text = this.currentUser.email;
    },
    async handleSignUpSubmit() {
      try {
        const account = this.account.text;
        const name = this.name.text;
        const email = this.email.text;
        const password = this.password.text;
        const passwordCheck = this.passwordCheck.text;
        if (!account || !name || !email || !password || !passwordCheck)
          return Toast.fire({
            icon: "error",
            title: "尚有未填寫欄位",
          });
        else if (password !== passwordCheck)
          return Toast.fire({
            icon: "error",
            title: "密碼確認與密碼不同",
          });
        else if (
          account.length > 50 ||
          name.length > 50 ||
          email.length > 50 ||
          password.length > 50 ||
          passwordCheck.length > 50
        )
          return Toast.fire({
            icon: "error",
            title: "字數超過上限",
          });
        this.isProcessing = true;
        const response = await authorizationAPI.signUp({
          account,
          name,
          email,
          password,
          passwordCheck,
        });
        if (response.status === "error") throw new Error(response.message);
        this.$router.push("/signin");
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: error,
        });
      }

      // todo: connect API - POST
    },
  },
};
</script>