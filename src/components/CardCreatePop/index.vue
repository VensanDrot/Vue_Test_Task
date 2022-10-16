<template>
  <div v-show="show" class="overlay_create">
    <div class="dialog_create">
      <CreateCard :cancel="cancel" :rebuild="rebuild"></CreateCard>
    </div>
  </div>
</template>

<script>
import "./index.css";
import CreateCard from "../CardCreation/index.vue";
export default {
  props: ["show", "cancel", "rebuild"],
  components: { CreateCard },
};
</script>
