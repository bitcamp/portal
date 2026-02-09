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
  height: 100%;
  margin: 0;
  padding: 0;
}

#nav {
  padding: 30px;
}
</style>
