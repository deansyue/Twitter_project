<template>
  <div class="userFollowTabs-wrapper">
    <div class="userFollowTabs-title">
      <img @click="$router.back()" class="arrow" />
      <div>
        <h3>{{ "John Doe" }}</h3>
        <h6>{{ "25" }}推文</h6>
      </div>
    </div>
    <div class="userFollowTabs-body">
      <router-link class="userFollows-tab"
        :to="{ name: 'users-followers', params: { id: 1}}"
      >
        追隨者
      </router-link>
      <router-link class="userFollows-tab"
        :to="{ name: 'users-followings', params: { id: 1}}"
      >
        正在跟隨
      </router-link>
    </div>
    <div class="userFollows-body"></div>
  </div>
</template>