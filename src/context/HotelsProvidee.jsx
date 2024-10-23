import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchDate";
import toast from "react-hot-toast";
import axios from "axios";

const HotelsContext = createContext();

export function HotelsProvider({ children }) {
  const [currentHotel, setCurrentHotel] = useState();
  const [loadingCurrentHotel, setLoadingCurrentHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = searchParams.get("room") || 1;

  const { data: hotels, loading } = useFetchData(
    ` http://localhost:5000/hotels?q=${
      destination || ""
    }&accommodates_gte=${room}`
  );

  async function getCurrentHotel(id) {
    setLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(
        ` http://localhost:5000/hotels?id=${id}`
      );
      setCurrentHotel(data[0]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelsContext.Provider
      value={{
        hotels,
        loading,
        currentHotel,
        loadingCurrentHotel,
        getCurrentHotel,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
}

export function useHotel() {
  return useContext(HotelsContext);
}
