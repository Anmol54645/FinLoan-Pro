import { Link } from "react-router-dom";

function Sidebar() {
    const role = localStorage.getItem("role");
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-10">
        FinLoan Pro
      </h1>

      <ul className="space-y-6">
        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/loans">
            Loans
          </Link>
        </li>

        <li>
          <Link to="/apply-loan">
            Apply Loan
          </Link>
        </li>

        <li>
          <Link to="/profile">
            Profile
          </Link>
        </li>

        <li>
  <Link to="/emi-calculator">
    EMI Calculator
  </Link>
</li>

       {role === "admin" && (
  <li>
    <Link to="/admin">Admin</Link>
  </li>
)}
      </ul>
    </div>
  );
}

export default Sidebar;