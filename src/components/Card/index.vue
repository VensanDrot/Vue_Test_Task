<script setup>
import './index.css'
</script>

<template>
    <div class="card_container">
        
        <p>Quote: {{card.Text}}</p>
        <p>Author: {{card.Author}}</p>
        <p>Genre: {{card.Genre}}</p>
        <p>Id: {{card.Id}}</p>
        <p>Creation time: {{card.Create_Time}}</p>
        <p>Edit time: {{card.Edit_Time}}</p>
    </div>
</template>


<script>
    export default {
        name: 'card',
        props: ['card']
    }
</script>