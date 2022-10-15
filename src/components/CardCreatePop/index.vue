<template>


    <div v-show="show" class="overlay_create" >

        <div class="dialog_create">
            <CreateCard  :cancel="cancel"></CreateCard>
        </div>

    </div>
</template>
  
<script>
import './index.css'
import CreateCard from '../CardCreation/index.vue'
export default {
    props: ["show", "cancel"],
    components: {CreateCard}
}
</script>