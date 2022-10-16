<script setup>
import CardList from "../components/CardList/index.vue";
import "./index.css";
</script>

<template>
  <div class="search">
    <input type="text" v-model="search" class="search_input" />
    <button type="button" class="btn" @click="showDialog = true">
      Create Card
    </button>
  </div>

  <CardList :quotes="filteredQuotes" />
  <DialogCreator :show="showDialog" :cancel="cancel" :rebuild="rebuild">
  </DialogCreator>

  <!--Test
  <div v-for="card in filteredQuotes" :key="card.id">
        <Card :card="card"></Card>
    </div>
  -->
</template>

<script>
import { useLoadQuotes } from "../firebase";
import Card from "../components/Card/index.vue";
import DialogCreator from "../components/CardCreatePop/index.vue";
export default {
  name: "HomeView",
  components: { DialogCreator, CardList, Card },
  setup() {},
  data() {
    return {
      showDialog: false,
      search: "",
      quotes: useLoadQuotes(),
    };
  },
  methods: {
    cancel() {
      this.showDialog = false;
    },
    rebuild() {
      this.quotes = useLoadQuotes();
    },
  },
  computed: {
    filteredQuotes() {
 
      return this.quotes.filter((q) => {
        if(q.Text.toLowerCase().includes(this.search.toLowerCase()) || q.Author.toLowerCase().includes(this.search.toLowerCase()))
        return q;    
      }
      );
    },
  },
};
</script>
