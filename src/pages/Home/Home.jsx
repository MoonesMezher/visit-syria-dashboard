import MainButton from "../../components/Shared/MainButton/MainButton"
import MainChart from "../../components/Shared/MainChart/MainChart"
import MainStatisticsInfoBox from "../../components/Shared/MainStatisticsInfoBox/MainStatisticsInfoBox"

const Home = () => {
    return (
        <section>
            <MainChart key={1} />
            <MainButton text={'Add'}/>
            <MainStatisticsInfoBox title={'sss'} number={40} unit={'Km'}/>
            <MainStatisticsInfoBox title={'sss'} number={40} unit={'Km'}/>
        </section>
    )
}

export default Home