<template>
  <div id="app">
    <Header v-if="$route.meta.requiresAuth"></Header>
    <router-view></router-view>
    <Footer v-if="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
export default {
  name: "App",
  components: { Footer, Header },
};
</script>

<style scoped>
#app {
  height: 100%;
}
</style>
