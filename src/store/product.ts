import {defineStore} from 'pinia';
import axios from 'axios';
import {pushUsersInStore} from "../helpers/random-user.ts";
import {IProduct} from "../types/product.ts";
import {User} from "../types/user.ts";

export const useProductStore = defineStore('product', {
        state: () => ({
            users: [] as User[],
            totalItems: 0,
            totalAmount: 0,
            productsInCart: [] as IProduct[]
        }),

        actions: {
            async generateUsersForStore() {
                this.$state.users = await pushUsersInStore()
            },
            async fetchProducts() {
                try {
                    const response = await axios.get('https://dummyjson.com/products')
                    const {products}: { products: IProduct[] } = response.data


                    products.forEach(product => {
                        const randomUser = this.$state.users[Math.floor(Math.random() * 29)]
                        product.count = 0
                        product.user = randomUser
                    });

                    return products
                } catch (error) {
                    console.error('Fetching products error: ', error)
                }
            },

            // Loading data from localStorage
            loadCartFromLocalStorage() {
                const storedProductsInCart = localStorage.getItem('productsInCart');
                const storedTotalItems = localStorage.getItem('totalItems');
                const storedTotalAmount = localStorage.getItem('totalAmount');

                if (storedProductsInCart) {
                    this.$state.productsInCart = JSON.parse(storedProductsInCart);
                }

                if (storedTotalItems) {
                    this.$state.totalItems = parseInt(storedTotalItems);
                }

                if (storedTotalAmount) {
                    this.$state.totalAmount = parseFloat(storedTotalAmount);
                }
            },

            // Adding product in cart
            async addProductToCart(id: number) {
                try {
                    const response = await axios.get<IProduct>(`https://dummyjson.com/products/${id}`)
                    const product = response.data
                    const foundProductIndex = this.$state.productsInCart.findIndex(p => p.id === product.id)
                    if (foundProductIndex !== -1) {
                        this.$state.productsInCart[foundProductIndex].count++
                    } else {
                        product.count = 1
                        this.$state.productsInCart.push(product)
                    }

                    this.$state.totalItems++
                    this.$state.totalAmount += product.price

                    // Updating localStorage after adding
                    localStorage.setItem('productsInCart', JSON.stringify(this.$state.productsInCart));
                    localStorage.setItem('totalItems', this.$state.totalItems.toString());
                    localStorage.setItem('totalAmount', this.$state.totalAmount.toString());
                } catch (error) {
                    console.error('Adding product in cart error: ', error)
                }
            },

            // Removing product from cart
            removeFromCart(id: number) {
                const findProductIndex = this.$state.productsInCart.findIndex(product => product.id === id);
                if (findProductIndex !== -1) {
                    const foundProduct = this.$state.productsInCart[findProductIndex];

                    if (foundProduct.count > 1) {
                        foundProduct.count--;
                    } else {
                        this.$state.productsInCart.splice(findProductIndex, 1);
                    }

                    this.$state.totalItems--;
                    this.$state.totalAmount -= foundProduct.price;

                    // Updating localStorage after removing
                    localStorage.setItem('productsInCart', JSON.stringify(this.$state.productsInCart));
                    localStorage.setItem('totalItems', this.$state.totalItems.toString());
                    localStorage.setItem('totalAmount', this.$state.totalAmount.toString());
                }
            },

            // Searching products
            async searchProducts(searchTerm: string, category: string, rating: number, price: number) {
                try {
                    const response = await axios.get<IProduct[]>(`https://dummyjson.com/products/search?q=${searchTerm}&category=${category}&rating=${rating}&price=${price}`);
                    const data = response.data;

                    return data.products;
                } catch (error) {
                    console.error('Error fetching products:', error);
                    throw error; // Rethrow the error to propagate it to the calling code
                }
            },
        },
    })
;
