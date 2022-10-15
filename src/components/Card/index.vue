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
                <button class="btn" type="button" @click="showDialog = true">Delete</button>
                <button class="btn" type="button" @click="">Update</button>
            </div>
        </form>

    </div>
    <Dialog 
    :show="showDialog"
    :cancel="cancel"
    :confirm="confirm"
    :id = "card.id"
    title="Delete a quote?"
    description="Are you sure you want to delete this quote?">
    </Dialog>
</template>




<script>
import { deleteQuote } from '../../firebase'
import Dialog from '../DelDiologe/index.vue'
import { ref } from 'vue'



export default {
    name: 'card',
    props: ['card'],
    components: { Dialog },
    data() {
    return {
      showDialog: false,
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
}
}

</script>