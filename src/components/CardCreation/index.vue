<script setup>
import '../Card/index.vue'
</script>

<template>
    <div class="card_container">
        <form class="content">
        <label>The quote:</label>
        <textarea name="Text" class="text_area text_area_active" v-model="quote.Text"></textarea>
        <label class="error">{{error_text}}</label>
        <label>Author:</label>
        <textarea name="Author" class="text_area text_area_active" v-model="quote.Author"></textarea>
        <label class="error">{{error_author}}</label>
        <label>Genre:</label>
        <textarea name="Genre" class="text_area text_area_active" v-model="quote.Genre"></textarea>
        <label class="error">{{error_genre}}</label>
        <div class="button_container">
        <button type="button" class="btn" @click="cancel">Close</button>
        <button type="button"  class="btn" @click="getData()">Create</button>
        </div>
        </form>
        
    </div>
</template>


<script>
import { createQuote } from '../../firebase'
export default {
    name: 'CardCreation',
    props: ["cancel"],
    data() {
        return {
        quote: {
            Text: null,
            Author: null,
            Genre: null,
            Create_Time: null,
            Edit_Time: null,
        },
        error_text:null,
        error_author: null,
        error_genre: null,
        }
    },
    methods: {
        getData() {
        this.error_text = null;
        this.error_author = null;
        this.error_genre = null;
            
           if (!this.quote.Text) {
              return this.error_text = "Text cant be empty";
           }
           if (!this.quote.Author ) {
              return this.error_author = "Author cant be empty";
           }
           if (/\d/.test(this.quote.Author)) {
            return this.error_author = "Author line cant contain digits"
           }
           if (!this.quote.Genre) {
              return this.error_genre = "Genre cant be empty";
           }
           if (/\d/.test(this.quote.Genre)) {
            return this.error_genre = "Genre line cant contain digits"
           }
           const current = new Date(); 
           var hourse = current.getHours();
           hourse = ("0" + hourse).slice(-2);
           this.quote.Create_Time = `${current.getMinutes()}:${hourse} ${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
           this.quote.Edit_Time = this.quote.Create_Time;
           if (this.quote.Create_Time !== null && this.quote.Edit_Time !== null) {
           createQuote(this.quote) 
            this.quote.Author = null;
            this.quote.Text = null;
            this.quote.Genre = null;
        }
        }
    }
}


</script>