import MainChart from "../../components/Shared/MainChart/MainChart"
import MainStatisticsInfoBox from "../../components/Shared/MainStatisticsInfoBox/MainStatisticsInfoBox"
import MainStatisticsListBox from "../../components/Shared/MainStatisticsListBox/MainStatisticsListBox"
import { MdOutlineArticle } from "react-icons/md";
import { TbCoin } from "react-icons/tb";
import MainSelect from '../../components/Shared/MainSelect/MainSelect';
import "./Home.css"
const Home = () => {
    const list = [
        {
            name: 'Ayham',
            number: 20
        },
        {
            name: 'Ali',
            number: 20
        },
        {
            name: 'Ahmad',
            number: 20
        },
        {
            name: 'Yousef',
            number: 20
        },
        {
            name: 'Humam',
            number: 20
        },
    ]
    const month = [
        'خلال شهر',
        'خلال شهرين',
        'خلال عام'
    ]
    return (
        <section className="BY_SatisticsLandMark">
            <div className='BY_container'>
                <div className="top_section">
                    <MainSelect title="خلال شهر" options={month} />
                </div>
                <div className="content_section home_statistic">
                    <div className="row">
                    <div className="satistics_boxs_section">
                            <MainStatisticsInfoBox title={'عدد الزائرين الكلي'} number={"250k"} unit={'زائر'} />
                            <MainStatisticsInfoBox title={'عدد المستخدمين الكلي'} number={"117K"} unit={'مستخدم'} />
                            <MainStatisticsInfoBox title={'عدد المتخدمين النشطين'} number={"3K"} unit={'مستخدم نشط'} />
                            <MainStatisticsInfoBox title={'عدد المتخدمين الجدد'} number={"1K"} unit={'مستخدم جديد'} />
                        </div>
                    </div>
                    <div className="row">
                    <div className="right_section" style={{ display:"flex",gap:"20px" }}>
                        <MainStatisticsListBox title="المعالم الأكثر زيارة" list={list} icon={<MdOutlineArticle />} fixed="حجز" />
                        <MainStatisticsListBox title="المعالم الأعلى تقييماً" list={list} icon={<TbCoin />} fixed={<TbCoin />} />
                    </div>
                    <div className="left_section">
                        <div className="chart_section home_chart" style={{ height:"100%" }}>
                            <MainChart
                                chart_title="مخطط زيارات المعالم السياحية"
                                x_labels={['30', '22', '15', '7', '1']}
                                array={[130, 100, 90, 40, 20]}
                                unit="K"
                                y_steps={20} />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home