<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    name: 'app',
    created() {
      // console.log(this)
      // this.find_node=find_node
      // 为了避免刷新丢失用户数据,需要程序每次进来时获取一下状态
      if (localStorage.authorization) {
        // token存储到vuex中
        this.$store.dispatch("setIsAutnenticated", !this.isEmpty(localStorage.authorization));
        // 由于localStorage只能存字符串,需转json       
        this.$store.dispatch("setUser", JSON.parse(localStorage.database));
      }
    },
  }
</script>

<style>
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
  }
</style>