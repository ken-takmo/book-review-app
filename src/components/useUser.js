import { useEffect, useState } from "react";

export const useUser = (url,headers) => {
    const baseUrl = "https://api-for-missions-and-railways.herokuapp.com"
    const [result, setResurt] = useState({});
    useEffect(() => {
        const fetchApi = async () => {
            const res = await fetch(baseUrl + url,{
                    method: "GET",
                    headers: headers,
                })
            const resJson = await res.json();
            setResurt(resJson)
        }
        fetchApi();
    },[url]);
    return result;
}