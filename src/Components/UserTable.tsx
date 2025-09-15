import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import data from "../assets/user_data.json";

// Define the interface for a User
interface User {
  id: number;
  Name: string;
  LoginName: string;
  PhoneNumber: string;
  IsTeamLeader: boolean;
  IsEmployee: boolean;
  IsSystemAccess: boolean;
  UserRole: string;
  Status: "Active" | "Inactive";
  CreatedDate: string;
}

// Define the form state type (without id, which is generated)
interface UserForm {
  Name: string;
  LoginName: string;
  PhoneNumber: string;
  IsTeamLeader: boolean;
  IsEmployee: boolean;
  IsSystemAccess: boolean;
  UserRole: string;
  Status: "Active" | "Inactive";
  CreatedDate: string;
}

export default function UserTable() {
  const [rows, setRows] = useState<User[]>([]);
  const [form, setForm] = useState<UserForm>({
    Name: "",
    LoginName: "",
    PhoneNumber: "",
    IsTeamLeader: false,
    IsEmployee: true,
    IsSystemAccess: true,
    UserRole: "",
    Status: "Active",
    CreatedDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    setRows(data as User[]); // load data from JSON
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, ariaChecked: checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newRow: User = { id: rows.length + 1, ...form };
    setRows((prev) => [...prev, newRow]);
    setForm({
      Name: "",
      LoginName: "",
      PhoneNumber: "",
      IsTeamLeader: false,
      IsEmployee: true,
      IsSystemAccess: true,
      UserRole: "",
      Status: "Active",
      CreatedDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">User Management</h1>
          <p className="text-gray-600">Manage your team members and their permissions</p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-indigo-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            Add New User
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  name="Name"
                  value={form.Name}
                  onChange={handleChange}
                  className="input input-bordered input-primary bg-gray-50"
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Login Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter login name"
                  name="LoginName"
                  value={form.LoginName}
                  onChange={handleChange}
                  className="input input-bordered input-primary bg-gray-50"
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Phone Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  name="PhoneNumber"
                  value={form.PhoneNumber}
                  onChange={handleChange}
                  className="input input-bordered input-primary bg-gray-50"
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">User Role</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter user role"
                  name="UserRole"
                  value={form.UserRole}
                  onChange={handleChange}
                  className="input input-bordered input-primary bg-gray-50"
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Status</span>
                </label>
                <select
                  name="Status"
                  value={form.Status}
                  onChange={handleChange}
                  className="select select-bordered select-primary bg-gray-50"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Created Date</span>
                </label>
                <input
                  type="text"
                  name="CreatedDate"
                  value={form.CreatedDate}
                  className="input input-bordered bg-gray-100"
                  readOnly
                />
              </div>
            </div>
            
            {/* Checkbox Group */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    name="IsTeamLeader"
                    checked={form.IsTeamLeader}
                    onChange={handleChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text font-medium">Team Leader</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    name="IsEmployee"
                    checked={form.IsEmployee}
                    onChange={handleChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text font-medium">Employee</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    name="IsSystemAccess"
                    checked={form.IsSystemAccess}
                    onChange={handleChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text font-medium">System Access</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                className="btn btn-primary px-8 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Add User
              </button>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-indigo-100 text-indigo-800">
                <tr>
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Login Name</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Team Leader</th>
                  <th className="px-4 py-3 font-semibold">Employee</th>
                  <th className="px-4 py-3 font-semibold">System Access</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Created Date</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-indigo-50 transition-colors">
                    <td className="px-4 py-3 font-medium">{row.id}</td>
                    <td className="px-4 py-3">{row.Name}</td>
                    <td className="px-4 py-3">{row.LoginName}</td>
                    <td className="px-4 py-3">{row.PhoneNumber}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${row.IsTeamLeader ? 'badge-success' : 'badge-error'} badge-sm`}>
                        {row.IsTeamLeader ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${row.IsEmployee ? 'badge-success' : 'badge-error'} badge-sm`}>
                        {row.IsEmployee ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${row.IsSystemAccess ? 'badge-success' : 'badge-error'} badge-sm`}>
                        {row.IsSystemAccess ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge badge-info badge-sm">{row.UserRole}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${row.Status === 'Active' ? 'badge-success' : 'badge-error'} badge-sm`}>
                        {row.Status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.CreatedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="stats shadow bg-white mt-8 w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{rows.length}</div>
            <div className="stat-desc">All registered users in the system</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div className="stat-title">Active Users</div>
            <div className="stat-value text-secondary">
              {rows.filter(row => row.Status === 'Active').length}
            </div>
            <div className="stat-desc">Currently active users</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            </div>
            <div className="stat-title">Team Leaders</div>
            <div className="stat-value text-info">
              {rows.filter(row => row.IsTeamLeader).length}
            </div>
            <div className="stat-desc">Users with team leader privileges</div>
          </div>
        </div>
      </div>
    </div>
  );
}