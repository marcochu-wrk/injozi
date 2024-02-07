<template>
  <h1>{{ title }}</h1>
  <p v-for="note in notes">
    {{ note.description }}
  </p>
  <router-view/>
</template>

<script>
import axios from 'axios';
const API_URL = "http://localhost:5003/";
export default {
  data(){
    return{
      title:"Injozi Test Application",
      notes:[]
    }
  },
  methods:{
    async refreshData(){
      axios.get(API_URL+"injoziproj/sample_airbnb/GetNotes").then(
        (response) =>{
          console.log(response.data);
          this.notes=response.data;
        }
      )
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
