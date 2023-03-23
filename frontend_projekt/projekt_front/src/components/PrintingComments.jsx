import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import DeleteCommentButton from "./DeleteCommentButton";

const PrintingComments = ({id}) => {
    const [comments, setComments] = useState([])
    const isLoggedIn = useSelector((state) => state.admin.isLoggedIn)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4200/${id}/comments/`);
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.log("error", error);
            }
        }

        fetchData();
    }, [comments]);


    return (
        <div className={"flex flex-col justify-left items-center"}>
            {comments.map((comment) => (
                <div key={`${comment._fields[0].elementId}comment`}>
                    <div
                        className={"flex mx-auto block text-gray-500 font-bold"}>Nickname: {comment._fields[0].properties.nickname}</div>
                    <div
                        className={"flex mx-auto block text-gray-500 font-bold"}>Comment: {comment._fields[0].properties.text}</div>
                    {isLoggedIn ? (
                        <button
                            className={"m-2 shadow bg-red-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"}
                            onClick={() => DeleteCommentButton(id, comment)}>Delete Comment</button>
                    ) : null}
                </div>
            ))}
        </div>
    );

}


export default PrintingComments
