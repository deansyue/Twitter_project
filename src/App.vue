<template>
  <div id="app">
    <router-view/>
    <Example />
  </div>
</template>

<script>
import Example from "./components/Example.vue"
export default {
  components: {
    Example
  }
}
</script>

<style lang="scss">
@import "/src/scss/Main.scss";
</style>