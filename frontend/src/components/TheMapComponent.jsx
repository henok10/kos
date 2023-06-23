import React, { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";


import { useSelector } from 'react-redux';

function TheMapComponent({ listingInfo }) {
  const map = useMap();
  const routingControlRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (map) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        error => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  }, [map]);

  useEffect(() => {
    if (map && userLocation && listingInfo) {
      const waypoints = [
        {
          latLng: L.latLng(userLocation.lat, userLocation.lng),
          name: "Starting Point"
        },
        {
          latLng: L.latLng(listingInfo.latitude, listingInfo.longitude),
          name: listingInfo.title
        }
      ];

      const routingControl = L.Routing.control({
        waypoints,
        createMarker: function(i, waypoint, n) {
          const marker = L.marker(waypoint.latLng, {
            draggable: true
          });
      
          marker.bindPopup(waypoint.name);
      
          return marker;
        },
        lineOptions: {
          styles: [{ color: '#6FA1EC', opacity: 1, weight: 6 }]
        },
        // geocoder: L.Control.Geocoder,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: true,
        show: false
      });
      
      routingControl.addTo(map);
    }
  }, [map, userLocation, listingInfo]);

  return null; // Ganti dengan tampilan UI yang sesuai
}

export default TheMapComponent;