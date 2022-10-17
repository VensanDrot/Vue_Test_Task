<script setup>
import CardList from "../components/CardList/index.vue";
import "./index.css";
</script>

<template>
  <div class="search">
    <div class="flexer">
      <input
        type="text"
        v-model="search"
        class="search_input"
        placeholder="Search"
      />
      <button type="button" class="btn" @click="search = ''">
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
    <button
      style="align-self: center"
      type="button"
      @click="(showRDialog = true), (element = selectCard())"
      class="btn"
    >
      Random Quote
    </button>
  </div>

  <h1 style="text-align: center" :hidden="quotes">
    <img src="../assets/loading.gif" />
  </h1>

  <CardList :quotes="filteredQuotes" />

  <DialogCreator :show="showDialog" :cancel="cancel" :rebuild="rebuild">
  </DialogCreator>

  <DialogCard
    v-if="element"
    :show="showRDialog"
    :cancel="cancel"
    :rebuild="rebuild"
    :card="element"
  >
  </DialogCard>
</template>

<script>
import { useLoadQuotes, UseLoadAuthorsGenre } from "../firebase";
import DialogCreator from "../components/CardCreatePop/index.vue";
import DialogCard from "../components/CardDisplay/index.vue";
import { ref } from "vue";

export default {
  name: "HomeView",
  components: { DialogCreator, CardList, DialogCard },
  data() {
    return {
      showDialog: false,
      showRDialog: false,
      search: "",
      quotes: useLoadQuotes(),
      filter_type: "Filters",
      author: UseLoadAuthorsGenre(),
      quotearray: useLoadQuotes(),
      element: null,
    };
  },
  methods: {
    //cancel pop up && element for random set null
    cancel() {
      this.showDialog = false;
      this.showRDialog = false;
      this.element = null;
    },
    //Update the data 
    rebuild() {
      this.quotes = useLoadQuotes();
    },
    //Sort By Edit Time
    byEdit(a, b) {
      if (a.Edit_Time > b.Edit_Time) {
        return 1;
      } else if (b.Edit_Time > a.Edit_Time) {
        return -1;
      } else {
        return 0;
      }
    },
    //Sort By Create Time
    byCreate(a, b) {
      if (a.Create_Time > b.Create_Time) {
        return 1;
      } else if (b.Create_Time > a.Create_Time) {
        return -1;
      } else {
        return 0;
      }
    },
    //Sort By Author
    byAuthor(a, b) {
      if (a.Author < b.Author) {
        return -1;
      } else if (a.Author > b.Author) {
        return 1;
      }
      return 0;
    },
    //Sort By Genre
    byGenre(a, b) {
      if (a.Genre < b.Genre) {
        return -1;
      } else if (a.Genre > b.Genre) {
        return 1;
      }
      return 0;
    },
    //Random Card && No Card repeat untill all cards are showen 
    selectCard() {
      if (this.quotearray.length === 0 || this.quotearray === null) {
        console.log("rebuild");
        this.quotearray = useLoadQuotes();
      }

      //console.log(this.quotearray)
      let rnum = Math.round(Math.random() * this.quotearray.length - 1);
      if (rnum < 0) {
        rnum++;
      }
      let card = this.quotearray[rnum];
      this.quotearray.splice(rnum, 1);

      if (this.quotearray.length === 0 || this.quotearray === null) {
        console.log("rebuild");
        this.quotearray = useLoadQuotes();
      }
      return card;
    },
  },
  computed: {
    //on search input change activate search filter
    filteredQuotes() {
      return this.quotes.filter((q) => {
        if (
          q.Text.toLowerCase().includes(this.search.toLowerCase()) ||
          q.Author.toLowerCase().includes(this.search.toLowerCase()) ||
          q.Genre.toLowerCase().includes(this.search.toLowerCase())
        )
          return q;
      });
    },
    //on filter select activate filters
    Change() {
      if (this.filter_type === "e_date") {
        this.quotes.sort(this.byEdit);
      } else if (this.filter_type === "c_date") {
        this.quotes.sort(this.byCreate);
      } else if (this.filter_type === "author") {
        this.quotes.sort(this.byAuthor);
      } else if (this.filter_type === "genre") {
        this.quotes.sort(this.byGenre);
      }
    },
  },
};
</script>
