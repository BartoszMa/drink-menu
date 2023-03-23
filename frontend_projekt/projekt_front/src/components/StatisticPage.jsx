import StatisticTable from "./StatisticTable";
import StatisticChart from "./StatisticChart";

const StatisticPage = () => {
    return(
        <div className={"Statistics"}>
            <StatisticChart/>
            <StatisticTable/>

        </div>
    )
}

export default StatisticPage