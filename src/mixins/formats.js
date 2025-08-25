const useFormats = () => {
    const currencyFormat = (
        amount,
        type = "fixed",
        locale = "en-US",
        currency = "USD"
    ) => {
        if (type === "percentage") {
            return `${amount}%`;
        }

        const minimumFractionDigits = currency === "ILS" ? 0 : 2;

        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
            minimumFractionDigits,
            maximumFractionDigits: minimumFractionDigits,
        }).format(amount);
    };

    return { currencyFormat };
};

export default useFormats;
