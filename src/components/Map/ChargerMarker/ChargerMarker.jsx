import { useEffect } from "react";
import "./ChargerMarker.css"; // Para estilizar o InfoWindow, se quiser

export default function ChargerMarker({ place, map, userLocation }) {
  useEffect(() => {
    if (!map || !place || !userLocation) return;

    const marker = new window.google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
    });

    const infoWindow = new window.google.maps.InfoWindow();
    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      placeId: place.place_id,
      fields: [
        "name",
        "formatted_address",
        "types",
        "geometry",
        "rating",
        "user_ratings_total",
      ],
    };

    service.getDetails(request, (details, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        details.types?.includes("electric_vehicle_charging_station") // Filtra somente carregadores
      ) {
        // Calcular distância aproximada
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          details.geometry.location,
          new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
        );

        const content = `
          <div class="custom-infowindow">
            <h3>${details.name}</h3>
            <p>Distância: ${(distance / 1000).toFixed(2)} km</p>
            <p>Tipo: Carregamento elétrico</p>
            <p>Endereço: ${details.formatted_address || "N/A"}</p>
            <p>Rating: ${details.rating || "N/A"} (${details.user_ratings_total || 0} avaliações)</p>
          </div>
        `;

        marker.addListener("click", () => {
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        });
      } else {
        // Se não for estação de carregamento, remove o marker
        marker.setMap(null);
      }
    });

    // Limpeza ao desmontar
    return () => marker.setMap(null);
  }, [map, place, userLocation]);

  return null;
}