const ResultDisplay = ({ amount, from, to, result }) => {
  return (
    <div className="result-display">
      <h2>Wynik konwersji</h2>
      <p>
        {amount} {from} ={" "}
        <strong>
          {result} {to}
        </strong>
      </p>
    </div>
  );
};

export default ResultDisplay;
