import { useState,} from "react"
import { useNavigate,useLocation } from "react-router-dom";
export const Profile = () => {
    
    const jwt = localStorage.getItem('jwt');
    const navigate = useNavigate();

    const location = useLocation();
    const userName = location.state.name;

    const [name, setName] = useState(userName);
    
    const newProfile = async() => {
        
        const newUserName = name;

        const body = {
            name:newUserName
        }
        const res = await fetch('https://api-for-missions-and-railways.herokuapp.com/users',{
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${jwt}`,
            },
            body: JSON.stringify(body),
        });
        const result = await res.json();
        console.log(result);

        switch(res.status){
            case 200:
                alert(`ユーザー名が${Object.values(result)}に変更されました`);
                navigate(-1);
                break;
            case 400:
            case 403:
            case 500:
                alert(result.ErrorMessageJP);
                break;
            default:
                break;
        }
    }



    return(
        <div>
            <div>
                <h1>ユーザー情報更新</h1>
            </div>
            <div>
                <label htmlFor="newName">新しいユーザー名</label>
                <input type="text" id="newName" value={name} onChange={e => setName(e.target.value)}/>
                <button onClick={newProfile}>変更</button>
            </div>
            <br />
            <br />
                <button onClick={() => {navigate(-1)}}>戻る</button>
        </div>
    )
}