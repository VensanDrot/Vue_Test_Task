<template>
    <div v-show="show" class="overlay_create">
      <div class="dialog_create">
       
        <card :card="this.card"></card>
        
        <button @click="setValue">hssssehees</button>
        <button @click="cancel">hehees</button>
       
      </div>
    </div>
  </template>
  
  <script>
  import "../CardCreatePop/index.css";
  import Card from "../Card/index.vue";
  export default {
    props: ["show", "cancel", "card"],
    components: { Card },
   
    methods: {
      setValue() {
        
        console.log(this.card)
      }
    }
  };
  </script>
  