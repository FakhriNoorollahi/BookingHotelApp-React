import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await axios.get(url, signal);
        setData(data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, loading };
}
