import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../Loader/Loader";

import { useHotel } from "../../context/HotelsProvidee";

function Hotels() {
  const { hotels, loading, currentHotel } = useHotel();

  if (loading) return <Loader />;
  if (hotels.length === 0) return <strong>There is no hotel</strong>;

  return (
    <div className="searchList">
      <h1>Search Results ({hotels.length})</h1>
      <div>
        {hotels.map((hotel) => (
          <HotelItem key={hotel.id} hotel={hotel} currentHotel={currentHotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;

function HotelItem({ hotel, currentHotel }) {
  return (
    <Link
      to={`${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`}
      className={`searchItem ${
        currentHotel?.id === hotel.id ? "current-hotel" : ""
      }`}
    >
      <img src={hotel.picture_url.url} alt={hotel.name} />
      <div className="searchItemDesc">
        <p className="name">{hotel.name}</p>
        <p className="location">{hotel.host_location}</p>
        <p className="price">
          {hotel.price} &nbsp;€&nbsp;<span> night</span>
        </p>
      </div>
    </Link>
  );
}
