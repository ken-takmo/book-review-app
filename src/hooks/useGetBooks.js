import { useEffect, useState, useContext } from "react";
import { LoadingContext } from "../components/Loading";

export const useGetBooks = (url,headers) => {
    const baseUrl = "https://api-for-missions-and-railways.herokuapp.com"
    const [result, setResurt] = useState({});
    const {loading, setLoading} = useContext(LoadingContext);
    
    useEffect(() => {
        const fetchApi = async () => {
            try{
                setLoading(false);
                const res = await fetch(baseUrl + url,{
                        method: "GET",
                        headers: headers,
                    })
                const resJson = await res.json();
                console.log("fetching");
                setResurt(resJson);
                setLoading(true);
            }
            catch(error){
                alert("サーバー側でエラーが起きました。時間を置いてからもう一度お試しください。");
            }
        }
        fetchApi();
    },[url]);
    return result;
}