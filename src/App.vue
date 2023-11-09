<script lang="ts" setup>
import Header from "./components/Header/Header.vue";
import { useProductStore } from "./store/product.ts";
import { onBeforeMount } from "vue";

const store = useProductStore()

onBeforeMount(() => {
  store.loadCartFromLocalStorage()
  store.generateUsersForStore()
})


</script>

<template>
  <Header></Header>
  <div class="my-container">
    <router-view />
  </div>
</template>

<style scoped>
.my-container {
  max-width: 1200px;
  @apply mx-auto px-4;
}
</style>
