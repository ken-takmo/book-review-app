import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

export const Detail = () => {

    const params = useParams({});
    const navigate = useNavigate();

    const jwt = localStorage.getItem("jwt");

    const details = useUser(`/books/${Object.values(params)}`,{"Authorization": `Bearer ${jwt}`});
    
    
    return(
        <div>
            <div>
                <h1>書籍詳細</h1>
                    <ul>
                        <li>タイトル:{details.title}</li>
                        <li>詳細: {details.detail}</li>
                        <li>レビュー：{details.review}</li>
                        <li>URL:<a target="_blank" href={details.url}>{details.url}</a></li>
                        <li>投稿者:{details.reviewer}</li>
                        <li>ID:{details.id}</li>
                        {details.isMine &&<li>あなたの投稿です</li>}
                    </ul>
                <button onClick={()=> {navigate("/books")}}>戻る</button>
            </div>
        </div>
    )
}