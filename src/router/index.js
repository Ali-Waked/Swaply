import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/front/HomeView.vue";
import { useAuthStore } from "../stores/auth/auth";
import { storeToRefs } from "pinia";

const routes = [
    {
        path: "/",
        component: () => import("../views/layouts/MainLayout.vue"),
        children: [
            {
                path: "/",
                name: "home",
                meta: {
                    title: "الرئيسية",
                },
                component: HomeView,
            },
            {
                path: "/exchange",
                name: "exchange",
                meta: {
                    title: "المقايضة",
                },
                component: () => import('../views/front/ExchangeView.vue'),
            },
            {
                path: "/pricing",
                name: "pricing",
                meta: {
                    title: "الأسعار",
                },
                component: () => import('../views/front/PricingView.vue'),
            },
            {
                path: "/notifications",
                name: "notifications",
                meta: {
                    title: "التنبيهات",
                },
                component: () => import('../views/front/NotificationsView.vue'),
            },
            {
                path: "/personal-profile",
                name: "personal_profile",
                meta: {
                    title: "الملف الشخصي",
                },
                component: () => import('../views/front/ProfileView.vue'),
            },
            {
                path: '/',
                component: () => import("../views/layouts/SearchLayout.vue"),
                children: [
                    {
                        path: '/search',
                        name: 'search-map',
                        meta: {
                            title: 'بحث'
                        },
                        component: () => import('../views/front/SearchView.vue')
                    },
                    {
                        path: '/search-list-stores',
                        name: 'search-list-stores',
                        meta: {
                            title: 'بحث'
                        },
                        component: () => import('../views/front/ListStoreView.vue')
                    }
                ],
            }
        ],
    },
    // {
    //     path: "/",
    //     component: () => import("../views/layouts/AccountLayout.vue"),
    //     children: [
    {
        path: "/login",
        name: "login",
        meta: {
            title: "تسجيل الدخول",
        },
        component: () => import('../views/front/CreateAccount.vue'),
    },
    {
        path: "/register",
        name: "register",
        meta: {
            title: "انشاء حساب",
        },
        component: () => import('../views/front/CreateAccount.vue'),
    },
    //     ],
    // },
    {
        path: "/create-account",
        name: "account",
        meta: {
            title: "انشاء حساب",
        },
        component: () => import('../views/front/CreateAccount.vue'),
    },
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});


// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore();
//   const { isAuth, user } = storeToRefs(authStore);
//   let position = { x: 0, y: 0 };
//   if (sessionStorage.getItem("scrollPosition")) {
//     position = JSON.parse(sessionStorage.getItem("scrollPosition"));
//     sessionStorage.removeItem("scrollPosition");
//   }
//   console.log('options', position);
//   window.scrollTo(position.x, position.y);
//   document.title = to.meta.title;
//   if (to.meta.requiresAuth) {
//     if (isAuth.value) {
//       const userRole = user.value?.type;
//       if (userRole == null) {
//         await authStore.checkAuth();
//       }
//       console.log('auth');
//       console.log('isAuth', isAuth.value, 'type', 'userRole', userRole, user, user.value);
//       if (to.meta.roles && !to.meta.roles.includes(userRole)) {
//         return next({ name: 'page-not-found', params: { pathMatch: to.path.substring(1).split("/") } });
//       }
//       next();
//     } else {
//       if (to.fullPath.includes("admin")) {
//         next({ name: "role-login", params: { role: "admin" } });
//       }
//       if (to.fullPath.includes("driver")) {
//         next({ name: "role-login", params: { role: "driver" } });
//       }
//       if (to.fullPath.includes("moderator")) {
//         next({ name: "role-login", params: { role: "moderator" } });
//       }
//       next({ name: "login" });
//     }
//   } else if (to.meta.requiresGuest && useAuthStore().isAuth) {
//     next({ name: "home" });
//   } else {
//     next();
//   }
// });

export default router;