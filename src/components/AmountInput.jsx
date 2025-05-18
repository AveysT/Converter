function AmountInput({ value, onChange }) {
  return (
    <div>
      <input
        className="outline-none"
        type="number"
        value={value}
        min="1"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default AmountInput;
