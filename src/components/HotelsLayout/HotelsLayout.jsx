import React from "react";
import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotel } from "../../context/HotelsProvidee";

function HotelsLayout() {
  const { hotels } = useHotel();

  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map dataMarker={hotels} />
    </div>
  );
}

export default HotelsLayout;
