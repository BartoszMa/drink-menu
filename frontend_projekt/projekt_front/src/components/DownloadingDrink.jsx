import React, {useEffect, useState} from "react";
import FileSaver from 'file-saver'
import {useNavigate} from "react-router-dom";

const DownloadingDrink = ({id}) => {
    const [elements, setElements] = useState(null);
    const [instructions, setInstructions] = useState(null)
    const [ingredients, setIngredients] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4200/${id}/elements`);
                const data = await response.json();
                setElements(data);
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchData();
    }, [elements]);


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

    const ingredientsCombined = ingredients ? ingredients.map(i => i._fields).flat().map(field => field.properties.name) : []
    const instructionCombined = instructions ? instructions.map(i => i._fields).flat().map(field => field.properties.instruction) : []
    const drink = elements ? {
        "name": elements[0]._fields[0].properties.name,
        "type": elements[0]._fields[0].properties.type,
        "glass": elements[0]._fields[0].properties.glass,
        "ingredients": ingredientsCombined,
        "instruction": instructionCombined
    } : {}

    const handleDownload = () => {
        const json = JSON.stringify(drink);
        const blob = new Blob([json], {type: 'application/json'});
        FileSaver.saveAs(blob, `${drink.name}.json`);
    }

    return (
        <div className={"downloadButton"}>
            <button
                className={"flex mx-auto my-auto shadow bg-gray-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"}
                onClick={handleDownload}>Download Drink
            </button>
        </div>
    )

}

export default DownloadingDrink
