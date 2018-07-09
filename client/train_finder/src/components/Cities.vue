<template>
<div >
  <h2>{{ msg }}</h2>
  <div>
    <li v-for="city in cities">{{city.name}}</li>
  </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Cities',
  data () {
    return {
      msg: 'Welcome to cities manager',
      cities: []
    }
  },
  
  created () {
    console.log('ok');
    fetch('http://localhost:3000/api/cities')
    // fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        
        return response.json()
      })
      .then((data) => {
        console.log(data)
        this.cities = data
        
    })
      .catch((error) => {
        console.error(error);
      })  
  }
  
}
</script>