import { useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/loanApi";
import toast from "react-hot-toast";

function ApplyLoan() {
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

    console.log(
      "TOKEN =",
      localStorage.getItem("access")
    );

    console.log(
      "API URL =",
      import.meta.env.VITE_API_URL
    );

    try {
      const response = await API.post("/loans/", {
        name: formData.name,
        amount: formData.amount,
        loan_type: formData.loanType,
        tenure: formData.tenure,
        status: "Pending",
      });

      console.log("SUCCESS =", response.data);

      toast.success("Loan Submitted Successfully");

      setFormData({
        name: "",
        amount: "",
        loanType: "",
        tenure: "",
      });

    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("ERROR:", error);

      toast.error("Failed to Submit Loan");
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