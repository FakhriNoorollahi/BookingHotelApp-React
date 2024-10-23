import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useHotel } from "../../context/HotelsProvidee";
import useGetUserLocation from "../../hooks/useGetUserLocation";
import { useNavigate } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarksProvider";

function Map({ dataMarker }) {
  const [centerMap, setCenterMap] = useState([52, 15]);
  const { currentHotel } = useHotel();
  const { currentBookmark } = useBookmarks();

  useEffect(() => {
    if (!currentHotel) return;

    setCenterMap([currentHotel.latitude, currentHotel.longitude]);
  }, [currentHotel]);

  useEffect(() => {
    if (!currentBookmark) return;
    setCenterMap([currentBookmark.latitude, currentBookmark.longitude]);
  }, [currentBookmark]);

  return (
    <div className="mapContainer">
      <MapContainer
        center={centerMap}
        zoom={13}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeCnter coords={centerMap} />
        <DetectClickOnMap />
        {dataMarker.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <button className="getLocation" onClick={useGetUserLocation}>
        get Host Location
      </button>
    </div>
  );
}

export default Map;

function ChangeCnter({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

function DetectClickOnMap(e) {
  const navigate = useNavigate();

  useMapEvents({
    click(e) {
      navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
