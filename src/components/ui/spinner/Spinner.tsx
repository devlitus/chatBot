import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-container" data-testid="spinner-container">
      <div className="spinner" data-testid="spinner"></div>
    </div>
  );
};

export default Spinner;
