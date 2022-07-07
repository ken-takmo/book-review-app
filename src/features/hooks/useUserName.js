import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useFetch } from "./useFetch";

export const useUserName = (jwt) => {
  const { fetchData, fetchRes } = useFetch();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserName = async () => {
      if (jwt) {
        const res = await fetchData("/users", "GET", {
          Authorization: `Bearer ${jwt}`,
        });
        const result = await res.json();
        setName(Object.values(result));
      }
    };
    getUserName();
  }, [jwt]);

  const editProfile = async (body, jwt) => {
    const res = await fetchData(
      "/users",
      "PUT",
      { Authorization: `Bearer ${jwt}` },
      body
    );
    const result = await res.json();

    const successAction = () => {
      alert(`ユーザー名が${result.name}に変更されました`);
      navigate("/books");
    };

    fetchRes(res, successAction, result);

    return result;
  };

  return { name, editProfile };
};
