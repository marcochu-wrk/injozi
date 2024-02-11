<template>
  <div class="header mt-7 mb-5">{{ title }}</div>
  <div class="center-container">
    <div class="list-container">
      <p class="list-player score-text" v-for= "player in sortedPlayers" :key="player.id">
        <div class="player-name">{{ player.name }}</div>
        <div class="player-score">{{ player.score }}</div>
      </p>
    </div>
  </div>
  <div class="playerBody mt-5">
    <input class="inputFields" v-model="newPlayerName" placeholder="Player Name">
    <input class="inputFields" v-model="newPlayerScore" placeholder="0" type="number">
    <button class="addButton" @click="addPlayer">Add Player</button>
  </div>
</template>

<script>
import Home from '@/components/Home.vue';
import axios from 'axios';
const API_URL = "http://localhost:5003/";
export default {
  components:{
    Home,
  },
  props:{

  },
  data(){
    return{
      title:"Test Application",
      players:[],
      newPlayerName:'',
      newPlayerScore:0,
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
  computed: {
    sortedPlayers() {
      return this.players.slice().sort((a, b) => b.score - a.score);
    }
  },
  mounted:function(){
    this.refreshData();
  }
}
</script>

<style>
.center-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-container{
  height: 10rem;
  width: 35rem;
  overflow-y: auto;
  border: 0.1rem solid #7d7d7d;
  border-radius: 1rem; 
  padding: 1rem;
  background-color: #35303f;
}

.list-player{
  display: flex;
  gap: 5rem;
  justify-content: center; 
  align-items: center;
  padding: 0.2rem 0; 
}

.player-name, .player-score {
  margin: 0 0.1rem;
}

.list-container::-webkit-scrollbar {
  width: 0.5rem
}

.list-container::-webkit-scrollbar-track {
  background: transparent;
}

.list-container::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 1rem;
}
</style>
