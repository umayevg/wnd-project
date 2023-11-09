<script lang="ts" setup>
import {ref, watch} from 'vue'
import {useProductStore} from '../../store/product.ts'
import ProductsList from '../ProductsList/ProductsList.vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const store = useProductStore()
const results = ref([])

watch(
    () => [route.query.q, route.query.category],
    async ([newValueQ, newValueCategory]) => {
      try {
        // @ts-ignore
        results.value = await store.searchProducts(newValueQ, newValueCategory)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    {immediate: true, deep: true}
);
</script>

<template>
  <div>
    <ProductsList :productsProp="results"/>
  </div>
</template>

<style scoped></style>
