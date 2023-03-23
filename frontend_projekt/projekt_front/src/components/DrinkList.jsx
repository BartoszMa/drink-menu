import React, {useState, useEffect} from "react";
import ShowOneDrink from "./ShowOneDrink";
import {useSelector} from "react-redux";
import AddNewDrink from "./AddNewDrink";
import DeleteDrinkButton from "./DeleteDrinkButton";

const DrinkList = () => {
    const [data, setData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const isLoggedIn = useSelector((state) => state.admin.isLoggedIn)

    useEffect(() => {
        const url = `http://localhost:4200/`
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [data]);

    return (
        <div key={"DrinkList"} className={"mx-auto object-center text-center"}>
            <input
                className={"w-full text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
                type="text"
                placeholder={"Find Your Drink"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {data && data.map((record) => {
                if (record._fields[0].properties.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    if (isLoggedIn) {
                        return (
                            <div key={record._fields[0].elementId} className="mx-auto object-center">
                                <ShowOneDrink key={`${record._fields[0].elementId}ShowOneDrink`} record={record}/>
                                <DeleteDrinkButton key={`${record._fields[0].elementId}DeleteDrinkButton`}
                                                   record={record}/>
                            </div>)
                    }
                    return <div key={record._fields[0].elementId} className="mx-auto object-center">
                        <ShowOneDrink key={`${record._fields[0].elementId}ShowOneDrink`} record={record}/>
                    </div>
                }

                return null;
            })}
            {isLoggedIn ? (
                <AddNewDrink/>
            ) : null}

        </div>
    );
}

export default DrinkList


