const EvaluationButton = ({ buttonText, className, onClick }) => {
  return (
    <>
      <button className={className} onClick={onClick}>
        {buttonText}
      </button>
    </>
  );
};

export default EvaluationButton;
