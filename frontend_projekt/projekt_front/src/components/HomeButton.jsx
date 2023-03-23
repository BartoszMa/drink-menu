import React from "react";
import {Link} from "react-router-dom";
import DownloadAllDrinks from "./DownloadAllDrinks";
import {AiOutlineHome} from "react-icons/ai"
import {useSelector} from "react-redux";
import {BsPieChart} from "react-icons/bs"
import {FaCog} from "react-icons/fa"


const HomeButton = () => {
    const isLoggedIn = useSelector((state) => state.admin.isLoggedIn)

    return (
        <div className={"bg-gray-800 flex justify-center"}>
            <button
                className={"text-white bg-gray-600 rounded p-2 hover:bg-gray-700 active:bg-gray-800 flex items-center justify-center mx-2"}>
                <Link to={'/'}><AiOutlineHome/></Link>
            </button>
            <button
                className={"text-white bg-gray-600 rounded p-2 hover:bg-gray-700 active:bg-gray-800 flex items-center justify-center mx-2"}>
                <Link to={'/statistic'}><BsPieChart/></Link>
            </button>
            <button
                className={"text-white bg-gray-600 rounded p-2 hover:bg-gray-700 active:bg-gray-800 flex items-center justify-center mx-2"}>
                <DownloadAllDrinks/>
            </button>
            {isLoggedIn ? (
                <button
                    className={"text-white bg-gray-600 rounded p-2 hover:bg-gray-700 active:bg-gray-800 flex items-center justify-center mx-2"}>
                    <Link to={'/admin'}><FaCog className={"text-white"}/></Link>
                </button>
            ) : (
                <></>
            )}

        </div>
    )
}

export default HomeButton
