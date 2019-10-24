import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: res => {
        import('@/views/Home').then(comp => res(comp))
      }
    },{
      path: '/z',
      name: 'z',
      component:()=>import('@/views/Three')
    },{
      path: '/a',
      name: 'a',
      component:()=>import('@/views/A')
    }
  ]
})
