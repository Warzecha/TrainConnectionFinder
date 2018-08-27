/* eslint-disable */
<template>
<div >
  <div id="form">
    <form v-on:submit.prevent="findConnection()">
      

      <span>From: </span>
      <select v-model="fromCity">

        <option v-for="city in cities" :value="JSON.stringify(city)">
          {{city.name}}
        </option>

      </select>

     <span>To: </span>

        <select v-model="toCity">

        <option v-for="city in cities" :value="JSON.stringify(city)">
          {{city.name}}
        </option>

      </select>


      <!-- <input type="number" v-model="newConnection.durationInMinutes" placeholder="Duration in minutes">
      <input type="number" v-model="newConnection.ticketPriceInEUR" step="0.01" placeholder="Ticket price"> -->

      <input type="submit" value="Add connection">

    </form>


  </div>


  <div id="mapid"></div>
  
</div>
</template>

<script>
/* eslint-disable */
const axios = require('axios');



export default {
  name: 'Finder',
  data () {
    return {
      
      fromCity: {},
      toCity: {},
      connections: [],
      cities: []
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
    getConnections(){
      axios
        .get('http://localhost:3000/api/connections')
        // .then(response => {return response.json()})
        .then((response) => { this.connections = response.data })
        .catch((error) => { console.error(error) }) 

    },
    findConnection(){

      console.log('start searching for connections')



    }




  },
  created () {
    console.log('mounted');
    this.getConnections();
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

.connection_name {

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

.connection_name_div {
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

.number_div {
  display: inline-block;
    float: left;
  width: 8%;
  margin: 10px;
  padding: 5px;

  border-style: solid;
  border-width: 1px;
  border-color: gray;
  border-radius: 5px;
}

#mapid { height: 180px; }



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


#form {
  margin-top: 10px;
}

</style>
