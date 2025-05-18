function CurrencySelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      className="outline-none"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value=""></option>
      {options.map((c) => (
        <option key={c.code} value={c.code}>
          {c.code} - {c.name}
        </option>
      ))}
    </select>
  );
}

export default CurrencySelect;
