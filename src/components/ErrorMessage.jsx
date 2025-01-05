const ErrorMessage = ({ message }) => {
  if (!message) return null; // Nie renderuj, jeśli nie ma błędu

  return (
    <div className="error-message">
      <p style={{ color: "red" }}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
