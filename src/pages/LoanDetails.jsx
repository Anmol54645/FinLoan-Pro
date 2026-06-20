import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../api/loanApi";

function LoanDetails() {
  const { id } = useParams();

  const [loan, setLoan] = useState(null);

  useEffect(() => {
    fetchLoan();
  }, []);

  const fetchLoan = async () => {
    try {
      const response = await API.get(`/loans/${id}/`);
      setLoan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!loan) {
    return (
      <div className="p-8">
        <h1>Loading...</h1>
      </div>
    );
  }

  const P = parseFloat(loan.amount);
  const annualRate = loan.interest_rate || 0;
  const R = annualRate / 12 / 100;
  const N = parseInt(loan.tenure);

  let emi = 0;
  let totalPayable = 0;
  let totalInterest = 0;

  if (R > 0) {
    emi =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    totalPayable = emi * N;
    totalInterest = totalPayable - P;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Loan Details
        </h1>

        <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
          <p className="mb-3">
            <b>Applicant:</b> {loan.name}
          </p>

          <p className="mb-3">
            <b>Amount:</b> ₹{loan.amount}
          </p>

          <p className="mb-3">
            <b>Loan Type:</b> {loan.loan_type}
          </p>

          <p className="mb-3">
            <b>Tenure:</b> {loan.tenure} Months
          </p>

          <p className="mb-3">
            <b>Interest Rate:</b> {loan.interest_rate}%
          </p>

          <p className="mb-4">
            <b>Status:</b>{" "}
            <span
              className={`px-3 py-1 rounded-full text-white ${
                loan.status === "Approved"
                  ? "bg-green-500"
                  : loan.status === "Rejected"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {loan.status}
            </span>
          </p>

          <hr className="my-6" />

          {loan.status === "Approved" ? (
            <>
              <h2 className="text-2xl font-bold mb-4">
                EMI Details
              </h2>

              <p className="mb-2">
                <b>Monthly EMI:</b> ₹{emi.toFixed(2)}
              </p>

              <p className="mb-2">
                <b>Total Interest:</b> ₹{totalInterest.toFixed(2)}
              </p>

              <p>
                <b>Total Payable:</b> ₹{totalPayable.toFixed(2)}
              </p>
            </>
          ) : loan.status === "Pending" ? (
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-yellow-700">
                Loan Approval Pending
              </h2>

              <p className="mt-2">
                EMI details will be available after approval.
              </p>
            </div>
          ) : (
            <div className="bg-red-100 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-red-700">
                Loan Rejected
              </h2>

              <p className="mt-2">
                This loan application has been rejected.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanDetails;