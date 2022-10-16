<template>


  <div v-show="show" class="overlay">

    <div class="dialog">



      <div class="dialog__content">
        <h2 class="dialog__title" v-text="title"></h2>
        <p class="dialog__description" v-text="description"></p>
      </div>

      <hr />

      <div class="dialog__footer">
        <button @click="cancel" class="btn">Cancel</button>
        <button @click="confirm(id)" class="btn btn-primary">Yes, delete it</button>
      </div>

    </div>

  </div>
</template>
  
<script>
import './index.css'
export default {
  props: ["show", "title", "description", "cancel", "confirm", "id"],
}
</script>