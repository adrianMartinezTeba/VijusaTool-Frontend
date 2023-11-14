export const calculatePriceMetro = (priceKg, wheightMeter) => {
    return ((priceKg * wheightMeter) / 1000).toFixed(3);
  };
  
