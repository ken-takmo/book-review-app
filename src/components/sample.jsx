import { useEffect, useState } from "react"

export const Sample = () => {

    const[content, setContent] = useState("detail");
    const[number, setNumber] = useState(0);

    const onDetailClick = () => {
        setContent("detail");
    }
    const onReviewClick = () => {
        setContent("review")
    }

    const onSampleClick = () => {
        setNumber(number + 10);
    } 
    
    return(
        <main className="a">
            <div className="b">
                <div className="sample-header">
                    <h2 className="sample-title">タイトルだよgハウg肺h具ヴォイ亜鉛ヴアネロvなおえりvのあえんゔぉあいえんゔぉいえあんゔぉあえ</h2>
                </div>
                <div className="sample-main">
                    <div className="sample-content-button">
                        <button className="sample-detail-button" onClick={onDetailClick}>作品情報</button>
                        <button className="sample-review-button" onClick={onReviewClick}>レビュー</button>
                    </div>
                    {content === "detail" ?
                    <div className="sample-is-detail">
                        <h3>書籍内容</h3>
                        <hr />
                        <p>サンプルmケアMBヴォケあrんfmvびえあんみbvんまえmんbゔぉいあえ
                            vm毛ふぁんbmヴォイあえkfんbmvこあえんfmゔぃおあえんfゔぃおあえv
                        </p>
                    </div>
                    :
                    <div className="sample-is-review">
                        <h3>レビュー</h3>
                        <hr />
                        <p>さんぷつぷtぷpつぱうgはhがhふぁんふぁvふぁ</p>
                    </div>
                    }
                </div>
                <div className="sample-footer">
                    <div className="sample-author">
                        <p>投稿者:サンプル</p>
                        <p>ID:サンプル</p>
                        <p>あなたの投稿です</p>
                    </div>
                    <div className="sample-footer-links">
                        <nav className="sample-url"><a target="_blank" href="#">この作品のサイトにいく</a></nav>
                        <button className="sample-prev-button">戻る</button>
                    </div>
                </div>
                <button onClick={onSampleClick}>サンプル</button>
            </div>
        </main>
    )
}