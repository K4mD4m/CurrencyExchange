import { useState, useEffect } from "react";
import CurrencyDropDown from "./CurrencyDropdown";
import ResultDisplay from "./ResultDisplay";
import ErrorMessage from "./ErrorMessage";
import {
  fetchExchangeRates,
  getExchangeRate,
} from "../services/exchangeRateAPI";

const CurrencyConverter = () => {
  // Stany aplikacji
  const [baseCurrency, setBaseCurrency] = useState("USD"); // Domyślna waluta bazowa
  const [targetCurrency, setTargetCurrency] = useState("PLN"); // Domyślna waluta docelowa
  const [amount, setAmount] = useState(1); // Domyślna ilość
  const [result, setResult] = useState(null); // Wynik zmiany
  const [currencies, setCurrencies] = useState([]); // Lista dostępnych walut
  const [error, setError] = useState(null); // Komunikaty błędów

  // Pobranie dostępnych walut przy pierwszym renderze
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const rates = await fetchExchangeRates(baseCurrency);
        setCurrencies(Object.keys(rates)); // Pobierz dostępne waluty
      } catch (error) {
        setError("Nie udało się załadować walut. Spróbuj ponownie.");
      }
    };

    loadCurrencies();
  }, [baseCurrency]); // Aktualizuje listę po zmianie waluty bazowej

  // Zmiana ilości waluty
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Zmiana waluty bazowej
  const handleBaseCurrencyChange = (currency) => {
    setBaseCurrency(currency);
  };

  // Zmiana waluty docelowej
  const handleTargetCurrencyChange = (currency) => {
    setTargetCurrency(currency);
  };

  // Przeliczenie waluty
  useEffect(() => {
    const convertCurrency = async () => {
      if (!baseCurrency || !targetCurrency || !amount) return;

      try {
        const rate = await getExchangeRate(baseCurrency, targetCurrency);
        setResult((amount * rate).toFixed(2));
        setError(null); // Wyczyść błędy
      } catch (error) {
        setError("Nie udało się przeliczyć waluty. Spróbuj ponownie.");
      }
    };

    convertCurrency();
  }, [baseCurrency, targetCurrency, amount]); // Aktualizuje wynik przy zmianie wartości

  return (
    <div className="currency-converter">
      <h1>Konwerter Walut</h1>

      {error && <ErrorMessage message={error} />}

      <CurrencyDropDown
        label="Waluta bazowa:"
        currencies={currencies}
        selectedCurrency={baseCurrency}
        onCurrencyChange={handleBaseCurrencyChange}
      />

      <CurrencyDropDown
        label="Waluta docelowa:"
        currencies={currencies}
        selectedCurrency={targetCurrency}
        onCurrencyChange={handleTargetCurrencyChange}
      />

      <div>
        <label>Ilość:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>

      {result && (
        <ResultDisplay
          amount={amount}
          from={baseCurrency}
          to={targetCurrency}
          result={result}
        />
      )}
    </div>
  );
};

export default CurrencyConverter;
