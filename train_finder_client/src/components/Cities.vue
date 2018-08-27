/* eslint-disable */
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


    
<div class="city_name_div">
  <span class="city_name">{{city.name}}</span>
</div>
      

    <div class="label_div">
      <span class="label">Latitude:</span>
    </div>  
      
      <div class="value_div">
       <span class="value">{{city.lat}}</span>

      </div>

      <div class="label_div">
      <span class="label">Longitude:</span>
    </div>  
      
      <div class="value_div">
       <span class="value">{{city.lng}}</span>

      </div>

     
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
          this.newCity.name = '';
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
  font-weight: bold;
}

.label {

  display: inline-block;
  font-weight: lighter;
}

.value {

  display: inline-block;
  float: left;
}

.city_name_div {
  float: left;
  display: inline-block;
  width: 20%;
  margin: 10px;
  padding: 5px;

}

.label_div {
  display: inline-block;
    float: left;
  margin: 10px;
  padding: 5px;
}

.value_div {
  display: inline-block;
    float: left;
  width: 15%;
  margin: 10px;
  padding: 5px;

  border-style: solid;
  border-width: 1px;
  border-color: gray;
  border-radius: 5px;
}



.element {

  width: 70%;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: auto;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  border-radius: 5px;
  height: 45px;
}
</style>
