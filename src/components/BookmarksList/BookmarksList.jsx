import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";
import Loader from "../Loader/Loader";
import { useBookmarks } from "../../context/BookmarksProvider";

import { Link } from "react-router-dom";

function BookmarksList() {
  const { bookmarks, loading, deleteBookmark } = useBookmarks();

  if (loading || bookmarks.length === 0) return <Loader />;

  return (
    <div className="bookmarkList">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          deleteBookmark={deleteBookmark}
        />
      ))}
    </div>
  );
}

export default BookmarksList;

function BookmarkItem({ bookmark, deleteBookmark }) {
  return (
    <Link
      className="bookmarkItem"
      to={`${bookmark.id}?city=${bookmark.city}&country=${bookmark.countryName}`}
    >
      <div>
        <ReactCountryFlag countryCode={bookmark.countryCode} svg />
        &nbsp;&nbsp;<strong>{bookmark.city}</strong> &nbsp;
        <span>{bookmark.countryName}</span>
      </div>
      <button>
        <HiTrash
          className="trash"
          onClick={(e) => deleteBookmark(e, bookmark.id)}
        />
      </button>
    </Link>
  );
}
