<template>
  <div class="navBar-wrapper">
    <div class="container">
      <div class="logoContainer">
        <router-link to="/main">
          <img class="logo" alt="" />
        </router-link>
      </div>
      <div class="content">
        <div class="homeTab">
          <router-link class="navItem" to="/admin/tweets">
            <div class="icon">
              <img class="home" alt="" />
            </div>
            推文清單
          </router-link>
        </div>
        <div class="selfTab">
          <router-link class="navItem" to="/admin/users">
            <div class="icon">
              <img class="person" alt="" />
            </div>
            使用者清單
          </router-link>
        </div>
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
  </div>
</template>