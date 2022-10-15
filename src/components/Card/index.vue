<script setup>
import './index.css'
</script>

<template>
    <div class="card_container">
        <form class="content">
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
        <label>Edition time:</label>
        <textarea name="Edit_Time" class="text_area_fixed" readonly>{{card.Edit_Time}}
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