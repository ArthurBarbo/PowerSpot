import "./ChargerMarker.css";
import { useEffect } from "react";

export default function ChargerMarker({ place, map, userLocation, onClick }) {
  useEffect(() => {
    if (!map || !place || !userLocation) return;

    const marker = new window.google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
      icon: "/charger-icon.png", // seu ícone personalizado
    });

    const infoWindow = new window.google.maps.InfoWindow();
    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      placeId: place.place_id,
      fields: ["name", "formatted_address", "types", "geometry", "rating", "user_ratings_total"],
    };

    service.getDetails(request, (details, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        // Calcular distância aproximada
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          details.geometry.location,
          new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
        );

        // Filtrar tipos de carregamento
        const chargingType = details.types.includes("electric_vehicle_charging_station")
          ? "Carregamento elétrico"
          : details.types.join(", ");

        const content = `
          <div>
            <h3>${details.name}</h3>
            <p>Distância: ${(distance / 1000).toFixed(2)} km</p>
            <p>Tipo: ${chargingType}</p>
            <p>Endereço: ${details.formatted_address || "N/A"}</p>
            <p>Rating: ${details.rating || "N/A"} (${details.user_ratings_total || 0} avaliações)</p>
          </div>
        `;

        // Abre InfoWindow ao clicar no marker
        marker.addListener("click", () => {
          infoWindow.setContent(content);
          infoWindow.open(map, marker);

          // Opcional: dispara callback para mostrar nos cards
          if (onClick) onClick(details);
        });
      }
    });

    return () => marker.setMap(null);
  }, [map, place, userLocation, onClick]);

  return null;
}