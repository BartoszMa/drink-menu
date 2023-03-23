import React from "react";

const DeleteDrinkButton = ({record}) => {
    const deleteDrink = async () => {
        try {
            await fetch(`http://localhost:4200/${record._fields[0].elementId}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.log("error", error);
        }
    }

    return <button className={"m-2 shadow bg-red-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"} onClick={deleteDrink}>Delete Drink</button>;
};

export default DeleteDrinkButton;
