import React from "react";
import {Link} from "react-router-dom";

const ShowOneDrink = ({record}) => {
    return (
        <div key={record._fields[0].elementId} className={"mx-auto"}>
            <img className={"w-5/12 mx-auto"} src={record._fields[0].properties.img} alt={record._fields[0].properties.name}/>
            <div className={"block text-gray-500 font-bold"} key={`${record._fields[0].elementId}name`}>{record._fields[0].properties.name}</div>
            <div className={"block text-gray-500 font-bold"} key={`${record._fields[0].elementId}type`}>{record._fields[0].properties.type}</div>
            <button className={"m-1 shadow bg-gray-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"}>
                <Link to={`${record._fields[0].elementId}`}>Details</Link>
            </button>
        </div>)
}

export default ShowOneDrink
