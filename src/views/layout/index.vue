<template>
  <div :class="classObj" class="index app-wrapper">
     <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <HeadNav></HeadNav>
    <leftMenu class="sidebar-container"/>
    <div class="rightContainer main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import HeadNav from './Navbar/HeadNav'
  import leftMenu from './Sidebar/leftMenu'
  export default {
    name: "qindex",
    data() {
      return {

      }
    },
    components: {
      HeadNav,
      leftMenu
    },
     computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
   methods: {
    //  提供dispatch(action)方法更新state
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import "src/styles/mixin.scss";
  .index {
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-width: 600px;
  }

  .rightContainer {
    position: relative;
    top: 0;
    /* left: 180px; */
    width: calc(100% - 256px);
    height: calc(100% - 71px);
    overflow: auto;
  }
  
 .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>