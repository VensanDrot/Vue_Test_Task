

<template>

    <div class="card_container">

        <form class="content" key={{card.id}}>

            <label>The quote:</label>
            <textarea 
            class="text_area" 
            :class="!validated && 'text_area_active'" 
            v-model="quote.Text"
            :disabled="validated ? '' : disabled"
            >
            </textarea>
            <label class="error" v-if="!validated">{{error_text}}</label>
            <label>Author:</label>
            <textarea 
            class="text_area" 
            :class="!validated && 'text_area_active'" 
            v-model="quote.Author" 
            :disabled="validated ? '' : disabled"
            >
            </textarea>

            <label class="error" v-if="!validated">{{error_author}}</label>
            <label>Genre:</label>
            <textarea 
            class="text_area" 
            :class="!validated && 'text_area_active'" 
            v-model="quote.Genre" 
            :disabled="validated ? '' : disabled"
            >
            </textarea>

            <label v-if="!validated">{{error_genre}}</label>
            <label v-if="validated">Id:</label>
            <textarea 
            class="text_area_fixed" 
            v-model="id" 
            v-if="validated" 
            readonly>
            </textarea>

            <label v-if="validated">Creation time:</label>
            <textarea 
            class="text_area_fixed" 
            v-model="quote.Create_Time" 
            v-if="validated" 
            readonly>
            </textarea>

            <label v-if="validated">Last edit:</label>
            <textarea 
            class="text_area_fixed" 
            v-model="quote.Edit_Time" 
            v-if="validated" 
            readonly>
            </textarea>

            <div class="button_container">
                <button class="btn" type="button" @click="showDialog = true" v-if="validated">Delete</button>
                <button class="btn btn-primary" type="button" @click="edit(id)" v-if="!validated">Submit</button>
                <button class="btn" type="button" @click="validated=!validated , save(card) ">Update</button>

            </div>
        </form>

    </div>
    <Dialog :show="showDialog" :cancel="cancel" :confirm="confirm" :id="card.id" title="Delete a quote?"
        description="Are you sure you want to delete this quote?">
    </Dialog>

</template>




<script>
import { deleteQuote, updateQuote } from '../../firebase'
import Dialog from '../DelDiologe/index.vue'
import './index.css'
import { ref } from 'vue'



export default {
    name: 'card',
    props: ['card'],
    components: { Dialog },

    data: function () {
        return {
            quote: {
                Text: this.card.Text,
                Author: this.card.Author,
                Genre: this.card.Genre,
                Create_Time: this.card.Create_Time,
                Edit_Time: this.card.Edit_Time,
            },
            id: this.card.id,
            showDialog: false,
            validated: true,
            error_text: null,
            error_author: null,
            error_genre: null,
        }
    },
    methods: {
        cancel() {
            this.showDialog = false;
        },
        confirm(id) {
            deleteQuote(id)
            this.showDialog = false;
        },
        edit(id) {

            this.error_text = null;
            this.error_author = null;
            this.error_genre = null;

            if (!this.quote.Text) {
                return this.error_text = "Text cant be empty";
            }
            if (!this.quote.Author) {
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
            this.quote.Edit_Time = `${hourse}:${current.getMinutes()} ${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
            updateQuote(this.id, this.quote);
            this.validated=!this.validated

        },
        save(card) {
            this.id = card.id;
            this.quote.Author = card.Author;
            this.quote.Text = card.Text;
            this.quote.Genre = card.Genre;
            this.quote.Create_Time = card.Create_Time;
            this.quote.Edit_Time = card.Edit_Time;
            console.log(this.quote);
        }
    },

}

</script>