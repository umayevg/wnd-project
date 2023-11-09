<template>
  <div v-if="product" class="bg-gray-100 rounded-2xl p-4 h-[100vh] text-[#333]">
    <div class="container mx-auto">
      <!-- Two columns on large screens -->
      <div class="lg:flex">
        <div class="lg:w-1/2 p-4">
          <h1 class="text-3xl mb-4">{{ product.title }}</h1>
          <el-carousel :interval="4000" arrow="always" height="200px" type="card">
            <el-carousel-item v-for="image in product.images" :key="image">
              <img :src="image" alt="product images">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="lg:w-1/2 p-4">
          <div>
            <div>
              <p class="mb-4 text-3xl font-bold">

                <span v-if="!product.discountPercentage">${{ product.price }}</span>
                <span v-else>
                  <del class="text-lg">${{ product.price }}</del>
                  <span> ${{ calculateDiscountedPrice() }}<sup
                      class="relative top-[-20px] text-sm bg-red-500 text-white p-1 rounded-[10px]">-{{
                      product.discountPercentage
                    }}%</sup></span>
                </span>
              </p>
              <p class="bg-green-500 inline p-1 pl-2 pr-2 text-white rounded-[10px] mb-4 text-xl">{{
                  product.user?.phone
                }}</p>
            </div>

            <div>
              <p class="mb-2 mt-4 text-xl font-bold">{{ product.user?.firstName }} {{ product.user?.lastName }}</p>
              <p class="mb-2 text-lg">{{ product.user?.email }}</p>
            </div>

            <div class="flex justify-between items-center">
              <div>
                <p>{{ product.user?.address?.address }}</p>
                <p>{{ product.user?.address?.city }}, {{ product.user?.address?.state }}
                  {{ product.user?.address?.postalCode }}</p>
              </div>
              <div>
                <button :disabled="isLoading" @click="handleBuyButtonClick(product.id)"
                        class=" mt-4 p-2 pl-4 pr-4 rounded-xl text-white bg-green-700">
                  {{ isLoading ? 'Processing...' : 'Add' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-divider/>
    <div class="mt-6">
      <div class="mb-4"><strong>Brand</strong>: {{ product.brand }}</div>
      <div class="mb-4"><strong>Rating</strong>: {{ product.rating }} / 5</div>
      <div class="mb-4"><strong>Stock</strong>: {{ product.stock }}</div>
      <div class="mb-4"><strong>Category</strong>: {{ product.category }}</div>
      <el-divider/>
      <div class="mb-2 mt-10"><strong>Description</strong></div>
      <p>{{ product.description }}</p>
    </div>
  </div>
  <div v-else class="text-center">
    Loading...
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import axios from "axios";
import {onMounted, ref} from "vue";
import {IProduct} from "../../types/product.ts";
import {getRandomUser} from "../../helpers/random-user.ts";
import {useProductStore} from "../../store/product.ts";

const router = useRouter();
const productId = router.currentRoute.value.params.id
const product = ref<IProduct | null>(null)
const isLoading = ref(false)
const store = useProductStore()

defineProps({
  product: Object as () => IProduct,

});

const calculateDiscountedPrice = () => {
  if (product && product.value && product.value.price !== null && product.value.discountPercentage !== null) {
    const price = product.value.price
    const discountPercentage = product.value.discountPercentage
    const discountedPrice = price - (price * (discountPercentage / 100));
    return Number(discountedPrice.toFixed(2));
  }
}

function handleBuyButtonClick(id: number) {
  isLoading.value = true
  setTimeout(() => {
    store.addProductToCart(id)
    isLoading.value = false
  }, 1000)
}


onMounted(async () => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${productId}`);
    response.data.user = await getRandomUser()
    product.value = response.data
  } catch (error) {
    console.error(error)
  }
});


</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.el-carousel__item img {
  color: #475669;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: transparent;
  border: 2px solid #ddd;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: transparent;
  border: 2px solid #ddd;
}

button[disabled] {
  opacity: .7;
}
</style>
