import { useState, useEffect } from 'react';

// Updated rates relative to INR (1.0)
const rates = {
  USD: { symbol: '$', rate: 0.012 },   // 1 / 83
  INR: { symbol: '₹', rate: 1.0 },     // Base
  EUR: { symbol: '€', rate: 0.011 },   // 1 / 90
  GBP: { symbol: '£', rate: 0.0095 },  // 1 / 105
  DEFAULT: { symbol: '₹', rate: 1.0 }
};

export function useCurrency() {
  const [currency, setCurrency] = useState(rates.DEFAULT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await fetch('https://get.geojs.io/v1/ip/country.json');
        const data = await response.json();
        const countryCode = data.country;
        
        let currencyCode = 'INR'; // default to INR now
        if (countryCode === 'US') currencyCode = 'USD';
        else if (countryCode === 'GB') currencyCode = 'GBP';
        else if (['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'IE', 'FI', 'PT', 'GR'].includes(countryCode)) {
          currencyCode = 'EUR';
        } else if (countryCode === 'IN') {
          currencyCode = 'INR';
        }
        
        setCurrency(rates[currencyCode] || rates.DEFAULT);
      } catch (error) {
        console.error("Failed to fetch geolocation, defaulting to INR", error);
        setCurrency(rates.DEFAULT);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrency();
  }, []);

  const formatPrice = (baseInrPrice) => {
    const converted = (baseInrPrice * currency.rate);
    // Use 2 decimal places for non-INR currencies
    const formatted = currency.symbol === '₹' ? Math.round(converted) : converted.toFixed(2);
    return `${currency.symbol}${formatted}`;
  };

  return { currency, formatPrice, isLoading };
}
