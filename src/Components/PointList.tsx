import { useState } from "react";
import pointData from "../assets/Points.json"; // ✅ Import JSON directly

// ✅ Interface in the same file
export interface Point {
  id: number;
  pointName: string;
  mainCable: string;
  category: string;
  totalPort: number;
  sparePort: number;
  latitude: number;
  longitude: number;
  fiberType: string;
  areaCondition: string;
  status: string;
  createdDate: string;
}

export default function PointList() {
  const [points, setPoints] = useState<Point[]>(pointData); // ✅ Load from JSON
  const [form, setForm] = useState<Partial<Point>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "number" ? Number(value) : value 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.pointName || !form.mainCable) return;

    const newPoint: Point = {
      id: points.length > 0 ? Math.max(...points.map(p => p.id)) + 1 : 1,
      pointName: form.pointName!,
      mainCable: form.mainCable!,
      category: form.category || "",
      totalPort: parseInt(form.totalPort as any) || 0,
      sparePort: parseInt(form.sparePort as any) || 0,
      latitude: parseFloat(form.latitude as any) || 0,
      longitude: parseFloat(form.longitude as any) || 0,
      fiberType: form.fiberType || "",
      areaCondition: form.areaCondition || "",
      status: form.status || "Active",
      createdDate: new Date().toISOString().split("T")[0],
    };

    setPoints([...points, newPoint]);
    setForm({});
    setSearchTerm("");
    setStatusFilter("All");
  };

  const filteredPoints = points.filter(point => {
    const matchesSearch = 
      point.pointName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.mainCable.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || point.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status: string) => {
    switch(status) {
      case "Active": return "badge badge-success";
      case "Inactive": return "badge badge-error";
      case "Maintenance": return "badge badge-warning";
      default: return "badge badge-info";
    }
  };

  const getPortUtilization = (total: number, spare: number) => {
    const used = total - spare;
    const percentage = total > 0 ? (used / total) * 100 : 0;
    
    if (percentage >= 90) return "bg-error";
    if (percentage >= 75) return "bg-warning";
    return "bg-success";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Fiber Network Points</h1>
          <p className="text-gray-600">Manage all fiber network points in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="stat-title">Total Points</div>
              <div className="stat-value text-primary">{points.length}</div>
              <div className="stat-desc">All network points</div>
            </div>
          </div>
          
          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="stat-title">Active Points</div>
              <div className="stat-value text-secondary">{points.filter(p => p.status === "Active").length}</div>
              <div className="stat-desc">Currently operational</div>
            </div>
          </div>
          
          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="stat-title">Total Ports</div>
              <div className="stat-value text-accent">{points.reduce((sum, p) => sum + p.totalPort, 0)}</div>
              <div className="stat-desc">Across all points</div>
            </div>
          </div>
          
          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <div className="stat-title">Spare Ports</div>
              <div className="stat-value text-blue-500">{points.reduce((sum, p) => sum + p.sparePort, 0)}</div>
              <div className="stat-desc">Available for use</div>
            </div>
          </div>
        </div>

        {/* Add Point Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-indigo-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            Add New Point
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { field: "pointName", label: "Point Name", type: "text", required: true },
              { field: "mainCable", label: "Main Cable", type: "text", required: true },
              { field: "category", label: "Category", type: "text", required: false },
              { field: "totalPort", label: "Total Ports", type: "number", required: false },
              { field: "sparePort", label: "Spare Ports", type: "number", required: false },
              { field: "latitude", label: "Latitude", type: "number", step: "0.000001", required: false },
              { field: "longitude", label: "Longitude", type: "number", step: "0.000001", required: false },
              { field: "fiberType", label: "Fiber Type", type: "text", required: false },
              { field: "areaCondition", label: "Area Condition", type: "text", required: false },
            ].map(({ field, label, type, required, step }) => (
              <div key={field} className="form-control">
                <label className="label">
                  <span className="label-text font-medium">{label}{required && " *"}</span>
                </label>
                <input
                  type={type}
                  name={field}
                  step={step}
                  value={(form as any)[field] || ""}
                  onChange={handleChange}
                  placeholder={label}
                  className="input input-bordered input-primary bg-gray-50"
                  required={required}
                />
              </div>
            ))}
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Status *</span>
              </label>
              <select
                name="status"
                value={form.status || "Active"}
                onChange={handleChange}
                className="select select-bordered select-primary bg-gray-50"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            
            <div className="form-control md:col-span-2 lg:col-span-3 flex justify-end pt-4">
              <button 
                type="submit" 
                className="btn btn-primary px-8 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Add Point
              </button>
            </div>
          </form>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-5 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="text-lg font-medium text-gray-700">
            Point Records: <span className="text-primary font-bold">{filteredPoints.length}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            
            <input 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="Search points..." 
              className="input input-bordered w-full md:w-auto"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-indigo-100 text-indigo-800">
                <tr>
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Point Name</th>
                  <th className="px-4 py-3 font-semibold">Main Cable</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Ports</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Fiber Type</th>
                  <th className="px-4 py-3 font-semibold">Area Condition</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Created Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredPoints.length > 0 ? (
                  filteredPoints.map((point, idx) => (
                    <tr key={point.id} className="hover:bg-indigo-50 transition-colors">
                      <td className="px-4 py-3 font-medium">{idx + 1}</td>
                      <td className="px-4 py-3">{point.pointName}</td>
                      <td className="px-4 py-3">{point.mainCable}</td>
                      <td className="px-4 py-3">{point.category}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <div className="flex justify-between text-sm">
                            <span>Total: {point.totalPort}</span>
                            <span>Spare: {point.sparePort}</span>
                          </div>
                          {point.totalPort > 0 && (
                            <progress 
                              className={`progress h-2 mt-1 ${getPortUtilization(point.totalPort, point.sparePort)}`} 
                              value={point.totalPort - point.sparePort} 
                              max={point.totalPort}
                            ></progress>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {point.latitude && point.longitude ? (
                          <span className="text-xs">
                            {point.latitude.toFixed(6)},<br/>{point.longitude.toFixed(6)}
                          </span>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-3">{point.fiberType}</td>
                      <td className="px-4 py-3">{point.areaCondition}</td>
                      <td className="px-4 py-3">
                        <span className={`badge badge-sm ${getStatusClass(point.status)}`}>
                          {point.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{point.createdDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center py-8 text-gray-500">
                      {points.length === 0 ? 'No points found. Add your first point using the form above.' : 'No points match your search.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}