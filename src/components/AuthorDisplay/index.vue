<template>
    <div v-show="show" class="overlay_create">
      <div class="dialog_create">
        <div class="author_container">
        <button class="btn" @click="cancel">Close</button>
        
        <div class="display" v-for="a in author" :key="a.author">
            <label class="label">Author:</label>
            <label>{{a.author}}</label>
            <label class="label">Genres:</label>
            <label>{{a.genre}}</label>
            
        </div>
        
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import "./index.css"
  import "../CardCreatePop/index.css";
  import CreateCard from "../CardCreation/index.vue";
  export default {
    props: ["show", "cancel", "author"],
  };
  </script>
  