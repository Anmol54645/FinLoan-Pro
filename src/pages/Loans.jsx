import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import LoanTable from "../components/LoanTable";

function Loans() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(
        "https://finloan-pro-backend.onrender.com/api/loans/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoans(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          All Loans
        </h1>

        <LoanTable loans={loans} />
      </div>
    </div>
  );
}

export default Loans;