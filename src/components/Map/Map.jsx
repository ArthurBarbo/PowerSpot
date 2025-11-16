import "./Map.css";
import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const chargingStations = [
    { id: 1, lat: 38.7175, lng: -9.1380, name: "Estação 1" },
    { id: 2, lat: 38.7160, lng: -9.1400, name: "Estação 2" },
    { id: 3, lat: 38.7180, lng: -9.1420, name: "Estação 3" },
  ];

export default function Map() {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current || !window.google || !userLocation) return;
  
    const stations = [
      { id: 1, lat: userLocation.lat + 0.001, lng: userLocation.lng + 0.001, name: "Estação 1" },
      { id: 2, lat: userLocation.lat - 0.001, lng: userLocation.lng - 0.001, name: "Estação 2" },
    ];
  
    stations.forEach((station) => {
      new window.google.maps.marker.AdvancedMarkerElement({
        position: { lat: station.lat, lng: station.lng },
        map: mapRef.current,
        title: station.name,
      });
    });
  }, [userLocation]);

if (!userLocation) return <p>Obtendo sua localização...</p>;


const mapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
      { featureType: "poi", stylers: [{ visibility: "off" }] }, // esconde pontos de interesse
      { featureType: "transit", stylers: [{ visibility: "off" }] }, // transporte público
      { featureType: "administrative", stylers: [{ visibility: "off" }] }, // labels admin
      
    ],
  };


return (
    <div className="map__container">
      <h2 className="map__title">Mapa de Pontos de Recarga - Lisboa</h2>
      <div className="map__content">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: 38.7169, lng: -9.1397 }}
            zoom={14}
            options={ mapOptions }
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