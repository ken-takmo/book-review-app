import { useUser } from "./useUser"
import { UseFetch } from "./useFetch";
import { useEffect, useState } from "react";
export const Publicbooks = () => {

    const {fetchdata} = UseFetch();
    const [results, SetResults] = useState({});

    useEffect(() => {
        const fetch = async() => {
            const data = await fetchdata("/public/books","GET");
            const jsonData = await data.json()
            SetResults(jsonData);
        }
        fetch();
    },[])
    return(
        <div>
            <div>
                <p>ログインするとレビューの投稿ができます</p>
            </div>
            <div>
                {Object.values(results).map((result) => (
                    <ul key={result.id}>
                        <li >タイトル: {result.title}</li>
                        <li >内容: {result.detail}</li>
                        <li > レビュー: {result.review}</li>
                        <li >投稿者: {result.reviewer}</li>
                        <li id="url">URL: <a href={result.url} target="_blank">{result.url}</a></li>
                        <li >ID: {result.id}</li>
                    </ul>
                ))}
            </div>
        </div>
    )
}