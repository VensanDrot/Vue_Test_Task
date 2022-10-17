<script setup>
import CardList from "../components/CardList/index.vue";
import "./index.css";
</script>

<template>
  <div class="search">
  <div class="flexer">
    <input type="text" v-model="search" class="search_input" placeholder="Search" />
    <select class="selector" v-model="filter_type" :onchange="Change">
        <option value="e_date">By Edit Date</option>
        <option value="c_date">By Create Date</option>
    </select>
    
  </div>
  
  <div class="flexer">
    
    <button type="button" class="btn" @click="showDialog = true">
      Create Card
    </button>
  
  </div>
  </div>

  <CardList :quotes="filteredQuotes" />
  <DialogCreator :show="showDialog" :cancel="cancel" :rebuild="rebuild">
  </DialogCreator>

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
      filter_type: 'Select Filter',
    };
  },
  methods: {
    cancel() {
      this.showDialog = false;
    },
    rebuild() {
      this.quotes = useLoadQuotes();
    },
    byEdit(a,b) {
      if(a.Edit_Time > b.Edit_Time) {
        return 1
      }
      else if (b.Edit_Time > a.Edit_Time) {
        return -1;
      }
      else {
        return 0;
      }
    },
    byCreate(a,b) {
      if(a.Create_Time > b.Create_Time) {
        return 1
      }
      else if (b.Create_Time > a.Create_Time) {
        return -1;
      }
      else {
        return 0;
      }
    }
  },
  computed: {
    filteredQuotes() {
      return this.quotes.filter((q) => {
        if(q.Text.toLowerCase().includes(this.search.toLowerCase()) || q.Author.toLowerCase().includes(this.search.toLowerCase()))
        return q;    
      }
      );
    },
    Change() {
      if(this.filter_type === 'e_date') {
        this.quotes.sort(this.byEdit)
      }
      else if (this.filter_type === 'c_date') {
        this.quotes.sort(this.byCreate)
      }
      
    }
  },
};
</script>
