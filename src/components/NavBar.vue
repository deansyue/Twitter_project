<template>
  <div class="navBar">
    <div class="container">
      <div class="logo">
        <router-link to="/main">
          <img :src="require('../assets/icon/Logo.png')" alt="" />
        </router-link>
      </div>
      <div class="content">
        <div class="homeTab">
          <router-link class="navItem" to="/main">
            <div class="icon">
              <img
                class="normalImg"
                :src="require('../assets/icon/home.png')"
                alt=""
              />
              <img
                class="activeImg"
                :src="require('../assets/icon/homeActive.png')"
                alt=""
              />
            </div>
            首頁
          </router-link>
        </div>
        <div class="selfTab">
          <router-link class="navItem" to="/users/self">
            <div class="icon">
              <img
                class="normalImg"
                :src="require('../assets/icon/person.png')"
                alt=""
              />
              <img
                class="activeImg"
                :src="require('../assets/icon/personActive.png')"
                alt=""
              />
            </div>
            個人資料
          </router-link>
        </div>
        <div class="settingTab">
          <router-link class="navItem" to="/setting">
            <div class="icon">
              <img
                class="normalImg"
                :src="require('../assets/icon/setting.png')"
                alt=""
              />
              <img
                class="activeImg"
                :src="require('../assets/icon/settingActive.png')"
                alt=""
              />
            </div>
            設定
          </router-link>
        </div>
      </div>
      <button class="btn">推文</button>
    </div>
    <div class="logoutTab">
      <button class="logoutButton">
        <div class="icon">
        <img :src="require('../assets/icon/logout.png')" alt="" />
        </div>登出
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "/src/scss/NavBar.scss";
</style>