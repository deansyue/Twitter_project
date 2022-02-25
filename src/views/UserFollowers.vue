<template>
  <div class="app-tripple-column">
    <div class="left-container">
      <NavBar />
    </div>
    <div class="middle-container">
      <UserFollowTabs />
    </div>
    <div class="right-container">
      <Popular />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import UserFollowTabs from '../components/UserFollowTabs.vue'
import Popular from "../components/Popular.vue";

export default {
  components: {
    NavBar,
    UserFollowTabs,
    Popular,
  },
};
</script>