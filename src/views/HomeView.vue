<script setup>
import CardList from "../components/CardList/index.vue";
import "./index.css";
</script>

<template>
  <div class="search">
    <div class="flexer">
      <input type="text" v-model="search" class="search_input" placeholder="Search" />
      <button type="button" class="btn" @click="search=''">
        Clear Input
      </button>

    </div>

    <div class="flexer">
      <select class="selector" v-model="filter_type" :onchange="Change">
        <option value="Filters" selected disabled>Filters</option>
        <option value="e_date">By Edit Date</option>
        <option value="c_date">By Create Date</option>
        <option value="author">By Author</option>
        <option value="genre">By Genre</option>
      </select>
      <button type="button" class="btn" @click="showDialog = true">
        Create Card
      </button>
    </div>
  </div>
   
   
  <CardList :quotes="filteredQuotes" />
  <DialogCreator  :show="showDialog" :cancel="cancel" :rebuild="rebuild">
  </DialogCreator>
]
</template>

<script>
import { useLoadQuotes, UseLoadAuthorsGenre } from "../firebase";
import DialogCreator from "../components/CardCreatePop/index.vue";


export default {
  name: "HomeView",
  components: { DialogCreator,CardList },
  data() {
    return {
      showDialog: false,
      showRDialog: false,
      search: "",
      quotes: useLoadQuotes(),
      filter_type: 'Filters',
      author: UseLoadAuthorsGenre(),
      quotearray: null,
    };
  },
  methods: {
    cancel() {
      this.showDialog = false;
      this.showRDialog = false;
    },
    hide() {
      this.showRDialog = false;
    },
    rebuild() {
      this.quotes = useLoadQuotes();
    },
    byEdit(a, b) {
      if (a.Edit_Time > b.Edit_Time) {
        return 1
      }
      else if (b.Edit_Time > a.Edit_Time) {
        return -1;
      }
      else {
        return 0;
      }
    },
    byCreate(a, b) {
      if (a.Create_Time > b.Create_Time) {
        return 1
      }
      else if (b.Create_Time > a.Create_Time) {
        return -1;
      }
      else {
        return 0;
      }
    },
    byAuthor(a, b) {
      if (a.Author < b.Author) {
        return -1;
      }
      else if (a.Author > b.Author) {
        return 1;
      }
      return 0;
    },
    byGenre(a, b) {
      if (a.Genre < b.Genre) {
        return -1;
      }
      else if (a.Genre > b.Genre) {
        return 1;
      }
      return 0;
    },
   
  },
  computed: {
    filteredQuotes() {
      return this.quotes.filter((q) => {
        if (q.Text.toLowerCase().includes(this.search.toLowerCase()) || q.Author.toLowerCase().includes(this.search.toLowerCase()) || q.Genre.toLowerCase().includes(this.search.toLowerCase()))
          return q;
      }
      );
    },
    Change() {
      if (this.filter_type === 'e_date') {
        this.quotes.sort(this.byEdit)
      }
      else if (this.filter_type === 'c_date') {
        this.quotes.sort(this.byCreate)
      }
      else if (this.filter_type === 'author') {
        this.quotes.sort(this.byAuthor)
      }
      else if (this.filter_type === 'genre') {
        this.quotes.sort(this.byGenre)
      }

    }
  },
};
</script>
