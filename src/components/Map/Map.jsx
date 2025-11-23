import "./Map.css";
import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ChargerMarker from "./ChargerMarker/ChargerMarker";

import EletricStation1 from "/charging-station-1.svg";
import EletricStation2 from "/charging-station-2.svg";
import EletricStation3 from "/charging-station-3.svg";
import EletricStation4 from "/charging-station-4.svg";
import EletricStation5 from "/charging-station-5.svg";
import EletricStation6 from "/charging-station-6.svg";

const images = [
  EletricStation1, EletricStation2, EletricStation3,
  EletricStation4, EletricStation5, EletricStation6
];

const containerStyle = { width: "100%", height: "700px" };
const LIBRARIES = ["places", "marker", "geometry"];

export default function Map({ setCardsForUI }) { 
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [chargers, setChargers] = useState([]);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [activePlaceId, setActivePlaceId] = useState(null);

  const defaultLocation = { lat: 38.7169, lng: -9.1397 };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation(defaultLocation)
      );
    } else setUserLocation(defaultLocation);
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
        locationRestriction: { center: { lat: center.lat(), lng: center.lng() }, radius: 3000 },
        includedTypes: ["electric_vehicle_charging_station"],
        fields: ["displayName", "location", "formattedAddress"],
      };

      const { places } = await Place.searchNearby(request);

      const normalized = places.map((p, idx) => {
        const loc = p.location;
        if (!loc?.lat || !loc?.lng) return null;

        // imagem aleatória
        const image = images[Math.floor(Math.random() * images.length)];

        return {
          place_id: p.id || idx,
          name: p.displayName || "Carregador",
          formatted_address: p.formattedAddress || "Endereço indisponível",
          geometry: { location: new window.google.maps.LatLng(loc.lat(), loc.lng()) },
          image, // <- adicionamos aqui
        };
      }).filter(Boolean);

      setChargers(normalized);

      if (setCardsForUI) {
        const sorted = normalized.sort((a, b) => {
          const distA = window.google.maps.geometry.spherical.computeDistanceBetween(
            a.geometry.location,
            new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
          );
          const distB = window.google.maps.geometry.spherical.computeDistanceBetween(
            b.geometry.location,
            new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
          );
          return distA - distB;
        });
      
        const top4 = sorted.slice(0, 4); // <- pegar apenas os 4 mais próximos
      
        const cards = top4.map(c => ({
          id: c.place_id,
          title: c.name,
          description: c.formatted_address,
          image: c.image,
        }));
        setCardsForUI(cards);
      }

    } catch (err) {
      console.error("Erro ao buscar carregadores:", err);
      setChargers([]);
      if (setCardsForUI) setCardsForUI([]);
    }
  };

  useEffect(() => { if (mapsLoaded && mapRef.current) fetchChargers(); }, [mapsLoaded]);

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
            onLoad={map => { mapRef.current = map; setMapsLoaded(true); }}
          >
            {userLocation && userIcon && <Marker position={userLocation} icon={userIcon} />}
            {chargers.map((place, idx) => (
              <ChargerMarker key={place.place_id || idx} place={place} map={mapRef.current} userLocation={userLocation} activePlaceId={activePlaceId} />
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