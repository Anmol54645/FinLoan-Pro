import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLoan } from "../redux/loanSlice";
import Sidebar from "../components/Sidebar";
import API from "../api/loanApi";

function ApplyLoan() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    loanType: "",
    tenure: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/loans/", {
      name: formData.name,
      amount: formData.amount,
      loan_type: formData.loanType,
      tenure: formData.tenure,
      status: "Pending",
    });

    alert("Loan Submitted Successfully");
  }catch (error) {
  console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
}
};

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8">
          Apply Loan
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 md:p-6 rounded-xl shadow w-full max-w-xl"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Applicant Name"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            required
          />

          <input
            type="number"
            name="amount"
            value={formData.amount}
            placeholder="Loan Amount"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            required
          />

          <select
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            required
          >
            <option value="">Select Loan Type</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Personal Loan">Personal Loan</option>
            <option value="Car Loan">Car Loan</option>
          </select>

          <input
            type="number"
            name="tenure"
            value={formData.tenure}
            placeholder="Tenure (Months)"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            required
          />

          <button
            type="submit"
            className="bg-slate-900 text-white px-6 py-3 rounded hover:bg-slate-700"
          >
            Submit Loan
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyLoan;