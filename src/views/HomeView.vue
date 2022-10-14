<script setup>
import Card from '../components/Card/index.vue'
import './index.css'
</script>

<template>
  <div class="search">
    <form action="">
      <input type="text" />

    </form>
  </div>

  <div class="card_holder">

    <div class="aligner"
    v-for="card in cards" 
    :key="card.Id">  
    
    <Card 
    :card="card" 
    />
    
  </div>

  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
    Card
  },
  data() {
    return {
      cards: [
        {
          Text: 'WetShmetDussyJuccie',
          Author: 'Benjamin Drot',
          Genre: 'Shisssss',
          Id: 1,
          Create_Time: '12:12:12',
          Edit_Time: '12:12:12',
        },
        {
          Text: 'ddddddddddd',
          Author: 'Alvert urod',
          Genre: 'Pisya',
          Id: 2,
          Create_Time: '12:12:12',
          Edit_Time: '12:12:12',
        },
        {
          Text: 'dsadsa',
          Author: 'Benjamin Vrot',
          Genre: 'Sisya',
          Id: 3,
          Create_Time: '12:12:12',
          Edit_Time: '12:12:12',
        },
      ]
    }
  }
}

</script>
