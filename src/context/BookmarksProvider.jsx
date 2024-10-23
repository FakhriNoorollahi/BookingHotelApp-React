import { createContext, useContext, useEffect, useReducer } from "react";

import axios from "axios";
import toast from "react-hot-toast";

const BookmarksContext = createContext();

const INIT_STATE = {
  bookmarks: [],
  currentBookmark: null,
  error: null,
  loading: false,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "error":
      return { ...state, loading: false, error: action.payload };
    case "currentBookmark":
      return { ...state, loading: false, currentBookmark: action.payload };
    case "delete":
      return {
        ...state,
        loading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: null,
      };
    case "add":
      return {
        ...state,
        loading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "allbookmark":
      return { ...state, loading: false, bookmarks: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function BookmarksProvider({ children }) {
  const [{ bookmarks, loading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    INIT_STATE
  );

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(
          `http://localhost:5000/bookmarks`,
          signal
        );

        dispatch({ type: "allbookmark", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({
          type: "error",
          payload: "an Errror occurred in loading bookmarks",
        });
      }
    }
    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);

  async function getCurrentBookmark(id) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`http://localhost:5000/bookmarks/${id}`);
      dispatch({ type: "currentBookmark", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "error",
        payload: "an Errror occurred in loading bookmarks",
      });
    }
  }

  const deleteBookmark = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/bookmarks/${id}`);
      dispatch({ type: "delete", payload: id });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "error", payload: error.message });
    }
  };

  const addNewBookmark = async (newBookmark) => {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(
        `http://localhost:5000/bookmarks`,
        newBookmark
      );
      dispatch({ type: "add", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "error", payload: error.message });
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        deleteBookmark,
        addNewBookmark,
        getCurrentBookmark,
        bookmarks,
        loading,
        currentBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export default BookmarksProvider;

export function useBookmarks() {
  return useContext(BookmarksContext);
}
