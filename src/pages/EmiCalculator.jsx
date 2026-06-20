import { useState } from "react";
import Sidebar from "../components/Sidebar";

function EmiCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");

  const [emi, setEmi] = useState(null);
  const [interest, setInterest] = useState(null);
  const [total, setTotal] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(amount);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseInt(tenure);

    const emiValue =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    const totalPayable = emiValue * N;
    const totalInterest = totalPayable - P;

    setEmi(emiValue.toFixed(2));
    setInterest(totalInterest.toFixed(2));
    setTotal(totalPayable.toFixed(2));
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          EMI Calculator
        </h1>

        <div className="bg-white p-6 rounded-xl shadow max-w-xl">
          <input
            type="number"
            placeholder="Loan Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="number"
            placeholder="Interest Rate (%)"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="number"
            placeholder="Tenure (Months)"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <button
            onClick={calculateEMI}
            className="bg-slate-900 text-white px-6 py-3 rounded"
          >
            Calculate EMI
          </button>

          {emi && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">
                Monthly EMI: ₹{emi}
              </h2>

              <p className="mt-2">
                Total Interest: ₹{interest}
              </p>

              <p>
                Total Payable: ₹{total}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmiCalculator;