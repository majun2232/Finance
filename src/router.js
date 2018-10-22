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
            import('./views/infoshow'),
        },
        {
          path: '/banlanceSheet',
          name: 'banlanceSheet',
          component: () =>
            import('./views/intelligenceReport/banlanceSheet.vue'),
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: () =>
            import('./views/infoshow'),
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
      path: '*',
      name: '/404',
      component: () =>
        import('./views/layout/404'),
    }

  ]
})

// 路由守卫

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.authorization ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;