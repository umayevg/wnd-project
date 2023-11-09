<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProductStore } from '../../store/product.ts';
import ProductsList from '../ProductsList/ProductsList.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useProductStore();
const results = ref([]);

watch(
  () => [route.query.q, route.query.category],
  async ([newQ, newCategory]) => {
    try {
      // @ts-ignore
      results.value = await store.searchProducts(newQ, newCategory);
      console.log(results.value); // Log the fetched data inside the watch callback
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div>
    <ProductsList :productsProp="results" />
  </div>
</template>

<style scoped></style>
