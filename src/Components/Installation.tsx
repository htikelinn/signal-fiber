import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import data  from "../assets/data.json";


interface NodeData {
  id: number;
  Name: string;
  DistanceKM: number;
  Type: string;
  Cores: number;
  SpareCores: number;
  Status: string;
  Township: string;
  FromLatitude: number;
  FromLongitude: number;
  ToLatitude: number;
  ToLongitude: number;
  CreatedBy: string;
  InstallationDate: string;
  CreatedDate: string;
}

export default function Installation() {
    const [rows, setRows] = useState<NodeData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        setRows(data); // load data from JSON
    }, []);

    // // Filter data based on search and filters
    // const filteredData = rows.filter((row) => {
    //   const matchesSearch =
    //     row.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     row.Township.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     row.Type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     row.Status.toLowerCase().includes(searchTerm.toLowerCase());

    //   const matchesStatus = statusFilter === "All" || row.Status === statusFilter;
    //   const matchesType = typeFilter === "All" || row.Type === typeFilter;

    //   return matchesSearch && matchesStatus && matchesType;
    // });
const filteredData = useMemo(() => {
  return rows.filter((row) => {
    const matchesSearch =
      (row.Name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (row.Township || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (row.Type || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (row.Status || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || row.Status === statusFilter;
    const matchesType = typeFilter === "All" || row.Type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });
}, [rows, searchTerm, statusFilter, typeFilter]);

    // Get current items for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Get unique status and type values for filters
    const statusOptions = ["All", ...new Set(rows.map((item) => item.Status))];
    const typeOptions = ["All", ...new Set(rows.map((item) => item.Type))];

    // Function to get status badge class
    const getStatusClass = (status: string) => {
        switch (status) {
            case "Active":
                return "badge badge-success";
            case "Inactive":
                return "badge badge-error";
            case "Pending":
                return "badge badge-warning";
            default:
                return "badge badge-info";
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        <i className="fas fa-network-wired text-primary mr-3"></i>
                        Installation Information
                    </h1>
                    <p className="text-gray-600 mt-2">Manage all network nodes in one place</p>
                </div>

                <div className="flex space-x-3 mt-4 md:mt-0">
                    <button className="btn btn-primary">
                        <i className="fas fa-plus mr-2"></i> Add New Node
                    </button>
                    <button className="btn btn-outline">
                        <i className="fas fa-download mr-2"></i> Export
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <i className="fas fa-server text-3xl"></i>
                        </div>
                        <div className="stat-title">Total Nodes</div>
                        <div className="stat-value text-primary">{rows.length}</div>
                        <div className="stat-desc">All network nodes</div>
                    </div>
                </div>

                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <i className="fas fa-check-circle text-3xl"></i>
                        </div>
                        <div className="stat-title">Active Nodes</div>
                        <div className="stat-value text-secondary">
                            {rows.filter((row) => row.Status === "Active").length}
                        </div>
                        <div className="stat-desc">Currently operational</div>
                    </div>
                </div>

                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-figure text-accent">
                            <i className="fas fa-tachometer-alt text-3xl"></i>
                        </div>
                        <div className="stat-title">Average Distance</div>
                        <div className="stat-value text-accent">
                            {rows.length > 0
                                ? (
                                      rows.reduce(
                                          (sum, row) => sum + parseFloat(String(row.DistanceKM) || "0"),
                                          0
                                      ) / rows.length
                                  ).toFixed(1)
                                : "0.0"}
                            <small className="text-lg">km</small>
                        </div>
                        <div className="stat-desc">Mean distance between nodes</div>
                    </div>
                </div>

                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-figure text-blue-500">
                            <i className="fas fa-microchip text-3xl"></i>
                        </div>
                        <div className="stat-title">Total Cores</div>
                        <div className="stat-value text-blue-500">
                            {rows.reduce((sum, row) => sum + parseInt(String(row.Cores) || ""), 0)}
                        </div>
                        <div className="stat-desc">Across all nodes</div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3">
                        <h3 className="font-semibold text-gray-700">Filters:</h3>
                        <select
                            className="select select-bordered select-sm"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                        <select
                            className="select select-bordered select-sm"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            {typeOptions.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="join">
                        <input
                            className="input input-bordered join-item"
                            placeholder="Search nodes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn join-item btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* Table head */}
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="font-semibold">No.</th>
                                <th className="font-semibold">Name</th>
                                <th className="font-semibold">Distance (KM)</th>
                                <th className="font-semibold">Type</th>
                                <th className="font-semibold">Cores</th>
                                <th className="font-semibold">Status</th>
                                <th className="font-semibold">Township</th>
                                <th className="font-semibold">Installation Date</th>
                                <th className="font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {currentItems.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    <td className="font-mono text-sm">{row.id}</td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                                                <FontAwesomeIcon icon={faUser} /> {/* Human icon */}
                                            </div>
                                            <div>
                                                <div className="font-medium">{row.Name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {row.DistanceKM}
                                        <span className="text-xs text-gray-500 ml-1">km</span>
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost badge-sm">
                                            {row.Type}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <span className="font-medium">{row.Cores}</span>
                                            <div className="text-xs text-gray-500 ml-1">
                                                ({row.SpareCores} spare)
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span
                                            className={`badge badge-sm ${getStatusClass(
                                                row.Status
                                            )}`}
                                        >
                                            {row.Status}
                                        </span>
                                    </td>
                                    <td>{row.Township}</td>
                                    <td>{row.InstallationDate}</td>
                                    <td>
                                        <div className="flex justify-center space-x-2">
                                            <button className="btn btn-sm btn-square btn-outline">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button className="btn btn-sm btn-square btn-outline btn-primary">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="btn btn-sm btn-square btn-outline btn-error">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {currentItems.length === 0 && (
                        <div className="text-center py-10">
                            <i className="fas fa-inbox text-4xl text-gray-300 mb-3"></i>
                            <p className="text-gray-500">No nodes found matching your criteria</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredData.length > 0 && (
                    <div className="flex items-center justify-between p-4 border-t border-gray-200">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                            <span className="font-medium">
                                {Math.min(indexOfLastItem, filteredData.length)}
                            </span>{" "}
                            of <span className="font-medium">{filteredData.length}</span> results
                        </div>

                        <div className="join">
                            <button
                                className="join-item btn btn-sm"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                «
                            </button>
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        className={`join-item btn btn-sm ${
                                            currentPage === pageNum ? "btn-active" : ""
                                        }`}
                                        onClick={() => setCurrentPage(pageNum)}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            <button
                                className="join-item btn btn-sm"
                                onClick={() =>
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                }
                                disabled={currentPage === totalPages}
                            >
                                »
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
