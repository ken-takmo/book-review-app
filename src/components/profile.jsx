import { useState,} from "react"
import { useNavigate,useLocation } from "react-router-dom";
import { UseFetch} from "./useFetch";
export const Profile = () => {
    
    const jwt = localStorage.getItem('jwt');
    const navigate = useNavigate();
    const {fetchdata,fetchRes} = UseFetch();
    const location = useLocation();
    const prevName = location.state.name;
    const [NewName, setNewName] = useState(prevName);
    
    const newProfile = async() => {

        const body = {
            name:NewName
        }
        const res = await fetchdata('/users',"PUT",{"Authorization": `Bearer ${jwt}`},body);
        const result = await res.json();

        const successAction = () => {
            alert(`ユーザー名が${Object.values(result)}に変更されました`);
            navigate("/books");
        }

        fetchRes(res,successAction,result)
    }



    return(
        <div>
            <div>
                <h1>ユーザー情報更新</h1>
            </div>
            <div>
                <label htmlFor="newName">新しいユーザー名</label>
                <input type="text" id="newName" value={NewName} onChange={e => setNewName(e.target.value)}/>
                <button onClick={newProfile}>変更</button>
            </div>
            <br />
            <br />
                <button onClick={() => {navigate("/books")}}>戻る</button>
        </div>
    )
}