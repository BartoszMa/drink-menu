import React, {useEffect, useState} from "react";

const DrinkDetailsInstructions = ({id}) => {
    const [instructions, setInstructions] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4200/${id}/instructions`);
                const data = await response.json();
                setInstructions(data);
            } catch (error) {
                console.log("error", error);
            }
        }

        fetchData();
    }, [instructions]);

    return (
        <div className={"flex flex-col mx-auto"}>
            <p className={"mx-auto p-2 block text-gray-500 font-bold"}>Instructions:</p>
            <ul className={"mx-auto block text-gray-500 font-bold"} key={"instr"}>{instructions && instructions.map((record) => (
                <li key={`${record._fields[0].elementId}`}>{record._fields[0].properties.instruction}</li>))}
            </ul>
        </div>)
}

export default DrinkDetailsInstructions