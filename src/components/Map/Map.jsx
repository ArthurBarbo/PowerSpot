import "./Map.css";
import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import ChargerMarker from "./ChargerMarker/ChargerMarker";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const libraries = ["places"];

export default function Map() {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [chargers, setChargers] = useState([]);

  const defaultLocation = { lat: 38.7169, lng: -9.1397 };

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
          console.warn(
            "Não foi possível obter a localização, usando fallback:",
            error.code,
            error.message
          );
          setUserLocation(defaultLocation);
        }
      );
    } else {
      console.warn("Geolocalização não suportada pelo navegador. Usando fallback.");
      setUserLocation(defaultLocation);
    }
  }, []);

  // Options do mapa
  const mapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
      { featureType: "poi", stylers: [{ visibility: "off" }] },
      { featureType: "transit", stylers: [{ visibility: "off" }] },
      { featureType: "administrative", stylers: [{ visibility: "off" }] },
    ],
  };

  // Função para buscar e renderizar carregadores
  const fetchChargers = () => {
    if (!mapRef.current || !window.google || !userLocation) return;

    const service = new window.google.maps.places.PlacesService(mapRef.current);

    const request = {
      location: userLocation,
      radius: 3000, 
      type: "electric_vehicle_charging_station",
    };

    service.nearbySearch(request, (results, status) => {
      console.log("NearbySearch status:", status);
      console.log("NearbySearch results:", results);

      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
       setChargers(results);

      } else {
        console.warn("Não foi possível buscar carregadores:", status);
        setChargers([]);
      }
    });
  };

  if (!userLocation) return <p>Obtendo sua localização...</p>;

  return (
    <div className="map__container">
      <h2 className="map__title">Mapa de Pontos de Recarga</h2>
      <div className="map__content">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY} libraries={libraries}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation}
            zoom={14}
            options={mapOptions}
            onLoad={(map) => {
              mapRef.current = map;
              fetchChargers();
            }}
            >
           
    {chargers.map((place) => (
      <ChargerMarker
        key={place.place_id}
        place={place}
        map={mapRef.current}
        userLocation={userLocation}
      />
    ))}
        </GoogleMap>
        </LoadScript>

        <button
          className="map__btn"
          onClick={() => {
            fetchChargers(); // Atualiza carregadores ao clicar
          }}
        >
          <img src="/Charge.png" alt="Atualizar Carregadores" className="map__icon" />
          <span className="map__btn-text">Atualizar</span>
        </button>
      </div>
    </div>
  );
}