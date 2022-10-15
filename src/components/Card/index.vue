<script setup>
import './index.css'
</script>

<template>
    <div class="card_container">
        <form class="content">
        <textarea name="Text" class="text_area" readonly>{{card.Text}}
        </textarea>
        <textarea name="Author" class="text_area" readonly>{{card.Author}}
        </textarea>
        <textarea name="Genre" class="text_area" readonly>{{card.Genre}}
        </textarea>
        <textarea name="Id" class="text_area" readonly>{{card.Id}}
        </textarea>
        <textarea name="Create_Time" class="text_area" readonly>{{card.Create_Time}}
        </textarea>
        <textarea name="Edit_Time" class="text_area" readonly>{{card.Edit_Time}}
        </textarea>
        </form>

        <!--
        <p>Quote: {{card.Text}}</p>
        <p>Author: {{card.Author}}</p>
        <p>Genre: {{card.Genre}}</p>
        <p>Id: {{card.Id}}</p>
        <p>Creation time: {{card.Create_Time}}</p>
        <p>Edit time: {{card.Edit_Time}}</p>
        -->
    </div>
</template>


<script>
export default {
    name: 'card',
    props: ['card']
}
</script>