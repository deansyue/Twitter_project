<template>
  <div class="navBar">
    <div class="container">
      <div class="logoContainer">
        <router-link to="/main">
          <img class="logo" alt="" />
        </router-link>
      </div>
      <div class="content">
        <div class="homeTab">
          <router-link class="navItem" to="/main">
            <div class="icon">
              <img class="home" alt="" />
            </div>
            首頁
          </router-link>
        </div>
        <div class="selfTab">
          <router-link class="navItem" to="/users/self">
            <div class="icon">
              <img class="person" alt="" />
            </div>
            個人資料
          </router-link>
        </div>
        <div class="settingTab">
          <router-link class="navItem" to="/setting">
            <div class="icon">
              <img class="setting" alt="" />
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
          <img class="logout" alt="" />
        </div>
        登出
      </button>
    </div>
  </div>
</template>