import React, { useState } from "react";

type Complain = {
  id: number;
  complainNo: string;
  pointName: string;
  issue: string;
  status: "Assignment" | "Solved";
  assignTo: string;
  startDate: string;
  endDate: string;
  receivedDate: string;
};

const initialComplains: Complain[] = [
  { id: 1, complainNo: "217876", pointName: "Closure 9 Miles 73", issue: "Testing", status: "Assignment", assignTo: "adv_admin", startDate: "29/08/2025", endDate: "29/08/2025", receivedDate: "29/08/2025" },
  { id: 2, complainNo: "607284", pointName: "Create Testing Point", issue: "mobile test", status: "Assignment", assignTo: "adv_admin", startDate: "29/08/2025", endDate: "31/08/2025", receivedDate: "29/08/2025" },
  { id: 3, complainNo: "501745", pointName: "9m HPG", issue: "mobile test", status: "Solved", assignTo: "adv_admin", startDate: "25/08/2025", endDate: "27/08/2025", receivedDate: "25/08/2025" },
  { id: 4, complainNo: "992958", pointName: "မြို့မတံတား 28.5 km", issue: "လိပ်ပြာ", status: "Solved", assignTo: "adv_admin", startDate: "21/08/2025", endDate: "22/08/2025", receivedDate: "22/08/2025" },
  { id: 5, complainNo: "915566", pointName: "Closure 6.0km", issue: "မီးပျက်", status: "Solved", assignTo: "ASR_1", startDate: "21/07/2025", endDate: "13/08/2025", receivedDate: "21/07/2025" },
  { id: 6, complainNo: "926273", pointName: "Closure 9Miles 105", issue: "water", status: "Assignment", assignTo: "adv_admin", startDate: "21/07/2025", endDate: "", receivedDate: "21/07/2025" },
  { id: 7, complainNo: "919425", pointName: "BGO Mobile Station 1", issue: "Created from mobile app", status: "Assignment", assignTo: "adv_admin", startDate: "21/07/2025", endDate: "", receivedDate: "21/07/2025" },
  { id: 8, complainNo: "144139", pointName: "Closure 9 Miles 7373", issue: "Fiber Fault Reason", status: "Assignment", assignTo: "adv_admin", startDate: "05/08/2025", endDate: "05/08/2025", receivedDate: "" },
  { id: 9, complainNo: "253086", pointName: "9 Miles Station", issue: "ပြဿနာ", status: "Assignment", assignTo: "ASR_1", startDate: "21/07/2025", endDate: "22/07/2025", receivedDate: "21/07/2025" },
  { id: 10, complainNo: "028407", pointName: "Bridge", issue: "မီးပျက်", status: "Assignment", assignTo: "ASR_1", startDate: "20/07/2025", endDate: "21/07/2025", receivedDate: "21/07/2025" },
];

const StatusBadge: React.FC<{ status: "Assignment" | "Solved" }> = ({ status }) => {
  return (
    <span
      className={`inline-block text-white text-xs font-medium px-3 py-1 rounded ${
        status === "Solved" ? "bg-green-600" : "bg-orange-500"
      }`}
    >
      {status}
    </span>
  );
};

const PencilIcon = () => (
  <svg
    className="w-4 h-4 text-blue-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5h6m2 2v10a2 2 0 0 1-2 2H7l-4 4V7a2 2 0 0 1 2-2h3"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-4 h-4 text-sky-600"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ComplainInfoList: React.FC = () => {
  const [complains] = useState<Complain[]>(initialComplains);
  const [filters, setFilters] = useState({
    pointName: "",
    complainNo: "",
    assignTo: "All",
    status: "All",
    fromDate: "",
    toDate: "",
  });

  const reset = () =>
    setFilters({
      pointName: "",
      complainNo: "",
      assignTo: "All",
      status: "All",
      fromDate: "",
      toDate: "",
    });

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Complain Info List</h1>

      {/* Filters */}
      <div className="border border-gray-200 rounded-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Point Name</label>
            <input
              value={filters.pointName}
              onChange={(e) => setFilters({ ...filters, pointName: e.target.value })}
              placeholder="Point Name"
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Assign To</label>
            <select
              value={filters.assignTo}
              onChange={(e) => setFilters({ ...filters, assignTo: e.target.value })}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-white"
            >
              <option>All</option>
              <option>adv_admin</option>
              <option>ASR_1</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Complain No.</label>
            <input
              value={filters.complainNo}
              onChange={(e) => setFilters({ ...filters, complainNo: e.target.value })}
              placeholder="Complain No"
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Complain Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-white"
            >
              <option>All</option>
              <option>Assignment</option>
              <option>Solved</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Date Range</label>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
              <span className="text-gray-600">to</span>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
          </div>
        </div>

        <div className="flex items-end justify-start md:justify-end mt-6 space-x-3">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded shadow-sm text-sm">
            CREATE COMPLAIN
          </button>
          <button
            onClick={reset}
            className="bg-white border border-sky-200 text-sky-600 px-4 py-2 rounded text-sm"
          >
            RESET
          </button>
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded text-sm">
            SEARCH
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border-t border-gray-100" />
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="text-gray-500">
            <tr>
              <th className="py-3 pr-6">#</th>
              <th className="py-3">&nbsp;</th>
              <th className="py-3">&nbsp;</th>
              <th className="py-3">Complain No.</th>
              <th className="py-3">Point Name</th>
              <th className="py-3">Issue/Problem</th>
              <th className="py-3">Complain Status</th>
              <th className="py-3">Assign To</th>
              <th className="py-3">Start Date</th>
              <th className="py-3">End Date</th>
              <th className="py-3">Received Date</th>
            </tr>
          </thead>
          <tbody>
            {complains.map((c, idx) => (
              <tr key={c.id} className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="py-4 pr-6 text-gray-600">{c.id}</td>
                <td className="py-4">
                  <button className="p-1 rounded hover:bg-gray-100">
                    <PencilIcon />
                  </button>
                </td>
                <td className="py-4">
                  <button className="p-1 rounded hover:bg-gray-100">
                    <TrashIcon />
                  </button>
                </td>
                <td className="py-4 text-gray-600">{c.complainNo}</td>
                <td className="py-4 text-gray-700 font-medium">{c.pointName}</td>
                <td className="py-4 text-gray-600">{c.issue}</td>
                <td className="py-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="py-4 text-gray-600">{c.assignTo}</td>
                <td className="py-4 text-gray-600">{c.startDate}</td>
                <td className="py-4 text-gray-600">{c.endDate}</td>
                <td className="py-4 text-gray-600">{c.receivedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-1 text-sm">
        <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">First</button>
        <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">Prev</button>
        <button className="px-3 py-1 border rounded bg-sky-600 text-white">1</button>
        <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">2</button>
        <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">Next</button>
        <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">Last</button>
      </div>
    </div>
  );
};

export default ComplainInfoList;
