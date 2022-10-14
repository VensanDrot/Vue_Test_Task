<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from "./components/Nav/index.vue"
import HomeView from "./views/HomeView.vue"

</script>

<template>
  <Nav> </Nav>

  <div class="container">
    <RouterView />
  </div>
</template>

<!--<RouterLink to="/">Home</RouterLink>-->