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
        () => {
          setUserLocation(defaultLocation);
        }
      );
    } else {
      setUserLocation(defaultLocation);
    }
  }, []);

  const mapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
      { featureType: "poi", stylers: [{ visibility: "on" }] },
      { featureType: "transit", stylers: [{ visibility: "on" }] },
      { featureType: "administrative", stylers: [{ visibility: "off" }] },
    ],
  };

  
  const fetchChargers = async () => {
    if (!mapRef.current || !userLocation) return;

    const bounds = mapRef.current.getBounds();
    if (!bounds) return;

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    // Pegando o centro da área visível para a busca
    const center = mapRef.current.getCenter();
    const lat = center.lat();
    const lng = center.lng();

    // Requisição HTTP para a nova Places API
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=electric_vehicle_charging_station&key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}`
      );
      const data = await response.json();

      if (data.results) {
        
        const evChargers = data.results.filter(
          place =>
            place.geometry?.location &&
            place.types?.includes("electric_vehicle_charging_station")
        );

        setChargers(evChargers);
      }
    } catch (error) {
      console.error("Erro ao buscar carregadores:", error);
      setChargers([]);
    }
  };

  if (!userLocation) return <p>Obtendo sua localização...</p>;

  return (
    <div className="map__container">
      <h2 className="map__title">Mapa de Pontos de Recarga</h2>
      <div className="map__content">
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
          libraries={libraries}
        >
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

        <button className="map__btn" onClick={fetchChargers}>
          <img src="/Charge.png" alt="Atualizar Carregadores" className="map__icon" />
          <span className="map__btn-text">Atualizar</span>
        </button>
      </div>
    </div>
  );
}