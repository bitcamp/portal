<template>
  <div id="app">
    <!-- <Navbar /> -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
// import Navbar from "@/components/Navbar.vue";
export default {
  name: "App",
  // components: {
  //   Navbar,
  // },
};
</script>

<style>
#app {
  /* font-family: 'Noto Sans', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
</style>
