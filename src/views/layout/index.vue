<template>
  <div :class="classObj" class="app-wrapper">
    <HeadNav></HeadNav>
    <leftMenu class="sidebar-container" />
    <div class="main-container">
      <router-view class="containerMain"></router-view>
    </div>
  </div>
</template>

<script>
  import HeadNav from './Navbar/HeadNav'
  import leftMenu from './Sidebar/leftMenu'
  import ResizeMixin from './mixin/ResizeHandler'
  export default {
    name: "index",
    data() {
      return {

      }
    },
    components: {
      HeadNav,
      leftMenu
    },
    mixins: [ResizeMixin],
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
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    // @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
</style>