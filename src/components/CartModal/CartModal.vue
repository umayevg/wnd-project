<script lang="ts" setup>
import {defineEmits, ref} from 'vue';
import {onClickOutside} from '@vueuse/core';
import {useProductStore} from '../../store/product.ts';

const store = useProductStore();
const products = store.productsInCart

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['modal-close']);
const target = ref(null);

onClickOutside(target, () => emit('modal-close'));
</script>


<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div ref="target" class="modal-container">
        <div v-if="products && products.length > 0" class="modal-body">
          <table class="w-full">
            <thead>
            <tr>
              <th>title</th>
              <th>price</th>
              <th>actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in products" :key="product.id" class="flex-wrap">
              <td>{{ product.title }}</td>
              <td class="text-center">{{ product.count }}x {{ product.price.toFixed(2) }}</td>
              <td class="text-center">
                <button class="actions p-4 border bg-red-600 rounded-[4px] text-white"
                        @click="store.removeFromCart(product.id)">-
                </button>
                <button class="actions p-4 border bg-green-700 rounded-[4px] text-white"
                        @click="store.addProductToCart(product.id)">+
                </button>
              </td>
            </tr>

            <tr class="border-t border-indigo-600 font-bold">
              <td>Total: ${{ store.totalAmount.toFixed(2) }}</td>
            </tr>
            </tbody>
          </table>
          <div>
            <button class="bg-green-500 text-white mt-4 p-3 rounded-md hover:opacity-[.8]">
              Checkout
            </button>
          </div>
          <slot name="content"></slot>
        </div>
        <div v-else>
          No products in the cart.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button.actions {
  margin-right: 5px;
  padding: 2px 10px;
  cursor: pointer;
}

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  padding: 10px;
}


.modal-container {
  color: black;
  width: 100%;
  overflow-y: auto;
  max-height: 400px;
  max-width: 900px;
  margin-top: 10%;
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>
