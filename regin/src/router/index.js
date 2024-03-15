import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import AppVue from '@/App.vue'
// import showCom from "@/components/showCom.vue";

const routes = [
    
  {
    path: '/',
    name: 'home',
    meta: {
      showHelloWorld: true
    },
    component: AppVue
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/ErrorView.vue'),
  },
  {
    path: '/main',
    name: 'main',
    meta: { refresh: false} ,// 设置meta字段来标识需要刷新页面的路由
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/HomeView.vue'),
    children:[
      {
        path:'/homePage',
        name:'homePage',
        component:() => import('../components/HomePart'),
        
      },
      {
        path:'/food',
        name:'food',
        component:() => import('../components/FoodPart'),
      },
      {
        path:'/selfpart',
        name:'selfpart',
        component:() => import('../components/SelfPart.vue'),
      },
      {
        path:'/active',
        name:'active',
        component:() => import('../components/ActivePart'),
      },
      {
        path:'/comunicate',
        name:'comunicate',
        component:() => import('../components/ComunicatePart'),
      },
      {
        path:'/Institution',
        name:'Institution',
        component:() => import('../components/InstitutionPart.vue'),
      },
      {
        path:'/Self',
        name:'Self',
        component:() => import('../components/SelfPush.vue'),
      }
    ]
  },
  
  
  {
    path:'/RegisterView',
    name:'RegisterView',
    component:() => import('../views/RegisterView.vue'),
    children:[
      {
        path:'/login',
        name:'login',
        component:() => import('../components/Login.vue'),
      },
      {
        path:'/register',
        name:'register',
        component:() => import('../components/Register.vue'),
      },
    ]
  },
  {
    path:'/HelloWorld',
    name:'HelloWorld',
    component:() => import('../components/HelloWorld.vue'),
  },
  {
    path:'/label',
    name:'label',
    component:() => import('../components/Guidance.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  // 获取滚动区域的元素，例如假设其具有类名为 "scroll-area"
  const scrollArea = document.querySelector('.contents1');

  if (scrollArea) {
    // 将滚动区域的滚动位置滚动到顶部
    scrollArea.scrollTop = 0;
  }

  next();
});
export default router
