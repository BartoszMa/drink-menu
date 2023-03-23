import React, {useEffect, useState} from "react";

const DrinkDetailsIngredients = ({id}) => {
    const [ingredients, setIngredients] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4200/${id}/ingredients`);
                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchData();
    }, [ingredients]);

    return (
        <div className={"flex flex-col mx-auto"}>
            <p className={"mx-auto p-2 block text-gray-500 font-bold"}>Ingredients:</p>
            <ul className={"mx-auto block text-gray-500 font-bold"} key={"ingredients"}>{ingredients && ingredients.map((record) => (
                <li key={`${record._fields[0].elementId}`}>{record._fields[0].properties.name}</li>
            ))}</ul>
        </div>
    )
}

export default DrinkDetailsIngredients