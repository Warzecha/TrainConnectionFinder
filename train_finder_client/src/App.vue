<template>
  <div id="app">
    <div id="menu_bar">
      <router-link to="/" class="menu_item">Hello World</router-link>
      <router-link to="/cities" class="menu_item">Citites manager</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  color: black;
}

#menu_bar {
  margin: 0;
  padding: 10px;
  background: gray;
}

.menu_item {
  color: white;
  font-size: 15px;
  border-style: solid;
  padding: 5px;
  margin: 10px;
  text-decoration: none;
}
</style>
