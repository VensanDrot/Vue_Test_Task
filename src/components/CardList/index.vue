<template>
  <div class="card_holder">
    <div class="card_in" v-for="card in quotes" :key="card.id">
      <Card :card="card"></Card>
    </div>
  </div>
</template>

<script>
import "./index.css";
import Card from "../Card/index.vue";

export default {
  name: "CardList",
  props: ["quotes"],
  components: { Card },
};
</script>
