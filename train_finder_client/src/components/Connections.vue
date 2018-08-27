/* eslint-disable */
<template>
<div >
  <div id="form">
    <form v-on:submit.prevent="addConnection()">
      

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


      <input type="number" v-model="newConnection.durationInMinutes" placeholder="Duration in minutes">
      <input type="number" v-model="newConnection.ticketPriceInEUR" step="0.01" placeholder="Ticket price">

      <input type="submit" value="Add connection">

    </form>


  </div>
  <div>
    <div v-for="connection in connections" class="element">


          

    <div class="label_div">
      <span class="label">From:</span>
    </div>  
      
      <div class="value_div">
       <span class="value">{{(connection.fromCityName)}}</span>

      </div>

      <div class="label_div">
      <span class="label">To:</span>
    </div>  
      
      <div class="value_div">
       <span class="value">{{(connection.toCityName)}}</span>

      </div>

      <div class="label_div">
      <span class="label">Price:</span>
    </div>  
      
      <div class="number_div">
       <span class="value">{{(connection.ticketPriceInEUR)}} €</span>

      </div>

            <div class="label_div">
      <span class="label">Duration:</span>
    </div>  
      
      <div class="number_div">
       <span class="value">{{Math.floor(connection.durationInMinutes/60)}}:{{connection.durationInMinutes % 60}}</span>

      </div>

     
      <button v-on:click="deleteConnection(connection._id)" class="delete_button">X</button>

      </div>
  </div>
</div>
</template>


<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
   integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
   crossorigin=""></script>

<script>
/* eslint-disable */
const axios = require('axios');



export default {
  name: 'Connections',
  data () {
    return {
      
      connections: [],
      cities: [],
      newConnection: {},
      fromCity: {},
      toCity: {}
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
    deleteConnection: function(idToDelete){
      
      console.log(`deleting connection with id: ${idToDelete}`);
      axios
        .delete('http://localhost:3000/api/connections/' + idToDelete)
        // .then(response => {return response.json()})
        .then((response) => { 
          console.log('deleted: ' + response.data) 
          this.getConnections();
        })
        .catch((error) => { console.error(error) }) 


    },
    addConnection: function(){
        console.log('addConnection')

        this.fromCity = JSON.parse(this.fromCity);
        this.toCity = JSON.parse(this.toCity);

        this.newConnection.fromCityId = this.fromCity._id;
        this.newConnection.toCityId = this.toCity._id;
        this.newConnection.fromCityName = this.fromCity.name;
        this.newConnection.toCityName = this.toCity.name;
        console.log(this.fromCity)

        console.log(this.newConnection)

      axios
        .post('http://localhost:3000/api/connections/', this.newConnection)
        // .then(response => {return response.json()})
        .then((response) => { 
          // console.log('deleted: ' + response.data) 
          this.getConnections();
          this.newConnection = {};
          // this.newConnection.name = '';
        })
        .catch((error) => { console.error(error) }) 


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
