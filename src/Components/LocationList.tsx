
import React, { useState } from "react";

type Location = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  updatedTime: string;
};

const initialLocations: Location[] = [
  { id: 1, name: "Test User 105", latitude: 12.436568, longitude: 98.6066194, updatedTime: "17/05/2025 02:22 PM" },
  { id: 2, name: "Test User 106", latitude: 12.4602014, longitude: 98.6164562, updatedTime: "01/06/2025 03:27 PM" },
  { id: 3, name: "Test User 12", latitude: 12.4241012, longitude: 98.6114629, updatedTime: "08/04/2025 10:08 AM" },
  { id: 4, name: "Test User 120", latitude: 0.0, longitude: 0.0, updatedTime: "05/02/2025 12:00 PM" },
  { id: 5, name: "Test User 123", latitude: 12.4527119, longitude: 98.6111759, updatedTime: "23/04/2025 02:27 PM" },
  { id: 6, name: "Test User 126", latitude: 12.438763, longitude: 98.604925, updatedTime: "09/04/2025 04:06 PM" },
  { id: 7, name: "Test User 129", latitude: 12.4320838, longitude: 98.6008484, updatedTime: "28/02/2025 02:38 PM" },
  { id: 8, name: "Test User 131", latitude: 12.4527179, longitude: 98.6111612, updatedTime: "07/01/2025 03:06 PM" },
  { id: 9, name: "Test User 14", latitude: 0.0, longitude: 0.0, updatedTime: "26/04/2024 10:36 AM" },
  { id: 10, name: "Test User 18", latitude: 12.4557319, longitude: 98.6512926, updatedTime: "19/05/2025 05:45 AM" },
];

const LocationList: React.FC = () => {
  const [locations] = useState<Location[]>(initialLocations);
  const [nameFilter, setNameFilter] = useState("");

  const reset = () => setNameFilter("");
  const filtered = locations.filter((loc) => loc.name.toLowerCase().includes(nameFilter.toLowerCase()));

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Location List</h1>

      {/* Filter */}
      <div className="border border-gray-200 rounded-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
            <input
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              placeholder="Admin User Name"
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div className="flex space-x-3">
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
      </div>

      {/* Table */}
      <div className="border-t border-gray-100" />

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="text-gray-500">
            <tr>
              <th className="py-3 pr-6">#</th>
              <th className="py-3">Name</th>
              <th className="py-3">Latitude</th>
              <th className="py-3">Longitude</th>
              <th className="py-3">Location Updated Time</th>
              <th className="py-3">Map</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((loc, idx) => (
              <tr key={loc.id} className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="py-4 pr-6 align-top text-gray-600">{loc.id}</td>
                <td className="py-4 align-top text-gray-700 font-medium">{loc.name}</td>
                <td className="py-4 align-top text-gray-600">{loc.latitude}</td>
                <td className="py-4 align-top text-gray-600">{loc.longitude}</td>
                <td className="py-4 align-top text-gray-600">{loc.updatedTime}</td>
                <td className="py-4 align-top">
                  <button className="text-sky-600 hover:underline">View Map</button>
                </td>
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

export default LocationList;
