import { createRouter, createWebHistory } from 'vue-router'
import LogUserView from '../views/LogUserView.vue'

const routes = [
  {
    path: '/log_user',
    name: 'LogUserView',
    component: LogUserView
  },
  {
    path: '/create_autor',
    name: 'AutorCreate',
    component: () => import(/* webpackChunkName: "UserView" */ '../views/AutorCreate.vue')
  },
  {
    path: '/list_autor',
    name: 'AutorView',
    component: () => import(/* webpackChunkName: "AutorView" */ '../views/AutorView.vue')
  },
  {
    path: '/show_autor/:id',
    name: 'AutorShow',
    component: () => import(/* webpackChunkName: "AutorView" */ '../views/AutorShow.vue')
  },
  {
    path: '/edit_autor_list',
    name: 'AutorEditList',
    component: () => import(/* webpackChunkName: "AutorView" */ '../views/AutorEditList.vue')
  },
  {
    path: '/edit_autor/:id',
    name: 'AutorEditView',
    component: () => import(/* webpackChunkName: "UserView" */ '../views/AutorEditView.vue')
  },
  {
    path: '/show_user',
    name: 'UserView',
    component: () => import(/* webpackChunkName: "UserView" */ '../views/UserView.vue')
  },
  {
    path: '/',
    name: 'HomeView',
    component: () => import(/* webpackChunkName: "UserView" */ '../views/HomeView.vue')
  },
  {
    path: '/create_obra',
    name: 'ObraCreate',
    component: () => import(/* webpackChunkName: "UserView" */ '../views/ObraCreate.vue')
  },
  {
    path: '/list_obra',
    name: 'ObraView',
    component: () => import(/* webpackChunkName: "UserView" */ '../views/ObraView.vue')
  },
  {
    path: '/show_obra/:id',
    name: 'ObraShow',
    component: () => import(/* webpackChunkName: "UserView" */ '../views/ObraShow.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
