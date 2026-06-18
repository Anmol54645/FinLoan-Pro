import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import LoanTable from "../components/LoanTable";
import API from "../api/loanApi";

function Loans() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await API.get("/loans/");
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