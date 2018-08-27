<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential knowledge</h2>
    <ul>
      <li>
        <h3>
          You can add and remove cities in Cities manager tab
        </h3> 
      </li>
      


    </ul>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Train Connection Finder'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {

  margin: 0 10px;
}
a {
  color: #42b983;
}

h3 {
  color: #42b983;
  font-weight: normal;
}
</style>
