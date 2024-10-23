import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchDate";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../../context/BookmarksProvider";

function SingleBookmark() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getCurrentBookmark, currentBookmark, loading } = useBookmarks();

  useEffect(() => {
    getCurrentBookmark(id);
  }, [id]);

  if (loading || !currentBookmark) return <Loader />;
  return (
    <div>
      <button
        className="btn btn--back"
        style={{ marginBottom: "1rem" }}
        onClick={() => navigate(-1)}
      >
        &larr;&nbsp;&nbsp;back
      </button>
      <div className="bookmarkItem">
        <div>
          <strong>{currentBookmark.city}</strong> &nbsp;
          <span>{currentBookmark.countryName}</span>
        </div>
        <ReactCountryFlag countryCode={currentBookmark.countryCode} svg />
      </div>
    </div>
  );
}

export default SingleBookmark;
