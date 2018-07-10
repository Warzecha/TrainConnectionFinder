<template>
<div >
  <div>
    <form v-on:submit.prevent="addCity()">
      <input type="text" v-model="newCity.name" placeholder="Name">

      <input type="submit" value="Add city">

    </form>


  </div>
  <div>
    <div v-for="city in cities" class="element">

      <h4 class="city_name">{{city.name}}</h4>
      <button v-on:click="deleteCity(city._id)" class="delete_button">X</button>

      </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */
const axios = require('axios');



export default {
  name: 'Cities',
  data () {
    return {
      
      cities: [],
      newCity: {}
    }
  },
  methods:
  {
    getCities(){
      axios
        .get('http://localhost:3000/api/cities')
        // .then(response => {return response.json()})
        .then((response) => { this.cities = response.data })
        .catch((error) => { console.error(error) }) 

    },
    deleteCity: function(idToDelete){
      
      console.log(`deleting city with id: ${idToDelete}`);
      axios
        .delete('http://localhost:3000/api/cities/' + idToDelete)
        // .then(response => {return response.json()})
        .then((response) => { 
          console.log('deleted: ' + response.data) 
          this.getCities();
        })
        .catch((error) => { console.error(error) }) 


    },
    addCity: function(){
        console.log('addCity')


      axios
        .post('http://localhost:3000/api/cities/', this.newCity)
        // .then(response => {return response.json()})
        .then((response) => { 
          // console.log('deleted: ' + response.data) 
          this.getCities();
        })
        .catch((error) => { console.error(error) }) 


    }




  },
  created () {
    console.log('mounted');
    this.getCities(); 
  }
  
}
</script>


<style>


.delete_button {

  display: inline;
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;

}

.city_name {

  display: inline-block;
}

.element {

  width: 40%;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: auto;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  border-radius: 5px;
}
</style>
