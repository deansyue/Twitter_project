<template>
  <div class="admintweetCard-wrapper">
    <!--UserAvatar-->
    <div class="adminuser__avatar">
      <img class="avatar" :src="user.avatar | emptyImage">
    </div>

    <!--UserInfo-->
    <div class="adminuser__info">
      <div class="adminuser__title">
        <strong>
          {{ user.name }}
        </strong>
        <h5 class="adminuser__subtitle">
          {{ user.account | accountTag }}
        </h5>
      </div>
      <div class="adminuser__heart">
        <div class="adminuser__heart01">
        <img class="reply">
        <span>{{ user.tweetCount | numberFormatEndFilter }}</span>
        </div>
        <div class="adminuser__heart02">
        <img  class="heart-active">
        <img  class="heart">
        <span>{{ user.liketCount | numberFormatEndFilter }}</span>
        </div>
      </div>
      <div class="adminuser__followinfo">
        <div class="adminuser__followinfo01">
        <span>{{ user.followingCount | numberFormatTCFilter }} 個</span><h5>跟隨中</h5>
        </div>
        <div class="adminuser__followinfo02">
        <span>{{ user.followersCount | numberFormatTCFilter }} 個</span><h5>跟隨者</h5>
        </div>
      </div>
    </div>

  </div>
</template>

