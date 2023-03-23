import React, {useEffect, useState} from "react";
import FileSaver from 'file-saver'
import {BsDownload} from "react-icons/bs"

const DownloadAllDrinks = () => {

    const [data, setData] = useState(null);
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

    const allDrinks = data ? data.map(i => i._fields[0].properties) : []

    const handleDownload = () => {
        const json = JSON.stringify(allDrinks);
        const blob = new Blob([json], {type: 'application/json'});
        FileSaver.saveAs(blob, `AllDrinks.json`);
    }

    return (
        <div className={"downloadButton"}>
            <BsDownload onClick={handleDownload}/>
        </div>
    )

}

export default DownloadAllDrinks
