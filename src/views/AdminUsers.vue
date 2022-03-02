<template>
  <div class="app-double-column">
    <div class="left-container">
      <AdminNavBar />
    </div>
    <div class="middle-container">
      <div class="main-wrapper">
        <h3 class="main-title">使用者清單</h3>
      </div>
      <div class="adminusers__container">
      <div class="adminuser__tweets"

      >
        <AdminUserList :users="users"/>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavBar from '../components/AdminNavBar.vue';
import AdminUserList from '../components/AdminUserList.vue';
import { Toast } from '../utils/helpers';
import adminAPI from "../apis/admin";


export default {
  components: {
    AdminNavBar,
    AdminUserList,
  },
    data() {
    return {
      users:[],
    };
  },
    created() {
    this.fetchUsers();
  },
  methods: {
    async fetchTweetCards() {
      try {
        const { data, statusText } = await adminAPI.getAdminUsers()
        if (statusText !== "OK") throw new Error(statusText)
        this.users = { ...data }

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法成功載入使用者清單！'
        })
      }
    },
  },
};
</script>