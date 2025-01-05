const BASE_URL = "https://v6.exchangerate-api.com/v6";
const API_KEY = "API_KEY";

// Pobieranie pełnej listy kursów walut dla waluty bazowej
export const fetchExchangeRates = async (baseCurrency) => {
  const url = `${BASE_URL}/${API_KEY}/latest/${baseCurrency}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Błąd podczas pobierania danych z API");
    }

    const data = await response.json();

    if (data.result !== "success") {
      throw new Error(data.error_type || "Nieznany błąd API");
    }

    return data.conversion_rates;
  } catch (error) {
    console.error("Błąd w fetchExchangeRates:", error.message);
    throw error;
  }
};

// Pobieranie kursu wymiany między dwoma walutami
export const getExchangeRate = async (from, to) => {
  try {
    const rates = await fetchExchangeRates(from);
    return rates[to];
  } catch (error) {
    throw new Error("Nie udało się pobrać kursu wymiany");
  }
};
