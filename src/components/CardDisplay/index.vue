<template>
  <div v-show="show" class="overlay_create">
    <div class="dialog_create">
      <card :card="this.card" :cancel="cancel" :rebuild="rebuild"></card>
    </div>
  </div>
</template>

<script>
import "../CardCreatePop/index.css";
import Card from "../Card/index.vue";
export default {
  props: ["show", "cancel", "card", "rebuild"],
  components: { Card },
};
</script>
