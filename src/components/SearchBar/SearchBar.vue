<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const categories = [
  { name: "smartphones", label: "Smartphones" },
  { name: "laptops", label: "Laptops" },
  { name: "fragrances", label: "Fragrances" },
  { name: "skincare", label: "Skincare" },
  { name: "groceries", label: "Groceries" },
  { name: "home-decoration", label: "Home Decoration" },
  { name: "furniture", label: "Furniture" },
  { name: "tops", label: "Tops" },
  { name: "womens-dresses", label: "Women's Dresses" },
  { name: "womens-shoes", label: "Women's Shoes" },
  { name: "mens-shirts", label: "Men's Shirts" },
  { name: "mens-shoes", label: "Men's Shoes" },
  { name: "mens-watches", label: "Men's Watches" },
  { name: "womens-watches", label: "Women's Watches" },
  { name: "womens-bags", label: "Women's Bags" },
  { name: "womens-jewellery", label: "Women's Jewellery" },
  { name: "sunglasses", label: "Sunglasses" },
  { name: "automotive", label: "Automotive" },
  { name: "motorcycle", label: "Motorcycle" },
  { name: "lighting", label: "Lighting" }
];

const router = useRouter();
const inputRef = ref('');
const selectRef = ref('');

const onClickHandler = () => {
  const category = selectRef.value;
  const query = inputRef.value;
  router.push({ path: '/search', query: { q: query, category: category } });
};
</script>


<template>
  <div class="search-container mt-4 mb-4">
    <select ref="selectRef" class="category-select w-[100px] md:w-max lg:w-max">
      <option selected value="">Select category</option>
      <option v-for="category of categories" :value="category.name">{{ category.label }}</option>
    </select>
    <input ref="inputRef" class="search-input" placeholder="Enter your search" type="text">
    <button class="search-button" @click="onClickHandler">Search</button>
  </div>
</template>


<style scoped> .search-container {
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 20px;
   background-color: #dddddd9d;
   border-radius: 8px;
 }

 .category-select,
 .search-input {
   padding: 10px;
   font-size: 16px;
   border: none;
   border-radius: 5px;
   margin-right: 10px;
 }

 .category-select {
   background-color: #fff;
   color: #333;
 }

 .search-input {
   flex: 1;
   color: #333;
   outline: none;
 }

 .search-button {
   padding: 10px 20px;
   background-color: #4CAF50;
   color: white;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   transition: background-color 0.3s ease;
 }

 .search-button:hover {
   background-color: #45a049;
 }

 /* Responsive Styles */
 @media (max-width: 768px) {
   .search-container {
     flex-direction: column;
     align-items: stretch;
   }

   .category-select,
   .search-input,
   .search-button {
     width: 100%;
     margin: 0 0 10px 0;
   }
 }

 @media (max-width: 480px) {
   .search-container {
     padding: 10px;
   }

   .category-select,
   .search-input,
   .search-button {
     font-size: 14px;
     padding: 8px;
   }
 }
</style>
