import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Test from '../components/Test.vue'
import Dashboard from '../components/Dashboard.vue'
import Channel from '../components/Channel.vue'
import Execute from '../components/Execute.vue'

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
      {
        path:'/dashboard',
        component:Dashboard
      },
      {
        path:'/channel',
        component:Channel
      },
      {
        path:'/execute',
        component: Execute
      }

    ]
  },
  {
    path:'/test',
    component:Test
  },
  

]

const router = new VueRouter({
  routes
})

export default router
