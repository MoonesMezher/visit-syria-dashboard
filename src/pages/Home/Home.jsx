import MainButton from "../../components/Shared/MainButton/MainButton"
import MainChart from "../../components/Shared/MainChart/MainChart"
import MainStatisticsInfoBox from "../../components/Shared/MainStatisticsInfoBox/MainStatisticsInfoBox"
import MainStatisticsListBox from "../../components/Shared/MainStatisticsListBox/MainStatisticsListBox"
import MainTable from "../../components/Shared/MainTable/MainTable"
import { dataPage1, headers } from "../../constant/staticData"
import { MdOutlineArticle } from "react-icons/md";
import { TbCoin } from "react-icons/tb";
const Home = () => {
    return (
        <section>
            <MainTable data={dataPage1} headers={headers}/>
            <MainChart key={1} />
            <MainButton text={'Add'}/>
            <MainStatisticsInfoBox title={'sss'} number={40} unit={'Km'}/>
            <MainStatisticsInfoBox title={'sss'} number={40} unit={'Km'}/>
            <MainStatisticsListBox title="المستخدم صاحب اكبر عدد حجوزات" icon={<MdOutlineArticle/>} fixed="حجز"/>
            <MainStatisticsListBox title="المستخدم الذي دفع اكبر مبلغ" icon={<TbCoin />} fixed={<TbCoin />}/>
        </section>
    )
}

export default Home