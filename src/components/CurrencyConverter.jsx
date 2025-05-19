import React, { useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";
import AmountInput from "./AmountInput";
import { FaRotate } from "react-icons/fa6";

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  const getCurrencyName = (code) => {
    const currency = currencies.find((c) => c.code === code);
    return currency ? currency.name : code;
  };

  useEffect(() => {
    fetch("https://api.frankfurter.dev/v1/currencies")
      .then((resp) => resp.json())
      .then((data) => {
        const currencyArray = Object.entries(data).map(([code, name]) => ({
          code,
          name,
        }));
        setCurrencies(currencyArray);
      });
  }, []);

  useEffect(() => {
    {
      fetch(
        `https://api.frankfurter.dev/v1/latest?base=${fromCurrency}&symbols=${toCurrency}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          const convertedAmount = (amount * data.rates[toCurrency]).toFixed(2);
          setConvertedAmount(convertedAmount);
        });
    }
  }, [fromCurrency, toCurrency, amount, convertedAmount]);

  return (
    <section className="relative bg-white w-[80%] max-w-[1200px] flex flex-col place-content-center rounded-3xl mx-auto mt-20 p-10">
      <div className="relative grid grid-cols-1 grid-rows-1 gap-2 min-[1200px]:grid-cols-[33%_1fr] md:grid-rows-none">
        <div className="h-[90px] rounded-lg border border-solid border-gray-200 bg-white px-4 py-2 text-2xl font-semibold text-gray-600 hover:bg-gray-100 has-[input:focus]:outline has-[input:focus]:outline-blue-400">
          <label className="text-sm text-gray-400">Cantidad</label>
          <AmountInput value={amount} onChange={setAmount} />
        </div>

        <div className="relative flex flex-col justify-evenly items-center gap-6 md:flex-row">
          <div className="relative flex h-[90px] w-full select-none flex-col justify-center rounded-lg border border-solid border-gray-200 bg-white font-semibold text-gray-600 hover:bg-gray-100 p-4">
            <label className="text-sm text-gray-400 pl-2">Desde</label>
            <CurrencySelect
              value={fromCurrency}
              onChange={setFromCurrency}
              options={currencies}
            />
          </div>

          <div
            className="absolute flex justify-center items-center w-[45px] h-[45px] rounded-full text-2xl text-gray-600 bg-white border border-solid border-gray-200 z-10"
            onClick={() => {
              setFromCurrency(toCurrency);
              setToCurrency(fromCurrency);
            }}
          >
            <FaRotate />
          </div>

          <div className="relative flex h-[90px] w-full select-none flex-col justify-center rounded-lg border border-solid border-gray-200 bg-white font-semibold text-gray-600 hover:bg-gray-100 p-4">
            <label className="text-sm text-gray-400 pl-2">A</label>
            <CurrencySelect
              value={toCurrency}
              onChange={setToCurrency}
              options={currencies}
            />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-gray-600 mt-3 pl-4">
        {amount} {getCurrencyName(fromCurrency)} =
      </h2>
      <h2 className="text-2xl font-semibold text-gray-800 mt-3 pl-4">
        {convertedAmount} {getCurrencyName(toCurrency)}
      </h2>
    </section>
  );
}

export default CurrencyConverter;
