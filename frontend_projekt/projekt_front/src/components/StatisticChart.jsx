import React, {useState, useEffect} from 'react';
import {CChart} from '@coreui/react-chartjs';

const StatisticsChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4200');
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchData();
    }, []);


    const alcoholic = data.filter(item => item._fields[0].properties.type === 'Alcoholic').length
    const nonAlcoholic = data.length - alcoholic


    return (
        <div className={"flex mx-auto block text-gray-500 font-bold"}>
            <div className={"flex mx-auto block text-gray-500 font-bold"}>
                <CChart
                    type="pie"
                    data={{
                        labels: ['Alcoholic', 'Non-Alcoholic'],
                        datasets: [
                            {
                                label: 'Types of drinks',
                                backgroundColor: ['gray', 'Blue'],
                                data: [alcoholic, nonAlcoholic],
                            },
                        ],
                    }}
                    options={{
                        legend: {
                            position: 'top',
                            labels: {
                                fontSize: 14,
                                boxWidth: 20,
                            },
                        },
                        responsive: false,
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: 'Types of drinks',
                            fontSize: 20,
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default StatisticsChart;
