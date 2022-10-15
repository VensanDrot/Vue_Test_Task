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

  <CardList />
  <DialogCreator :show="showDialog" :cancel="cancel">
  </DialogCreator>

</template>

<script>

import { useLoadQuotes } from "../firebase"
import DialogCreator from '../components/CardCreatePop/index.vue'
export default {
  name: 'HomeView',
  components: { DialogCreator },
  setup() {
    const quotes = useLoadQuotes();
    return { quotes }
  },
  data() {
    return {
      showDialog: false,
    }
  },
  methods: {
    cancel() {
      this.showDialog = false;
    },
  },

}

</script>
