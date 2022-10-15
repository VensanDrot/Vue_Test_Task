<script setup>
import CardList from '../components/CardList/index.vue'
import CreateCard from '../components/CardCreation/index.vue'
import "./index.css"
</script>

<template>
  <div class="search">
    <form action="">
      <input type="text" class="search_input" />
    </form>
    <button type="button" class="btn">Create Card</button>
  </div>
  
  <CardList />
 
</template>

<script>

import {createQuote, useLoadQuotes} from "../firebase"

export default {
  name: 'HomeView',
  setup () {
    const quotes =  useLoadQuotes();
    return {quotes}
  },
 
 
 
}

</script>
