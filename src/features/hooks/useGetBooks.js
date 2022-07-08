import { useEffect, useState, useContext } from "react";
import { LoadingContext } from "../providers/Loading";
import { useFetch } from "../../hooks/useFetch";

export const useGetBooks = (url, headers) => {
  const [result, setResurt] = useState({});
  const { loading, setLoading } = useContext(LoadingContext);
  const { fetchData } = useFetch();

  useEffect(() => {
    const getBooks = async () => {
      setLoading(false);
      const res = await fetchData(url, "GET", headers);
      const result = await res.json();
      setResurt(result);
      setLoading(true);
    };
    getBooks();
  }, [url]);
  return result;
};
