import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setLoading(false);
        setData(response.data);
        
      } catch (error) {
        setError(error);
      }
      
    };
    fetchData(url);
  },[url]);

  const reFetchData = async () => {
    setLoading = true;
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, error, loading, reFetchData };
};

export default useFetch;
