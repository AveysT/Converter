import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const CurrencyChart = ({ from = "USD", to = "EUR" }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const endDate = today.toISOString().split("T")[0];
    const startDate = new Date(today.setDate(today.getDate() - 10))
      .toISOString()
      .split("T")[0];

    fetch(
      `https://api.frankfurter.app/${startDate}..${endDate}?from=${from}&to=${to}`
    )
      .then((res) => res.json())
      .then((json) => {
        const formattedData = Object.entries(json.rates).map(
          ([date, rateObj]) => ({
            date,
            value: rateObj[to],
          })
        );
        setData(formattedData);
      });
  }, [from, to]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid vertical="" fillOpacity={0.1} />
        <XAxis
          dataKey="date"
          tickMargin={10}
          tickSize={0}
          tickFormatter={(value) => {
            if (
              value === data[0]?.date ||
              value === data[data.length - 1]?.date
            ) {
              return "";
            }

            const date = new Date(value);
            return date.toLocaleDateString("es-ES", {
              month: "short",
              day: "2-digit",
            });
          }}
        />
        <YAxis
          domain={["auto", "auto"]}
          tickSize={0}
          tickMargin={10}
          tickCount={5}
          axisLine={false}
        />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#083344" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CurrencyChart;
