import { useEffect } from "react";
import "./ChargerMarker.css";

export default function ChargerMarker({ place, map, userLocation, activePlaceId }) {
  useEffect(() => {
    if (!map || !place || !place.geometry?.location || !userLocation) return;

    const marker = new window.google.maps.marker.AdvancedMarkerElement({
      map,
      position: place.geometry.location,
      title: place.name || "Carregador",
    
    });

    const infoWindow = new window.google.maps.InfoWindow();

    
    const distance =
      window.google.maps.geometry.spherical.computeDistanceBetween(
        place.geometry.location,
        new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
      );

    const content = `
      <div class="custom-infowindow">
        <h3>${place.name || "Estação de carga"}</h3>
        <p>Distância: ${(distance / 1000).toFixed(2)} km</p>
        <p>Endereço: ${place.formatted_address || "N/A"}</p>
      </div>
    `;

    marker.addListener("click", () => {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });

    if (activePlaceId === place.place_id) {
      openInfo();
      map.panTo(place.geometry.location); // centraliza no marker
    }
  

    return () => marker.setMap(null);
  }, [map, place, userLocation]);

  return null;
}