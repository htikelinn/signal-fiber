import { useState } from "react";
import customerData from "../assets/Customer.json";

interface CustomerInterface {
    id: number;
    srNo: number;
    customerId: string;
    customerName: string;
    nrc: string;
    phoneNo1: string;
    township: string;
    latitude: number;
    longitude: number;
    pointName: string;
    createdDate: string;
}

export default function Customer() {
  const [customers, setCustomers] = useState<CustomerInterface[]>(customerData);
  const [form, setForm] = useState<Partial<CustomerInterface>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerId || !form.customerName) return;

    const newCustomer: CustomerInterface = {
      id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
      srNo: customers.length + 1,
      customerId: form.customerId!,
      customerName: form.customerName!,
      nrc: form.nrc || "",
      phoneNo1: form.phoneNo1 || "",
      township: form.township || "",
      latitude: parseFloat(form.latitude as any) || 0,
      longitude: parseFloat(form.longitude as any) || 0,
      pointName: form.pointName || "",
      createdDate: new Date().toISOString().split("T")[0],
    };

    setCustomers([...customers, newCustomer]);
    setForm({});
    setSearchTerm("");
  };

  const filteredCustomers = customers.filter(customer =>
    Object.values(customer).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Customer Management</h1>
          <p className="text-gray-600">Manage all your customers in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="stat-title">Total Customers</div>
              <div className="stat-value text-primary">{customers.length}</div>
              <div className="stat-desc">All registered customers</div>
            </div>
          </div>
          
          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="stat-title">With Phone Numbers</div>
              <div className="stat-value text-secondary">{customers.filter(c => c.phoneNo1).length}</div>
              <div className="stat-desc">Customers with contact info</div>
            </div>
          </div>
          
          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="stat-title">With Location</div>
              <div className="stat-value text-accent">{customers.filter(c => c.latitude && c.longitude).length}</div>
              <div className="stat-desc">Customers with coordinates</div>
            </div>
          </div>
          
          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="stat-title">Today's Additions</div>
              <div className="stat-value text-blue-500">
                {customers.filter(c => c.createdDate === new Date().toISOString().split("T")[0]).length}
              </div>
              <div className="stat-desc">New customers today</div>
            </div>
          </div>
        </div>

        {/* Add Customer Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-indigo-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            Add New Customer
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { field: "customerId", label: "Customer ID", type: "text", required: true },
              { field: "customerName", label: "Customer Name", type: "text", required: true },
              { field: "nrc", label: "NRC Number", type: "text", required: false },
              { field: "phoneNo1", label: "Phone Number", type: "text", required: false },
              { field: "township", label: "Township", type: "text", required: false },
              { field: "latitude", label: "Latitude", type: "number", required: false },
              { field: "longitude", label: "Longitude", type: "number", required: false },
              { field: "pointName", label: "Point Name", type: "text", required: false },
            ].map(({ field, label, type, required }) => (
              <div key={field} className="form-control">
                <label className="label">
                  <span className="label-text font-medium">{label}{required && " *"}</span>
                </label>
                <input
                  type={type}
                  name={field}
                  value={(form as any)[field] || ""}
                  onChange={handleChange}
                  placeholder={label}
                  className="input input-bordered input-primary bg-gray-50"
                  required={required}
                />
              </div>
            ))}
            
            <div className="form-control md:col-span-2 lg:col-span-3 flex justify-end pt-4">
              <button 
                type="submit" 
                className="btn btn-primary px-8 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Add Customer
              </button>
            </div>
          </form>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-5 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="text-lg font-medium text-gray-700">
            Customer Records: <span className="text-primary font-bold">{filteredCustomers.length}</span>
          </div>
          <input 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search customers..." 
            className="input input-bordered w-full md:w-1/3"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-indigo-100 text-indigo-800">
                <tr>
                  {customers.length > 0 && Object.keys(customers[0]).map((key) => (
                    <th key={key} className="px-4 py-3 font-semibold uppercase text-xs">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-indigo-50 transition-colors">
                      {Object.values(customer).map((value, index) => (
                        <td key={index} className="px-4 py-3">
                          {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(6) : value}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={Object.keys(customers[0] || {}).length} className="text-center py-8 text-gray-500">
                      {customers.length === 0 ? 'No customers found. Add your first customer using the form above.' : 'No customers match your search.'}
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