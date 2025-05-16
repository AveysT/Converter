import { useState } from "react";

//const currencies = "https://api.frankfurter.dev/v1/currencies"

function CurrencyConverter () {

    const [amount, setAmount] = useState(10)

    const [currency1, setCurrency1] = useState("CAD")

    const [currency2, setCurrency2] = useState("USD")

    function handleChangeC1(e) {
    setCurrency1(e.target.value);
    console.log(currency1);
    }

    function handleChangeC2(e) {
    setCurrency2(e.target.value);
    console.log(currency2);
    }

    function handleAmountChange(e) {
    setAmount(e.target.value);
    }

    function convert() {
        fetch(`https://api.frankfurter.dev/v1/latest?base=${currency1}&symbols=${currency2}`)
            .then((resp) => resp.json())
            .then((data) => {
                const convertedAmount = (amount * data.rates[currency2]).toFixed(2);
                alert(`${amount} ${currency1} = ${convertedAmount} ${currency2}`);
            });
        console.log(amount);
    }

    return (
        <div>
            <h2>Conversor de Monedas</h2>

            <div>
                <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                min="0"
                />
            </div>

            <div>
                <label>De:</label>
                <select value={currency1} onChange={handleChangeC1}>
                <option value="CAD">CAD</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                </select>

                <label>A:</label>
                <select value={currency2} onChange={handleChangeC2}>
                <option value="CAD">CAD</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                </select>
            </div>

            <button onClick={convert}>Convert</button>
        </div>
    )
}

export default CurrencyConverter