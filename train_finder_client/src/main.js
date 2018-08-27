// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import HelloWorld from './components/HelloWorld'
import Connections from './components/Connections'
import Cities from './components/Cities'
import Finder from './components/Finder'
import VueRouter from 'vue-router'

// Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/cities',
    name: 'Cities',
    component: Cities
  },
  {
    path: '/connections',
    name: 'Connections',
    component: Connections
  },
  {
    path: '/finder',
    name: 'Finder',
    component: Finder
  }
]

const router = new VueRouter({
  routes: routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // router: router
  components: { App },
  template: '<App/>'
})
