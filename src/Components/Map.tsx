// src/components/LeafletMap.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker issue (Leaflet requires explicit icon path in Vite)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// import "leaflet/dist/leaflet.css";

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
        <div className="flex flex-col h-screen">

            {/* Main Content */}
            <main className="flex-3">
                <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {markers.map((position, index) => (
                        <Marker key={index} position={position} icon={icon}>
                            <Popup>
                                <div className="text-xs leading-snug">
                                    <h3 className="font-semibold mb-1">Coordinate Info</h3>
                                    <strong>Lat/Lon:</strong> {position.lat.toFixed(6)},{" "}
                                    {position.lng.toFixed(6)}
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
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </main>
        </div>
    );
};

export default LeafletMap;
