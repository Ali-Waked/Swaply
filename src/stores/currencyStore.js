import { defineStore } from "pinia";
import { ref } from "vue";
import useFormats from "../mixins/formats";

export const useCurrencyStore = defineStore("currency", () => {
    const rateUSD = ref(0);
    const { currencyFormat } = useFormats();

    const fetchRate = async () => {
        try {
            const res = await fetch("https://open.er-api.com/v6/latest/ILS");
            const data = await res.json();
            rateUSD.value = data.rates.USD;
            // console.log(data.rates.USD);
            // after 15m => rateUSD = 0
            setTimeout(() => {
                rateUSD.value = 0;
            }, 15 * 60 * 1000);
        } catch (err) {
            console.error(err);
            rateUSD.value = 0;
        }
    };

    const convertToUSD = async (priceILS) => {
        if (!rateUSD.value) {
            await fetchRate();
        };
        const price = (priceILS * rateUSD.value).toFixed(2);
        return currencyFormat(price);
    };

    return { rateUSD, fetchRate, convertToUSD };
});
