<template>
  <modal
    name="userCardEdit"
    classes="userCardEdit-modal"
    :width="600" :height="657"
    :clickToClose="false">
    <div class="userCardEdit-wrapper">
      <div class="userCardEdit-head">
        <img class="cross-orange" alt="" @click="hideEditModal()">
        <h3>編輯個人資料</h3>
        <button
          class="btn active"
          type="submit"
          form="userCardForm"
          :disabled="isProcessing">儲存</button>
      </div>
      <div class="userCardEdit-body">
        <form action="" class="form-wrapper"
          id="userCardForm" 
          @submit.prevent.stop="handleSubmit($event)">
          <div class="form-image-wrapper">
            <div class="form-image-cover">
              <img class="cover" :src="cover" v-show="cover">
              <label for="cover" class="camera"></label>
              <input 
                type="file"
                id="cover"
                name="cover"
                accept="image/*"
                @change="handleFileChange($event, 'cover')">
              <img class="cross-white cancel" @click="clearCover()"/>
            </div>
            <div class="form-image-avatar">
              <img class="avatar" :src="avatar" v-show="avatar">
              <label for="avatar" class="camera"></label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                @change="handleFileChange($event, 'avatar')">
            </div>
          </div>
          <div class="form-input-wrapper">
            <!-- 輸入框 -->
            <label for="name" :class="['label', { isInvalid: name.isInvalid }]">
            名稱
            <input 
              v-model.trim="name.text"
              name="name"
              type="text"
              id="name">
            </label>
            <div class="wordLimit-wrapper">
              <h5>{{ worLimitMessage(name, 50) }}</h5>
              <h5>{{ wordLimitCount(name, 50) }}</h5>
            </div>
            <!-- 輸入框 -->
            <label for="introduction"
              :class="['textarea', 'label', { isInvalid: introduction.isInvalid }]"
            >自我介紹
              <textarea
                v-model.trim="introduction.text"
                name="introduction"
                id="introduction">
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
import usersAPI from "../apis/users"
import { Toast } from "../utils/helpers"

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
      cover: "",
      avatar: "",
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
  methods: {
    handleFileChange($event, input) {
      const { files } = $event.target
      // 上傳視窗點擊「取消」 清空圖片連結
      if (files.length === 0) {
        if (input === 'cover') return this.cover = ''
        else if (input === 'avatar') return this.avatar = ''
      }
      // 上傳視窗點擊「開啟」 將圖片連結放入 data 並讓使用者預覽
      const imageURL = window.URL.createObjectURL(files[0])
      if (input === 'cover') this.cover = imageURL
      else if (input === 'avatar') this.avatar = imageURL
    },
    clearCover() {
      this.cover = ""
    },
    async handleSubmit($event) {
      try {
        const id = this.currentUser.id
        if (this.name.isInvalid || this.introduction.isInvalid) {
          return Toast.fire({
            icon: "warning",
            title: "字數超出上限！"
          })
        }
        if (this.name.text.length < 1) {
          return Toast.fire({
            icon: "warning",
            title: "請輸入使用名稱"
          })
        }
        const form = $event.target
        const formData = new FormData(form)

        this.isProcessing = true
        // TODO: 處理圖片上傳資料
        const { statusText , data } = await usersAPI.editInformation({
          id,
          formData,
        })
        if(statusText !== "OK" || data.status !== "success") throw new Error()
        this.isProcessing = false
        this.$store.commit('setCurrentUser', data.user)
        this.$modal.hide("userCardEdit");

      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法編輯資料，請稍後再試'
        })
      }
    },
    hideEditModal() {
      // 關閉 modal
      this.$modal.hide("userCardEdit");
      this.name.text = this.currentUser.name
      this.cover = this.currentUser.cover
      this.avatar = this.currentUser.avatar
    },
  },
  created() {
    // 將 vuex 使用者資料帶入、讓使用者預覽
    this.name.text = this.currentUser.name 
    this.cover = this.currentUser.cover
    this.avatar = this.currentUser.avatar
  },
}
</script>