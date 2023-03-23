import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import DrinkDetailsInstructions from "./DrinkDetailsInstructions";
import DrinkDetailsIngredients from "./DrinkDetailsIngredients";
import DrinkDetailsElements from "./DrinkDetailsElements";
import PrintingComments from "./PrintingComments";
import AddCommentForm from "./AddingComments";
import EditingDrink from "./EditingDrink";
import DownloadingDrink from "./DownloadingDrink"

const DrinkDetails = () => {
    const {id} = useParams()
    const [data, setData] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4200/${id}`)
                const data = await response.json()
                setData(data)
            } catch (error) {
                return false
            }
        }

        fetchData()

    }, [])

    if (!data) {
        navigate('/')
    }

    return (<div className={"mx-auto object-center"}>
        <DrinkDetailsElements id={id} className={"mx-auto object-center"}/>
        <DrinkDetailsIngredients id={id} className={"mx-auto object-center"}/>
        <DrinkDetailsInstructions id={id} className={"mx-auto object-center"}/>
        <AddCommentForm id={id} className={"mx-auto object-center"}/>
        <PrintingComments id={id} className={"mx-auto object-center"}/>
        <EditingDrink id={id} className={"mx-auto object-center"}/>
        <DownloadingDrink id={id} className={"mx-auto object-center"}/>
    </div>);
}


export default DrinkDetails
