import React, { useState } from "react";

const ComplainInfoSetup: React.FC = () => {
  const [formData, setFormData] = useState({
    mainCable: "",
    nrcNumber: "",
    department: "",
    usingMaterial: "",
    startDate: "",
    otdrRecord: "",
    image2: "",
    image4: "",
    status: "",
    selectedDateTime: "",
    pointName: "",
    registerName: "",
    position: "",
    phoneNumber: "",
    issuerProblem: "",
    endDate: "",
    image1: "",
    image3: "",
    image5: "",
    remark: "",
    selectedPoint: "",
  });

  const [selectedFiles, setSelectedFiles] = useState({
    file1: null as File | null,
    file2: null as File | null,
    file3: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileKey: keyof typeof selectedFiles) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFiles(prev => ({
        ...prev,
        [fileKey]: e.target.files![0]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData, selectedFiles);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Complain Info Setup</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Complain Info</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Complain No: <span className="text-gray-400">TBD</span>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Main Cable <span className="text-red-500">*</span>
              </label>
              <select
                name="mainCable"
                value={formData.mainCable}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select Main Cable</option>
                <option value="cable1">Main Cable 1</option>
                <option value="cable2">Main Cable 2</option>
              </select>
            </div>
            
            <div className="mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-2">
                Assign To <span className="text-red-500">*</span>
              </h3>
              
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">NRC Number:</label>
                <input
                  type="text"
                  name="nrcNumber"
                  value={formData.nrcNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Department:</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Using Material:</label>
                <input
                  type="text"
                  name="usingMaterial"
                  value={formData.usingMaterial}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </h3>
              
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">OTDR Record:</label>
                <input
                  type="text"
                  name="otdrRecord"
                  value={formData.otdrRecord}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Image 2:</label>
                <input
                  type="text"
                  name="image2"
                  value={formData.image2}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Image 4:</label>
                <input
                  type="text"
                  name="image4"
                  value={formData.image4}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Status:</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Selected Date Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="selectedDateTime"
                value={formData.selectedDateTime}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Point Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pointName"
                value={formData.pointName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Register Name:</label>
              <input
                type="text"
                name="registerName"
                value={formData.registerName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Position:</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Issuer/Problem <span className="text-red-500">*</span>
              </label>
              <textarea
                name="issuerProblem"
                value={formData.issuerProblem}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            
            <div className="mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-2">End Date</h3>
              
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Image 1:</label>
                <input
                  type="text"
                  name="image1"
                  value={formData.image1}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Image 3:</label>
                <input
                  type="text"
                  name="image3"
                  value={formData.image3}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Image 5:</label>
                <input
                  type="text"
                  name="image5"
                  value={formData.image5}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Remark:</label>
                <textarea
                  name="remark"
                  value={formData.remark}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={2}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Selected Point Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Selected Point</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Select Point</label>
            <select
              name="selectedPoint"
              value={formData.selectedPoint}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select a point</option>
              <option value="point1">Point 1</option>
              <option value="point2">Point 2</option>
              <option value="point3">Point 3</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">File 1:</label>
              <div className="flex items-center">
                <label className="bg-blue-500 text-white px-3 py-2 rounded cursor-pointer text-sm mr-2">
                  Browse...
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'file1')}
                  />
                </label>
                <span className="text-sm text-gray-500">
                  {selectedFiles.file1 ? selectedFiles.file1.name : "No file selected."}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">File 2:</label>
              <div className="flex items-center">
                <label className="bg-blue-500 text-white px-3 py-2 rounded cursor-pointer text-sm mr-2">
                  Browse...
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'file2')}
                  />
                </label>
                <span className="text-sm text-gray-500">
                  {selectedFiles.file2 ? selectedFiles.file2.name : "No file selected."}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">File 3:</label>
              <div className="flex items-center">
                <label className="bg-blue-500 text-white px-3 py-2 rounded cursor-pointer text-sm mr-2">
                  Browse...
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'file3')}
                  />
                </label>
                <span className="text-sm text-gray-500">
                  {selectedFiles.file3 ? selectedFiles.file3.name : "No file selected."}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplainInfoSetup;