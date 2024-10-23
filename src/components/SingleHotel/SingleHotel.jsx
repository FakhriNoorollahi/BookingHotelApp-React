import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchDate";
import Loader from "../Loader/Loader";
import { useHotel } from "../../context/HotelsProvidee";

function SingleHotel() {
  const { id } = useParams();
  const { currentHotel, loadingCurrentHotel, getCurrentHotel } = useHotel();
  useEffect(() => {
    getCurrentHotel(id);
  }, [id]);

  if (loadingCurrentHotel || !currentHotel) return <Loader />;

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} review &bull; {currentHotel.city}{" "}
          {currentHotel.country}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
