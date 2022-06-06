import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Detail = () => {

    const [details, setDetails] = useState({});
    const params = useParams({});
    const navigate = useNavigate();

    
    useEffect(() => {
        async function getbooks() {
            
            const jwt = localStorage.getItem("jwt");
            
            
    
            const res = await fetch(`https://api-for-missions-and-railways.herokuapp.com/books/${Object.values(params)}`,{
                method:"GET",
                headers:{
                    "Authorization": `Bearer ${jwt}`,
                }
            });
            const result = await res.json();
            setDetails(result);                   
        }
        getbooks();
    },[])
    console.log(details.url);
    
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
                <button onClick={()=> {navigate(-1)}}>戻る</button>
            </div>
        </div>
    )
}