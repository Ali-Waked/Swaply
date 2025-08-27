// stores/auth.js
import { defineStore } from "pinia";
import axiosClient from "../../axiosClient";
import { useRouter } from "vue-router";
import axios from "axios";
import { computed, reactive, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    // state: () => ({
    //     user: {},
    //     loading: false,
    //     errors: "",
    //     // router: useRouter(),
    //     redirect: false,
    //     isAuth: false,
    // }),
    const user = ref({});
    const loading = ref(false);
    const errors = ref({});
    const redirect = ref(false);
    const isAuth = ref(false);
    const isCustomer = computed(() => {
        return user.value.role == 'customer';
    })
    const isMerchant = computed(() => {
        return user.value.role == 'merchant';
    })

    const login = async (credentials) => {
        loading.value = true;
        await getCsrfToken();
        await axiosClient
            .post("/login", credentials)
            .then((response) => {
                if (response.status === 200) {
                    isAuth.value = true;
                    redirect.value = true;
                }
            })
            .catch((e) => {
                console.error(e);
                errors.value = e.response.data.errors;
            })
            .finally(() => {
                loading.value = false;
            });
    }
    const register = async (email, password, name) => {
        try {
            const response = await axios.post("/api/register", {
                email,
                password,
                name,
            });
            user.value = response.data.user;
            // token.value = response.data.token;
            errors.value = null;
            // Store the token in localStorage or cookies if needed
            // localStorage.setItem("token", this.token);
        } catch (error) {
            errors.value = error.response.data.errors;
        }
    }
    // async forgotPassword(email) {
    //     try {
    //         await axios.post("/api/forgot-password", { email });
    //         // Handle success (e.g., show a message to the user)
    //     } catch (error) {
    //         this.errors = error.response.data.errors;
    //     }
    // },
    // async resetPassword(token, password) {
    //     try {
    //         await axios.post("/api/reset-password", { token, password });
    //         // Handle success (e.g., redirect to login page)
    //     } catch (error) {
    //         this.errors = error.response.data.errors;
    //     }
    // },
    const logout = async () => {
        await getCsrfToken();
        await axiosClient.post("/logout").then((response) => {
            if (response.status === 204) {
                user.value = null;
                isAuth.value = false;
                redirect.value = true;
                loading.value = false;
            }
        });
    }
    const getCsrfToken = async () => {
        await axios
            .get("http://localhost/sanctum/csrf-cookie", {
                withCredentials: true,
            })
            .then((response) => { });
    }
    const loginWith = async (driver) => {
        await getCsrfToken();
        axiosClient
            .get(`/api/auth/${driver}/redirect`)
            .then((response) => {
                if (response.status === 200) {
                    isAuth.value = true;
                    redirect.value = true;
                }
            })
            .catch((e) => {
                console.error("error", e);
            });
    }
    const checkAuth = async () => {
        loading.value = true;
        try {
            await getCsrfToken();
            const response = await axiosClient.get("/auth/user");
            if (response.status === 200) {
                isAuth.value = true;
                user.value = response.data; // Assuming user data is returned
            }
        } catch (error) {
            isAuth.value = false; // If verification fails, set isAuth to false
            user.value = null;
        } finally {
            loading.value = false;
        }
    }
    return { user, loading, errors, redirect, isAuth, isCustomer, isMerchant, login, checkAuth, loginWith, logout, register }
});
