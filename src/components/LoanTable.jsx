import { Link } from "react-router-dom";

function LoanTable({ loans }) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Recent Loans
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b bg-slate-100">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Applicant</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Loan Type</th>
              <th className="p-3 text-left">Tenure</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Details</th>
            </tr>
          </thead>

          <tbody>
            {loans && loans.length > 0 ? (
              loans.map((loan) => (
                <tr
                  key={loan.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-3">
                    {loan.id}
                  </td>

                  <td className="p-3">
                    {loan.name}
                  </td>

                  <td className="p-3">
                    ₹{loan.amount}
                  </td>

                  <td className="p-3">
                    {loan.loan_type}
                  </td>

                  <td className="p-3">
                    {loan.tenure} Months
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        loan.status === "Approved"
                          ? "bg-green-500"
                          : loan.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <Link
                      to={`/loan/${loan.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-500"
                >
                  No Loan Applications Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LoanTable;