import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/loanApi";

function Admin() {
  const [loans, setLoans] = useState([]);
  const [interestRates, setInterestRates] = useState({});

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

  const updateStatus = async (
    id,
    status,
    interestRate = 0
  ) => {

    if (
  status === "Approved" &&
  (!interestRate || Number(interestRate) <= 0)
) {
  alert("Please enter a valid interest rate");
  return;
}
    try {
      const loan = loans.find(
        (item) => item.id === id
      );

      await API.patch(`/loans/${id}/`, {
        ...loan,
        status,
        interest_rate: Number(interestRate),
      });

      fetchLoans();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLoan = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this loan?"
      );

      if (!confirmDelete) return;

      await API.delete(`/loans/${id}/`);

      fetchLoans();
    } catch (error) {
      console.log(error);
    }
  };

  const exportCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Amount",
      "Loan Type",
      "Tenure",
      "Status",
      "Interest Rate",
    ];

    const rows = loans.map((loan) => [
      loan.id,
      loan.name,
      loan.amount,
      loan.loan_type,
      loan.tenure,
      loan.status,
      loan.interest_rate,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "loans_report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Admin Panel
          </h1>

          <button
            onClick={exportCSV}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Export CSV
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">
                  Name
                </th>

                <th className="text-left p-3">
                  Amount
                </th>

                <th className="text-left p-3">
                  Status
                </th>

                <th className="text-left p-3">
                  Interest %
                </th>

                <th className="text-left p-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loans.map((loan) => (
                <tr
                  key={loan.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {loan.name}
                  </td>

                  <td className="p-3">
                    ₹{loan.amount}
                  </td>

                  <td className="p-3">
                    {loan.status}
                  </td>

                  <td className="p-3">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Rate"
                      value={
                        interestRates[loan.id] || ""
                      }
                      onChange={(e) =>
                        setInterestRates({
                          ...interestRates,
                          [loan.id]:
                            e.target.value,
                        })
                      }
                      className="border p-2 rounded w-24"
                    />
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() =>
                        updateStatus(
                          loan.id,
                          "Approved",
                          interestRates[loan.id]
                        )
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          loan.id,
                          "Rejected"
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() =>
                        deleteLoan(loan.id)
                      }
                      className="bg-gray-700 text-white px-3 py-1 rounded ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;