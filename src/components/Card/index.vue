<script setup>
import './index.css'
</script>

<template>
    <div class="card_container">
        <form class="content" key={{card.id}}>
            <label>The quote:</label>
            <textarea name="Text" class="text_area" readonly>{{card.Text}}
        </textarea>
            <label>Author:</label>
            <textarea name="Author" class="text_area" readonly>{{card.Author}}
        </textarea>
            <label>Genre:</label>
            <textarea name="Genre" class="text_area" readonly>{{card.Genre}}
        </textarea>
            <label>Id:</label>
            <textarea name="Id" class="text_area_fixed" readonly>{{card.id}}
        </textarea>
            <label>Creation time:</label>
            <textarea name="Create_Time" class="text_area_fixed" readonly>{{card.Create_Time}}
        </textarea>
            <label>Last edit:</label>
            <textarea name="Edit_Time" class="text_area_fixed" readonly>{{card.Edit_Time}}
        </textarea>
            <div class="button_container">
                <button class="btn" type="button" @click="deleteQuote(card.id)">Delete</button>
                <button class="btn" type="button" @click="">Update</button>
            </div>
        </form>

    </div>
</template>


<script>
import { deleteQuote } from '../../firebase'
import { ref } from 'vue'



export default {
    name: 'card',
    props: ['card'],
}





</script>