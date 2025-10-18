const usePrice = () => {
  const calculatePriceRating = (merchantPrice, recentPrices) => {
    if (!recentPrices || recentPrices.length < 5) {
      return {
        rating: "بلا تقييم",
        message: "Insufficient market data to determine fair price.",
        style:
          "text-gray-600 font-[400] bg-gray-50 dark:bg-gray-900/30 dark:text-gray-400",
      };
    }

    const sortedPrices = [...recentPrices].sort((a, b) => a - b);
    const q1 = calculatePercentile(sortedPrices, 25);
    const medianPrice = calculatePercentile(sortedPrices, 50);
    const q3 = calculatePercentile(sortedPrices, 75);
    const iqr = q3 - q1;

    let lowerBound = q1 - 1.0 * iqr;
    lowerBound = Math.max(0, lowerBound);
    const upperBound = q3 + 1.0 * iqr;

    let rating;
    let style;
    if (merchantPrice <= medianPrice) {
      rating = "سعر عادل";
      style =
        "text-green-700 font-[400] bg-green-50 dark:bg-green-900/30 dark:text-green-400";
    } else if (merchantPrice <= upperBound) {
      rating = "سعر جيد";
      style =
        "text-amber-700 font-[400] bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400";
    } else {
      rating = "سعر مرتفع";
      style =
        "text-red-700 font-[400] bg-red-50 dark:bg-red-900/30 dark:text-red-400";
    }
    return { rating, message: "", style };
  };
  return { calculatePriceRating };
};
export default usePrice;
