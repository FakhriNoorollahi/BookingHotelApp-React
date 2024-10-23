import React from "react";
import useFetchData from "../../hooks/useFetchDate";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

function LocationList() {
  const { data: hotels, loading } = useFetchData(
    "http://localhost:5000/hotels"
  );

  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {" "}
        {loading ? (
          <Loader />
        ) : (
          hotels.map((hotel) => <HotelsItem key={hotel.id} hotel={hotel} />)
        )}
      </div>
    </div>
  );
}

export default LocationList;

function HotelsItem({ hotel }) {
  return (
    <Link
      to={`hotels/${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`}
      className="locationItem"
    >
      <img src={hotel.picture_url.url} alt={hotel.name} />
      <div className="locationItemDesc">
        <p className="location">{hotel.host_location}</p>
        <p className="name">{hotel.name}</p>
        <p className="price">
          {hotel.price}&nbsp;€&nbsp;<span> night</span>
        </p>
      </div>
    </Link>
  );
}
