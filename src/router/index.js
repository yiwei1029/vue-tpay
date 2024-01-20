import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Test from '../components/Test.vue'
import Dashboard from '../components/Dashboard.vue'

Vue.use(VueRouter)

const routes = [{path:'/',redirect:'/dashboard'},
  {
    path: '/login',
    name: 'login',
    component:Login
  },
  {
    path:'/home',
    component:Home,
    children:[
      

    ]
  },
  {
    path:'/test',
    component:Test
  },
  {
    path:'/dashboard',
    component:Dashboard
  }

]

const router = new VueRouter({
  routes
})

export default router
