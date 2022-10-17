<template>
    <div v-show="show" class="overlay_create">
      <div class="dialog_create">
       
        {{this.quotes}}
        <button @click="cancel">hehees</button>
      </div>
    </div>
  </template>
  
  <script>
  import "../CardCreatePop/index.css";
  import Card from "../Card/index.vue";
  export default {
    props: ["show", "cancel", "quotes"],
    components: { Card },
    methods: {
    show() {
      if(this.quotearray === null) {
        this.quotearray = this.quotes;
      }else {
      if(this.quotearray.length === 0) {
        this.quotearray = this.quotes;
      }
    }

      const rnum = Math.floor(Math.random() * this.quotearray.length);
      const card_display = this.quotearray[rnum];
      this.quotearray.slice(rnum,1);
      return card_display;
    }
    }
  };
  </script>
  