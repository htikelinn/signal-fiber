// src/components/LeafletMap.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker issue (Leaflet requires explicit icon path in Vite)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers: { lat: number; lng: number }[];
  coordinateInfo?: {
    utm?: string;
    mmUtm?: string;
    mgrs?: string;
  };
}

const LeafletMap: React.FC<MapProps> = ({ center, zoom, markers, coordinateInfo }) => {
  // Custom icon
  const icon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((position, index) => (
        <Marker key={index} position={position} icon={icon}>
          <Popup>
            <div style={{ padding: "8px", fontFamily: "Arial, sans-serif" }}>
              <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>Coordinate Information</h3>
              <div style={{ fontSize: "12px", lineHeight: "1.4" }}>
                <strong>Lat/Lon:</strong> {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
                <br />
                {coordinateInfo?.utm && (
                  <>
                    <strong>UTM:</strong> {coordinateInfo.utm}
                    <br />
                  </>
                )}
                {coordinateInfo?.mmUtm && (
                  <>
                    <strong>MM_UTM:</strong> {coordinateInfo.mmUtm}
                    <br />
                  </>
                )}
                {coordinateInfo?.mgrs && (
                  <>
                    <strong>MGRS:</strong> {coordinateInfo.mgrs}
                  </>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
