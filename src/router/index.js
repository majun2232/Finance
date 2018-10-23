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
        import('@v/layout/index'),
      children: [{
          path: '',
          component: () =>
            import('@v/infoshow'),
        },
        {
          path: '/banlanceSheet',
          name: 'banlanceSheet',
          component: () =>
            import('@v/intelligenceReport/banlanceSheet.vue'),
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: () =>
            import('@v/infoshow'),
        },
       
        {
          path: '/companyTree',
          name: 'companyTree',
          component: () =>
          import('@c/companyTree.vue'),
        },
        {
          path: '/test',
          name: 'test',
          component: () =>
          import('@v/test'),
        }

      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: () =>
        import('@v/layout/Login/Login'),
    },
   
    {
      path: '*',
      name: '/404',
      component: () =>
        import('@v/layout/404'),
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