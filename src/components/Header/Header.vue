<script setup lang="ts">
import {ShoppingCart} from '@element-plus/icons-vue';
import {useProductStore} from '../../store/product';
import CartModal from "../CartModal/CartModal.vue";
import {ref} from "vue";

const isModalOpened = ref(false);

const openModal = () => {
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};

const submitHandler = () => {
  //here you do whatever
}
const store = useProductStore()

</script>

<template>
  <div class="bg-[#292929] text-white">
    <div class="flex container mx-auto h-12 mb-12 sticky items-center justify-end">
      <router-link active-class="active" class=" mr-4 hover:text-indigo-500 transition" to="/">Home</router-link>
      <router-link active-class="active" class=" mr-4 hover:text-indigo-500 transition" to="/search">Search</router-link>
      <div class="mr-4 transition cursor-pointer" @click="openModal">
        <el-icon size="24" class="mt-1">
          <ShoppingCart class="hover:text-indigo-500"/>
        </el-icon>
        <span
            class="bg-green-600 top-[4px] right-[-1px] border text-sm w-5 h-5 text-center rounded-full absolute">{{
            store.totalItems
          }}</span>
      </div>
      <CartModal :storeData="store" :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler"
                 name="first-modal"/>
    </div>
  </div>
</template>

<style scoped>
.active {
  cursor: default;
  color: #67c23a;
  text-decoration: underline;
}
</style>
