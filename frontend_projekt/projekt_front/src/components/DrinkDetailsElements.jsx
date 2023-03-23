import React, {useEffect, useState} from "react";

const DrinkDetailsElements = ({id}) => {
    const [data, setData] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4200/${id}/elements`);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log("error", error);
            }
        }

        fetchData();


    }, [data]);

    return (
        <div className={"flex flex-col items-center mx-auto"}>
            {data && data.map((record) => (
                <div className={"flex flex-col"} key={record._fields[0].elementId}>
                    <img className={"w-5/12 mx-auto"} src={record._fields[0].properties.img} alt={record._fields[0].properties.name}/>
                    <div className={"mx-auto block text-gray-500 font-bold"} key={`${record._fields[0].elementId}name`}>{record._fields[0].properties.name}</div>
                    <div className={"mx-auto text-gray-500 font-bold"} key={`${record._fields[0].elementId}type`}>{record._fields[0].properties.type}</div>
                    <div className={"mx-auto text-gray-500 font-bold"} key={`${record._fields[0].elementId}glass`}>{record._fields[0].properties.glass}</div>
                </div>
            ))}
        </div>
    );
}

export default DrinkDetailsElements