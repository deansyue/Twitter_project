<template>
  <div class="navBar">
    <div class="container">
      <div class="logo">
        <router-link to="/main">
          <img class="logoImg" alt="" />
        </router-link>
      </div>
      <div class="content">
        <div class="homeTab">
          <router-link class="navItem" to="/main">
            <div class="icon">
              <img class="homeImg" alt="" />
            </div>
            首頁
          </router-link>
        </div>
        <div class="selfTab">
          <router-link class="navItem" to="/users/self">
            <div class="icon">
              <img class="personImg" alt="" />
            </div>
            個人資料
          </router-link>
        </div>
        <div class="settingTab">
          <router-link class="navItem" to="/setting">
            <div class="icon">
              <img class="settingImg" alt="" />
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
          <img class="logoutImg" alt="" />
        </div>
        登出
      </button>
    </div>
  </div>
</template>