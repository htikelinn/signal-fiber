// src/App.tsx
import { useState } from "react";
import LeafletMap from "./Map";

export default function App() {
  const [selected, setSelected] = useState("center");

  const center = { lat: 16.8794118, lng: 96.1420957 }; // Yangon 16.8794118, 96.1420957
  const markers = [
    { lat: 16.8794118, lng: 96.1420957 }, // Main Point
    { lat: 16.8661, lng: 96.1951 }, // Another point
  ];
  const zoom = 12;
  const coordinateInfo = {
    utm: "47N 195495.84E 1868421.43N",
    mmUtm: "JU958681",
    mgrs: "47QJU9549568421",
  };

  // Compute current map position based on selection
  const currentCenter =
    selected === "marker1"
      ? markers[0]
      : selected === "marker2"
      ? markers[1]
      : center;

  return (
    <div className="container mx-auto p-6 space-y-6 my-auto">
      <h1 className="text-3xl font-bold text-center text-indigo-600">
        Main Cable Map
      </h1>

      {/* 🔎 Search Bar */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        <select
          className="select select-bordered w-full sm:w-60"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="center">
            Center 
          </option>
          <option value="marker1">
            Marker 1 
          </option>
          <option value="marker2">
            Marker 2 
          </option>
        </select>

        <input
          type="text"
          placeholder="Point Name"
          className="input input-bordered w-full sm:w-60"
        />

        <button className="btn btn-primary w-full sm:w-auto">Search</button>
      </div>

      {/* 🗺️ Map Section */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <LeafletMap
          center={currentCenter}
          markers={markers}
          zoom={zoom}
          coordinateInfo={coordinateInfo}
        />
      </div>
    </div>
  );
}
