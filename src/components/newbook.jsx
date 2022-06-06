import { useNavigate } from "react-router-dom";
export const Newbook = () => {

    const jwt = localStorage.getItem("jwt")
    const navigate = useNavigate();

    const postBook = async() => {

        const title = document.getElementById("title").value;
        const url = document.getElementById("url").value;
        const detail = document.getElementById("detail").value;
        const review = document.getElementById("review").value;


        const body = {
            title: title,
            url: url,
            detail: detail,
            review: review,
        }


        const res = await fetch("https://api-for-missions-and-railways.herokuapp.com/books",{
            method: "POST",
            headers: {
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify(body),
        })

        const result = await res.json();
        console.log(result);

        const formError = () => {
            if(!title){
                alert("タイトルを入力してください");
            }else if(!url){
                alert("URLを入力してください");
            }else if(!detail){
                alert("あらすじを入力してください");
            }else if(!review){
                alert("レビューを入力してください")
            }else{
                alert("バリエーションエラー")
            }
        }
        
        const postBookError = (result) => {
            switch(result.ErrorCode){
                case 403:
                case 400:
                    formError();
                    break;
                case 500:
                    alert(result.ErrorMessageJP)
                    break;
                default:
                    alert("レビューが投稿されました")
                    navigate(-1);
                    break;
            }
        }
        postBookError(result);
    }

    return(
        <div>
            <div>
                <h1>書籍レビュー投稿ページ</h1>
            </div>
            <div>
                <h2>タイトル、URL、あらすじ、レビューを書いてください。</h2>
                <div>
                    <label htmlFor="title">タイトル</label>
                    <input type="text" id="title" />
                </div>
                <div>
                    <label htmlFor="url">URL</label>
                    <input type="text" id="url"/>
                </div>
                <div>
                    <label htmlFor="detail">あらすじ</label>
                    <textarea id="detail" rows="5"/>
                </div>
                <div>
                    <label htmlFor="review">レビュー</label>
                    <textarea rows="5" id="review"/>
                </div>
                <div>
                    <button onClick={postBook}>作成</button>
                </div>
            </div>
            <br />
            <button onClick={() => {navigate(-1)}}>戻る</button>
        </div>
    )
}