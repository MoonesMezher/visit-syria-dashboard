import MainButton from "../../components/Shared/MainButton/MainButton"
import MainChart from "../../components/Shared/MainChart/MainChart"
import MainStatisticsInfoBox from "../../components/Shared/MainStatisticsInfoBox/MainStatisticsInfoBox"
import MainTable from "../../components/Shared/MainTable/MainTable"
import { dataPage1, headers } from "../../constant/staticData"

const Home = () => {
    return (
        <section>
            <MainTable data={dataPage1} headers={headers}/>
            <MainChart key={1} />
            <MainButton text={'Add'}/>
            <MainStatisticsInfoBox title={'sss'} number={40} unit={'Km'}/>
            <MainStatisticsInfoBox title={'sss'} number={40} unit={'Km'}/>
        </section>
    )
}

export default Home