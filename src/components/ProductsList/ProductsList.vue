<script lang="ts" setup>
import {useProductStore} from '../../store/product';
import ProductItem from '../ProductItem/ProductItem.vue';
import SearchBar from "../SearchBar/SearchBar.vue";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {IProduct} from "../../types/product.ts";

const store = useProductStore()
const route = useRoute()
const products = ref<IProduct[] | undefined>([]);
defineProps({
  productsProp: Object as () => IProduct[]
})

onMounted(async () => {
  products.value = await store.fetchProducts();

});

</script>


<template>
  <SearchBar/>
  <div v-if="products && products.length > 0" class="grid">
    <ProductItem v-for="productProp in productsProp" v-if="route.fullPath !== '/'" :key="productProp.id" :product="productProp"/>
    <ProductItem v-for="product in products" v-else :key="product.title" :product="product"/>
  </div>
  <div v-else class="text-center">
    Loading...
  </div>
</template>


<style scoped>

.grid {
  @apply grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6;
}

</style>
