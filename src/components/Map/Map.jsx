import "./Map.css";
import React, { useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "800px",
};

const chargingStations = [
  { id: 1, lat: -23.551, lng: -46.634, name: "Estação 1" },
  { id: 2, lat: -23.552, lng: -46.632, name: "Estação 2" },
  { id: 3, lat: -23.553, lng: -46.635, name: "Estação 3" },
];

export default function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    chargingStations.forEach((station) => {
      new window.google.maps.marker.AdvancedMarkerElement({
        position: { lat: station.lat, lng: station.lng },
        map: mapRef.current,
        title: station.name,
      });
    });
  }, []);

  return (
    <div className="map__container">
      <h2 className="map__title">Mapa de Pontos de Recarga</h2>
      <div className="map__content">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: -23.551, lng: -46.634 }}
            zoom={14}
            options={{ mapTypeControl: false, streetViewControl: false }}
            onLoad={(map) => (mapRef.current = map)}
          />
        </LoadScript>

        <button className="map__btn">
          <img
            src="/Charge.png"
            alt="Atualizar Carregadores"
            className="map__icon"
          />
          <span className="map__btn-text">Atualizar</span>
        </button>
      </div>
    </div>
  );
}