import { useState,} from "react"
import { useNavigate,useLocation } from "react-router-dom";
import { UseFetch} from "./useFetch";
export const Profile = () => {
    
    const jwt = localStorage.getItem('jwt');
    const navigate = useNavigate();
    const {fetchdata,fetchRes} = UseFetch();
    const location = useLocation();
    const prevName = location.state.name;
    const [Name, setName] = useState(prevName);
    
    const newProfile = async() => {

        const body = {
            name:Name
        }

        const res = await fetchdata('/users',"PUT",{"Authorization": `Bearer ${jwt}`},body);
        const result = await res.json();
        const newName = Object.values(result);

        const successAction = () => {
            alert(`ユーザー名が${newName}に変更されました`);
            navigate("/books",{state:{reNamed:true}});
        }

        fetchRes(res,successAction,result)
    }



    return(
        <main className="profile">
            <h1 className="profile-title">ユーザー情報</h1>
            <div className="profile-content">
                <label htmlFor="newName">新しいユーザー名</label>
                <input type="text" id="newName" value={Name} onChange={e => setName(e.target.value)}/>
            </div>
            <div className="profile-buttons">
                <button className="update-button" onClick={newProfile}>変更</button>
                <button className="prev-button" onClick={() => {navigate("/books")}}>戻る</button>
            </div>
        </main>
    )
}