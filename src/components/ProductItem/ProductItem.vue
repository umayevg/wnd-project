<template>
  <div class="card">
    <div>
      <img :src="product.thumbnail" alt="image of product" class="cursor-pointer card-image"
           @click="router.push('/product/' + product.id)"/>
    </div>

    <div class="card-body">
      <h2 :title="product.title" class="cursor-pointer hover:underline inline card-body__title"
          @click="router.push('/product/' + product.id)">
        {{ product.title }}
      </h2>
      <div class="card-body__content">
        <span>
          {{ product.user?.firstName }} {{ product.user?.lastName }}
        </span>
      </div>
      <div class="flex mt-2 justify-between items-center">
        <span class="font-bold text-[#333] text-lg">
          ${{ product.price.toFixed(2) }}
        </span>
        <span>
          <el-button :icon="ShoppingCart" class="bg-[#67c23a]" type="success"
                     @click="store.addProductToCart(product.id)"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ShoppingCart} from '@element-plus/icons-vue'
import {IProduct} from '../../types/product'
import {useProductStore} from '../../store/product'
import {useRouter} from "vue-router"

const store = useProductStore()
const router = useRouter()

defineProps({
  product: {
    type: Object as () => IProduct,
    required: true,
  }
})
</script>

<style scoped>
.card {
  @apply border hover:border-indigo-600 rounded-lg shadow-md transition ease-in-out delay-100 duration-100;
}

.card-image {
  @apply rounded-lg w-[100%] h-[150px];
}

.card-body {
  @apply p-4 border-t border-t-gray-300;
}

.card-body__title {
  @apply lg:text-xl text-ellipsis whitespace-nowrap overflow-clip;
}

.card-body__content {
  @apply mt-3 text-gray-500 text-sm;
}</style>
