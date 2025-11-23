import "./Map.css";
import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ChargerMarker from "./ChargerMarker/ChargerMarker";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const LIBRARIES = ["places", "marker", "geometry"];

export default function Map() {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [chargers, setChargers] = useState([]);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  const defaultLocation = { lat: 38.7169, lng: -9.1397 };

  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        () => setUserLocation(defaultLocation)
      );
    } else {
      setUserLocation(defaultLocation);
    }
  }, []);

  const mapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapId: import.meta.env.VITE_MAPS_ID,
  };

  
  const userIcon = mapsLoaded && window.google?.maps ? {
    path: window.google.maps.SymbolPath.CIRCLE,
    scale: 10,
    fillColor: "#4285F4",
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: "white",
  } : null;

 
  const fetchChargers = async () => {
    if (!mapsLoaded || !mapRef.current || !window.google?.maps) return;

    try {
      const { Place } = await window.google.maps.importLibrary("places");

      const center = mapRef.current.getCenter();

      const request = {
        locationRestriction: {
          center: { lat: center.lat(), lng: center.lng() },
          radius: 3000,
        },
        includedTypes: ["electric_vehicle_charging_station"],
        fields: ["displayName", "location", "formattedAddress"], // <- removi placeId
      };
      
      const { places } = await Place.searchNearby(request);
      
      const normalized = places.map((p, idx) => {
        const loc = p.location;
        if (!loc?.lat || !loc?.lng) return null;
      
        return {
          place_id: p.id || idx,
          name: p.displayName || "Carregador",
          formatted_address: p.formattedAddress || "Endereço indisponível",
          geometry: {
            location: new window.google.maps.LatLng(loc.lat(), loc.lng()),
          },
        };
      }).filter(Boolean);

      setChargers(normalized);
  
    } catch (err) {
      console.error("Erro ao buscar carregadores:", err);
      setChargers([]);
    }
  };

  
  useEffect(() => {
    if (mapsLoaded && mapRef.current) {
      fetchChargers();
    }
  }, [mapsLoaded]);

  if (!userLocation) return <p>Obtendo sua localização...</p>;

  return (
    <div className="map__container">
      <h2 className="map__title">Mapa de Pontos de Recarga</h2>
      <div className="map__content">
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
          libraries={LIBRARIES}
          onLoad={() => setMapsLoaded(true)}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation}
            zoom={14}
            options={mapOptions}
            onLoad={(map) => {
              mapRef.current = map;
              setMapsLoaded(true);
            }}
          >
            
            {userLocation && userIcon && <Marker position={userLocation} icon={userIcon} />}

           
            {chargers.map((place, idx) => (
            <ChargerMarker
              key={place.place_id || idx} 
              place={place}
              map={mapRef.current}
              userLocation={userLocation}
            />
          ))}
          </GoogleMap>
        </LoadScript>

        <button className="map__btn" onClick={fetchChargers}>
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