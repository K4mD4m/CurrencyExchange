const CurrencyDropdown = ({
  label,
  currencies,
  selectedCurrency,
  onCurrencyChange,
}) => {
  const handleChange = (event) => {
    onCurrencyChange(event.target.value); // zmiana waluty
  };

  return (
    <div className="currency-dropdown">
      <label>{label}</label>
      <select value={selectedCurrency} onChange={handleChange}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
