// stores/theme.js
import { defineStore } from "pinia"
import { ref, watch } from "vue"
import axiosClient from "../axiosClient";

export const useProductStore = defineStore("product", () => {
    const products = ref({});
    const loading = ref(false);
    const errors = ref({});

    const fetchAllProductsIds = async () => {
        try {
            loading.value = true;
            const response = await axiosClient.get('/products');
            products.value = response.data;
        } catch (e) {
            console.error(e)
        } finally {
            loading.value = false;
        }

    }
    return { products, loading, errors, fetchAllProductsIds }
})
