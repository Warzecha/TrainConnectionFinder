// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import HelloWorld from './components/HelloWorld'
import Connections from './components/Connections'
import Cities from './components/Cities'
import Finder from './components/Finder'
import GoogleMap from './components/GoogleMap'
import VueRouter from 'vue-router'
import * as VueGoogleMaps from "vue2-google-maps";



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

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCxFYB_ygfntjuA0_OlbtEkkrqc59YVNHY",
    libraries: "places" // necessary for places input
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // router: router
  components: { App },
  template: '<App/>'
})
