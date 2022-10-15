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
    <!--
    <div class="aligner"
    v-for="card in cards" 
    :key="card.Id">  
    
    <Card 
    :card="card" 
    />
    
  </div>
  -->


  <button @click="senddata">dsadasdsadsa</button>


  </div>
</template>

<script>
import {reactive} from 'vue' 
import {createQuote, useLoadQuotes} from "../firebase"




export default {
  name: 'HomeView',
  components: {
    Card
  },
  methods:{
    senddata() {
      console.log(useLoadQuotes())
      /*
    this.cards.map((card)=> {
      createQuote(card)
    })
    */
    }
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
  },


  setup () {
    const form = reactive({text: '', author: '', genre: '', create_time: '' ,edit_time: '',})
    const onSubmit = async () =>{
      await createQuote({...form}) 
      form.text=''
      form.author=''
      form.genre=''
      form.create_time=''
      form.edit_time=''
    }
    return {form, onSubmit}
  },
 
 
 
}

</script>
<!--
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
  },



  
  <form class="content" @submit="onSubmit">
        <input type="text" v-model="form.text"   required>
        <input type="text" v-model="form.author"   required>
        <input type="text" v-model="form.genre"  required >
        <input type="text" v-model="form.create_time"  required>
        <input type="text" v-model="form.edit_time"  required>
        <button type="submit">Submit me</button>
  </form>
-->