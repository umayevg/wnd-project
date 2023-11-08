import SearchPage from "../components/SearchPage/SearchPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ProductsList from "../components/ProductsList/ProductsList.vue";
import ProductDetail from "../components/ProductDetail/ProductDetail.vue";

const routes = [
    {path: '/', component: ProductsList},
    {path: '/search', component: SearchPage},
    {path: '/product/:id', component: ProductDetail},
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})
