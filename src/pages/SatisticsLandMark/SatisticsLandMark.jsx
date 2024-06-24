import MainStatisticsListBox from '../../components/Shared/MainStatisticsListBox/MainStatisticsListBox'

import { MdOutlineArticle } from "react-icons/md";
import { TbCoin } from "react-icons/tb";
import MainSelect from '../../components/Shared/MainSelect/MainSelect';
import MainStatisticsInfoBox from "../../components/Shared/MainStatisticsInfoBox/MainStatisticsInfoBox"
import MainChart from "../../components/Shared/MainChart/MainChart"


const SatisticsLandMark = () => {
    const list = [
        {
            name: 'Ayham',
            number: 20
        },
        {
            name: 'Ayham',
            number: 20
        },
        {
            name: 'Ayham',
            number: 20
        },
        {
            name: 'Ayham',
            number: 20
        },
        {
            name: 'Ayham',
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
                <div className="content_section">
                    <div className="right_section">
                        <MainStatisticsListBox title="المعالم الأكثر زيارة" list={list} icon={<MdOutlineArticle />} fixed="حجز" />
                        <MainStatisticsListBox title="المعالم الأعلى تقييماً" list={list} icon={<TbCoin />} fixed={<TbCoin />} />
                    </div>
                    <div className="left_section">
                        <div className="satistics_boxs_section">
                            <MainStatisticsInfoBox title={'عدد المعالم'} number={106} unit={'معلم'} />
                            <MainStatisticsInfoBox title={'عدد زيارات المعالم'} number={"117K"} unit={'زيارة'} />
                        </div>
                        <div className="chart_section">
                            {/* <MainChart arrData={[1, 10,4,5,10]} label="مخطط زيارات المعالم السياحية" /> */}
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
        </section>
    )
}

export default SatisticsLandMark