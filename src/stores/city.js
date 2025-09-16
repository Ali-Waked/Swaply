import { defineStore, storeToRefs } from "pinia"
import { ref, watch } from "vue"
import axiosClient from "../axiosClient";
import { walkIdentifiers } from "vue/compiler-sfc";
import { useAuthStore } from "./auth/auth";

export const useCityStore = defineStore("city", () => {
    const cities = ref([]);
    const distance = ref([]);
    const loading = ref(false);
    const errors = ref({});
    const { user } = storeToRefs(useAuthStore());

    const fetchAllCities = async () => {
        if (Object.keys(cities.value).length) {
            return cities.value;
        }

        try {
            loading.value = true;
            const response = await axiosClient.get(`/cities`);
            cities.value = response.data.cities;
        } catch (e) {
            console.error(e);
            errors.value = e;
        } finally {
            loading.value = false;
        }
    };

    const fetchAllCitiesDistances = async () => {
        if (Object.keys(distance.value).length) {
            return distance.value;
        }

        try {
            loading.value = true;
            const response = await axiosClient.get(`/cities/distances`);
            distance.value = response.data.distances;
        } catch (e) {
            console.error(e);
            errors.value = e;
        } finally {
            loading.value = false;
        }
    };
    const distanceToSpecificCity = (cityId) => {
        if (!user.value.share_location) {
            return 'المسافة غر معروفة'
        }
        if (!distance.value.length) {
            fetchAllCitiesDistances();
        }
        // console.log(distance.value.find(d => (d.city_id_one == cityId && d.city_id_two == user.value.city?.id) || (d.city_id_one == user.value.city?.id && d.city_id_two == cityId)));
        return +distance.value.find(d => (d.city_id_one == cityId && d.city_id_two == user.value.city?.id) || (d.city_id_one == user.value.city?.id && d.city_id_two == cityId))?.distance || 'في منطقتك';
    }

    return { cities, loading, errors, fetchAllCities, fetchAllCitiesDistances, distanceToSpecificCity };
});
