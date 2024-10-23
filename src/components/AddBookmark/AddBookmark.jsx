import React from "react";

import ReactCountryFlag from "react-country-flag";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchDate";
import Loader from "../Loader/Loader";

import { useBookmarks } from "../../context/BookmarksProvider";

function AddBookmark() {
  const { addNewBookmark } = useBookmarks();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();

  const { loading, data: newBookmark } = useFetchData(
    `
    https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  );

  const handleSubmit = async (e, newBookmark) => {
    e.preventDefault();
    const { city, countryCode, countryName, latitude, longitude } = newBookmark;

    if (!city || !countryName) return;
    const newBookmark1 = {
      city,
      countryCode,
      countryName,
      latitude,
      longitude,
      host_location: `${city} ${countryName}`,
    };
    await addNewBookmark(newBookmark1);
    navigate("/bookmarks");
  };

  if (loading || !newBookmark) return <Loader />;

  return (
    <div>
      <h1>Bookmark New Location</h1>
      <form className="form" onSubmit={(e) => handleSubmit(e, newBookmark)}>
        <div className="formControl">
          <label htmlFor="">cityName</label>
          <input type="text" defaultValue={newBookmark.city} />
        </div>
        <div className="formControl">
          <label htmlFor="">Country</label>
          <input type="text" defaultValue={newBookmark.countryName} />
          <ReactCountryFlag countryCode svg className="flag" />
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            back
          </button>
          <button className="btn btn--primary" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBookmark;
