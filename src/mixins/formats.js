const useFormats = () => {
    const currencyFormat = (amount, type = "fixed", locale = "en-US", currency = "USD") => {
        if (type === "percentage") {
            return `${amount}%`;
        }
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2,
        }).format(amount);
    };
    return { currencyFormat };
}

export default useFormats;