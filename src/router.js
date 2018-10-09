import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      component: () =>
        import('./views/layout/index'),
      children: [{
          path: '',
          component: () =>
            import('./views/layout/infoshow'),
        },
        {
          path: '/home',
          name: 'home',
          component: () =>
            import('./views/layout/Home'),
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: () =>
            import('./views/layout/infoshow'),
        },
        {
          path: '/foundlist',
          name: 'FundList',
          component: () =>
            import('./views/layout/Cash/FundList'),
        },
        {
          path: '/foodlist',
          name: 'foodlist',
          component: () =>
            import('./views/layout/goodsShow'),
        },
        {
          path: '/companyTree',
          name: 'companyTree',
          component: () =>
          import('./components/companyTree.vue'),
        },
        {
          path: '/test',
          name: 'test',
          component: () =>
          import('./views/test'),
        }

      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: () =>
        import('./views/layout/Login/Login'),
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import('./views/layout/Login/Register'),
    },
    {
      path: '*',
      name: '/404',
      component: () =>
        import('./views/layout/404'),
    }

  ]
})

// 路由守卫

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;