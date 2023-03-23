import React, {useState, useEffect} from 'react';

const StatisticTable = () => {
    const [data, setData] = useState([]);
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4200');
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length === 0) return;
        const totalDrinks = data.length;
        const alcoholicDrinks = data.filter(item => item._fields[0].properties.type === 'Alcoholic').length;
        const nonAlcoholicDrinks = totalDrinks - alcoholicDrinks;

        setStatistics({
            totalDrinks,
            alcoholicDrinks,
            nonAlcoholicDrinks,
            alcoholicPercentage: (alcoholicDrinks / totalDrinks) * 100,
            nonAlcoholicPercentage: (nonAlcoholicDrinks / totalDrinks) * 100
        });
    }, [data]);


    return (
        <div className="flex justify-center items-center text-gray-500 font-bold">
            <table className="mx-auto text-gray-500 font-bold">
                <thead>
                <tr>
                    <td>Statistic</td>
                    <td>Value</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Total number of drinks</td>
                    <td>{statistics.totalDrinks}</td>
                </tr>
                <tr>
                    <td>Number of alcoholic drinks</td>
                    <td>{statistics.alcoholicDrinks}</td>
                </tr>
                <tr>
                    <td>Number of non-alcoholic drinks</td>
                    <td>{statistics.nonAlcoholicDrinks}</td>
                </tr>
                <tr>
                    <td>Percentage of alcoholic drinks</td>
                    <td>{statistics.alcoholicPercentage}%</td>
                </tr>
                <tr>
                    <td>Percentage of non-alcoholic drinks</td>
                    <td>{statistics.nonAlcoholicPercentage}%</td>
                </tr>
                </tbody>
            </table>
        </div>


    );
};

export default StatisticTable;
