<script setup>
import CardList from '../components/CardList/index.vue'
import "./index.css"
</script>

<template>
  <div class="search">
    <form action="">
      <input type="text" class="search_input" />
    </form>
    <button type="button" class="btn" @click="showDialog = true">Create Card</button>
  </div>
  <DialogCreator :show="showDialog" :cancel="cancel" :rebuild="rebuild">
  </DialogCreator>
  <CardList :quotes="quotes" />
  

</template>

<script>

import { useLoadQuotes } from "../firebase"
import DialogCreator from '../components/CardCreatePop/index.vue'
export default {
  name: 'HomeView',
  components: { DialogCreator },
  setup() {
  },
  data() {
    return {
      showDialog: false,
      quotes: useLoadQuotes(),
    }
  },
  methods: {
    cancel() {
      this.showDialog = false;
    },
    rebuild() {
      this.quotes = useLoadQuotes();
    }
  },

}


</script>
