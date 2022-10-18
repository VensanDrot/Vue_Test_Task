<script setup>
import CardList from "../components/CardList/index.vue";
import "./index.css";
import AuthorDisplay from "../components/AuthorDisplay/index.vue";
</script>


<template>
  <div class="search">
      <div class="flexer">
      <input type="text" v-model="search" class="search_input" placeholder="Search" />
      <button type="button" class="btn" @click="this.search = ''">
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

    <div class="flexer">
      <select class="selector" v-model="range_type" :onchange="Range">
        <option value="Filters" selected disabled>Range setting</option>
        <option value="NewOld">From Min To Max</option>
        <option value="OldNew">From Max to Min</option>
      </select>
      <button style="align-self: center" type="button" @click="(showRDialog = true), (element = selectCard())"
        class="btn">
        Сhance card
      </button>
    </div>
    <button class="btn" style="align-self: center" @click="showAuthor=true">show authors</button>
  </div>

  <div class="image">
    <img src="../assets/load.gif" :hidden="quotes" />
  </div>

  <CardList :quotes="filteredQuotes" />

  <DialogCreator :show="showDialog" :cancel="cancel" :rebuild="rebuild">
  </DialogCreator>

  <DialogCard v-if="element" :show="showRDialog" :cancel="cancel" :rebuild="rebuild" :card="element">
  </DialogCard>

  <AuthorDisplay :show="showAuthor" :cancel="cancel" :author="author_reducer()"></AuthorDisplay>
</template>

<script>
import { computed } from "vue";
import { useLoadQuotes, UseLoadAuthorsGenre } from "../firebase";
import DialogCreator from "../components/CardCreatePop/index.vue";
import DialogCard from "../components/CardDisplay/index.vue";
import DisplayAuthor from "../components/AuthorDisplay/index.vue";

export default {
  name: "HomeView",
  components: { DialogCreator, CardList, DialogCard, DisplayAuthor },
  data() {
    return {
      showDialog: false,
      showRDialog: false,
      showAuthor: false,
      search: "",
      quotes: useLoadQuotes(),
      filter_type: "Filters",
      range_type: "Filters",
      author: UseLoadAuthorsGenre(),
      quotearray: useLoadQuotes(),
      element: null,
      order: 1,
    };
  },
  methods: {
    //cancel pop up && element for random set null
    cancel() {
      this.showAuthor = false;
      this.showDialog = false;
      this.showRDialog = false;
      this.element = null;
    },
    //Update the data 
    rebuild() {
      this.quotes = useLoadQuotes();
    },
    author_reducer() {

      const filteredArr = this.author.reduce((acc, current) => {
        const x = acc.find(item => item.author === current.author);
        const index = acc.indexOf(x)
        if (!x) {
          return acc.concat([current]);
        } else {
          let set = acc[index].genre.concat(` ${current.genre}`);
          let result = new Set(set.split(' '))
          result = Array.from(result).join(' ');
          acc[index] = new Proxy({
            author: acc[index].author,
            genre: result
          },{ })
          return acc;
        }
      }, []);
       return filteredArr

    },
    //Sort By Edit Time
    byEdit(a, b) {

      if (a.Edit_Time.split(' ')[1] > b.Edit_Time.split(' ')[1]) {
        return 1 * this.order;
      } else if (b.Edit_Time.split(' ')[1] > a.Edit_Time.split(' ')[1]) {
        return -1 * this.order;
      }
      if (a.Edit_Time.split(' ')[0] > b.Edit_Time.split(' ')[0]) {
        return 1 * this.order;
      } else if (b.Edit_Time.split(' ')[0] > a.Edit_Time.split(' ')[0]) {
        return -1 * this.order;
      } else {
        return 0;
      }
    },
    //Sort By Create Time
    byCreate(a, b) {
      if (a.Create_Time.split(' ')[1] > b.Create_Time.split(' ')[1]) {
        return 1 * this.order;
      } else if (b.Create_Time.split(' ')[1] > a.Create_Time.split(' ')[1]) {
        return -1 * this.order;
      }
      if (a.Create_Time.split(' ')[0] > b.Create_Time.split(' ')[0]) {
        return 1;
      } else if (b.Create_Time.split(' ')[0] > a.Create_Time.split(' ')[0]) {
        return -1 * this.order;
      } else {
        return 0 * this.order;
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
    Range() {
      if (this.range_type === "NewOld") {
        this.order = 1;
      } else if (this.range_type === "OldNew") {
        this.order = -1;
      }
      else {
        this.order = 1;
      }
    }
  },
};
</script>
