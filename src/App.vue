<template>
  <div class="header mt-4">{{ title }} </div>
  <p class="score-text" v-for= "player in players" :key="player.id">
    {{ player.name }}
  </p>
  <div>
    <input v-model="newPlayerName" placeholder="Player Name">
    <input v-model="newPlayerScore" placeholder="0" type="number">
    <button @click="addPlayer">Add Player</button>
  </div>
  <router-view/>
</template>

<script>
import axios from 'axios';
const API_URL = "http://localhost:5003/";
export default {
  data(){
    return{
      title:"Test Application",
      players:[],
      newPlayerName:'',
      newPlayerScore:0
    }
  },
  methods:{
    async refreshData(){
      axios.get(API_URL+"injoziproj/reflex_timer").then(
        (response) =>{
          console.log(response.data);
          this.players=response.data;
        }
      )
    },
    async addPlayer(){
      
      if(!this.newPlayerName && !this.newPlayerScore){
        alert("Missing fields");
        return;
      }
      try{
        const response = await axios.post(API_URL+"injoziproj/reflex_timer",{
          name: this.newPlayerName,
          score:this.newPlayerScore
        });
        console.log('New Player Added', response.data);
        this.refreshData();
        this.newPlayerName= '';
        this.newPlayerScore=0;
      }catch(error){
        console.error('Error adding new player:', error);
      }
    }
  },
  mounted:function(){
    this.refreshData();
  }
}
</script>
  
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #50427a;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
