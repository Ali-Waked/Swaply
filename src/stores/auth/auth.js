// stores/auth.js
import { defineStore } from "pinia";
import axiosClient from "../../axiosClient";
import { useRouter } from "vue-router";
import axios from "axios";
import { computed, inject, reactive, ref } from "vue";

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
  const backErrors = ref({});
  const redirect = ref(false);
  const isAuth = ref(false);
  const isCheckedAuth = ref(false);
  const emitter = inject('emitter');
  const forgotMessage = ref(null);
  const router = useRouter();
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
          user.value = response.data.user;
          console.log(response);
          isCheckedAuth.value = true;
          console.log('admin role', user.value.role == 'admin')
          if (user.value.role == 'admin') {
            router.push({ name: 'dashboard' });
            return;
          }
          // a fix ,i guess?!
          // router.push({ name: 'pricing' });
          // don't forget to put the nav bar in the pricing tag with logout and change them 
          router.push({ name: 'home' });
          emitter.emit("showNotificationAlert", ["success", "تم تسجيل الدخول بنجاح!"]);
        }
      })
      .catch((e) => {
        console.error(e);
        backErrors.value = e.response.data.errors;
      })
      .finally(() => {
        loading.value = false;
      });
  }
  const forgotPassword = async (credentials) => {
    await getCsrfToken();
    try {
      loading.value = true;
      const response = await axiosClient.post("/forgot-password", credentials);
      if (response.status === 200) {
        isAuth.value = true;
        user.value = response.data.user;
        backErrors.value = null;
        // router.push({ name: 'login' });
        forgotMessage.value = credentials.email ? 'تم ارسال رسالة الى الايمل الخاص بك' : "تم ارسال رسالة الى رقم هاتفك"

        emitter.emit("showNotificationAlert", ["success", "تم اعادة ضبط كلمة المرور بنجاح"]);
        isCheckedAuth.value = true;
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      backErrors.value = error.response.data.errors;
    } finally {
      loading.value = false;
    }
  }
  const resetPassword = async (credentials) => {
    await getCsrfToken();
    try {
      loading.value = true;
      const response = await axiosClient.post("/reset-password", credentials);
      if (response.status === 200) {
        isAuth.value = true;
        user.value = response.data.user;
        backErrors.value = null;
        router.push({ name: 'login' });

        emitter.emit("showNotificationAlert", ["success", "تم اعادة ضبط كلمة المرور بنجاح"]);
        isCheckedAuth.value = true;
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      backErrors.value = error.response.data.errors;
    } finally {
      loading.value = false;
    }
  }
  const register = async (credentials) => {
    await getCsrfToken();
    try {
      loading.value = true;
      const response = await axiosClient.post("/register", credentials);
      if (response.status === 201) {
        isAuth.value = true;
        user.value = response.data.user;
        // token.value = response.data.token;
        backErrors.value = null;
        router.push({ name: 'home' });

        emitter.emit("showNotificationAlert", ["success", "تم تسجيل الدخول بنجاح!"]);
        isCheckedAuth.value = true;
      }
      // Store the token in localStorage or cookies if needed
      // localStorage.setItem("token", this.token);
      console.log(response);
    } catch (error) {
      console.error(error);
      backErrors.value = error.response.data.errors;
    } finally {
      loading.value = false;
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
        if (router.currentRoute.value.name != 'home')
          router.push({ name: 'home' })
      }
    });
  }
  const getCsrfToken = async () => {
    console.log('csrf')
    await axios
      .get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      })
      .then((response) => {
      });
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
    if (isCheckedAuth.value) return;

    loading.value = true;
    try {
      await getCsrfToken();
      const response = await axiosClient.get("/auth/user");
      if (response.data) {
        user.value = response.data;
        isAuth.value = true;
      }
    } catch (error) {
      user.value = null;
      isAuth.value = false;
    } finally {
      isCheckedAuth.value = true;
      loading.value = false;
    }
  };
  const update = async (data, isShowAlert = true) => {
    try {
      const response = await axiosClient.put("/user", data);
      if (response.status == 200 && isShowAlert) {
        emitter.emit("showNotificationAlert", [
          "success",
          "تم تحديث بيانات الحساب بنجاح!",
        ]);
      }
    } catch (error) {
      console.error("Error updating account type:", error);
      emitter.emit("showNotificationAlert", [
        "error",
        error.response.data.message || "حدث خطأ ما، يرجى المحاولة لاحقاً.",
      ]);
    }
  };

  const deleteAccount = async (current_password) => {
    try {
      const response = await axiosClient.delete("/user/delete-account", {
        data: { current_password }
      });
      if (response.status == 204) {
        user.value = null;
        isAuth.value = false;
        redirect.value = true;
        loading.value = false;
        if (router.currentRoute.value.name != 'home')
          router.push({ name: 'home' })
        emitter.emit("showNotificationAlert", [
          "success",
          "تم حذف الحساب بنجاح!",
        ]);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      emitter.emit("showNotificationAlert", [
        "error",
        error.response.data.message || "حدث خطأ ما، يرجى المحاولة لاحقاً.",
      ]);
    }
  };

  const firstError = (field) => {
    return Array.isArray(backErrors.value?.[field]) ? backErrors.value[field][0] : null;
  };
  return { user, loading, backErrors, redirect, isAuth, isCustomer, isMerchant, forgotMessage, update, deleteAccount, forgotPassword, login, checkAuth, loginWith, logout, firstError, register, resetPassword }
});
