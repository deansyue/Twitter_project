<template>
  <!-- <h2>某使用者跟隨中的人</h2> -->
  <div class="app-tripple-column">
    <div class="left-container">
      <NavBar />
    </div>
    <div class="middle-container">
    </div>
    <div class="right-container">
      <Popular />
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
// import TweetCard from '../components/TweetCard.vue'
import Popular from '../components/Popular.vue'

export default {
  components: {
    NavBar,
    Popular
  },
}
</script>