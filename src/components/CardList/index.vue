<template>
    <div class="card_holder">
  
   
    <div class="aligner"
    v-for="card in quotes" 
    :key="card.Id">  
    
    <Card 
    :key="card.Id"
    :card="card" 
    />
    
  </div>
 <!--  -->

    </div>
</template>


<script>
import './index.css'
import Card from '../Card/index.vue'
import { useLoadQuotes,deleteQuote } from '@/firebase'
export default {
    setup() {
        const quotes = useLoadQuotes();
        return { quotes, deleteQuote };
    },
    components: { Card }
}

</script>
