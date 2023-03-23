import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import EditDrinkForm from "./EditingDrinkForm";

const EditingDrink = ({id}) => {
    const [drinks, setDrinks] = useState([])
    const isLoggedIn = useSelector((state) => state.admin.isLoggedIn)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4200/${id}/elements`);
                const data = await response.json();
                setDrinks(data);
            } catch (error) {
                console.log("error", error);
            }
        }

        fetchData();
    }, [drinks]);


    return (
        <div>
            {isLoggedIn ? (
                <EditDrinkForm drink={drinks}/>
            ) : null}

        </div>
    );

}


export default EditingDrink
