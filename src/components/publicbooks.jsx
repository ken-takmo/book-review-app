import { useState } from "react";
import { useUser } from "./useUser"

export const Publicbooks = () => {


    const results = useUser("/public/books",)

    return(
        <div>
            {Object.values(results).map((result) => (
                <ul key={result.id}>
                    <li >タイトル: {result.title}</li>
                    <li >内容: {result.detail}</li>
                    <li > レビュー: {result.review}</li>
                    <li >投稿者: {result.reviewer}</li>
                    <li >URL: <a href={result.url} target="_blank">{result.url}</a></li>
                    <li >ID: {result.id}</li>
                </ul>
            ))}
        </div>
    )
}