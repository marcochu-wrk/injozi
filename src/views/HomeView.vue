<template>
  <div class="header mt-7">{{ title }}</div>
  <p class="score-text" v-for= "player in players" :key="player.id">
    {{ player.name }}
  </p>
  <div class="playerBody mt-5">
    <input class="inputFields" v-model="newPlayerName" placeholder="Player Name">
    <input class="inputFields" v-model="newPlayerScore" placeholder="0" type="number">
    <button class="addButton" @click="addPlayer">Add Player</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'
import axios from 'axios';
const API_URL = "http://localhost:5003/";
export default {
  components:{
    Home
  },
  props:{
    
  },
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
