import { useEffect, useState } from "react";
import MainSelect from "../../components/Shared/MainSelect/MainSelect"
import axios from "axios";
import MainStatisticsListBox from "../../components/Shared/MainStatisticsListBox/MainStatisticsListBox";
import { FaStar, FaUserAlt } from "react-icons/fa";
import MainChart from "../../components/Shared/MainChart/MainChart";
import MainStatisticsInfoBox from "../../components/Shared/MainStatisticsInfoBox/MainStatisticsInfoBox";

const SatisticsResturant = () => {
    const satisticsList = [
        {
            title: 'المطاعم الأكثر حجزاّ',
            icon: <FaUserAlt/>,
            list: [
                {
                    name: 'بوز الجدي',
                    number: 70
                },
                {
                    name: 'بوز الجدي',
                    number: 70
                },
                {
                    name: 'بوز الجدي',
                    number: 70
                },
                {
                    name: 'بوز الجدي',
                    number: 70
                },
                {
                    name: 'بوز الجدي',
                    number: 70
                }
            ]
        },
        {
            title: 'المطاعم الأعلى تقييماً',
            icon: <FaStar/>,
            list: [
                {
                    name: 'الشاميات',
                    number: 4.5
                },
                {
                    name: 'الشاميات',
                    number: 4.5
                },
                {
                    name: 'الشاميات',
                    number: 4.5
                },
                {
                    name: 'الشاميات',
                    number: 4.5
                },
                {
                    name: 'الشاميات',
                    number: 4.5
                }
            ]
        },
    ]
    return (
        <section className="BY_SatisticsLandMark">
            <div className='BY_container'>
                <div className="top_section">
                    <MainSelect title="خلال شهر" options={[1,2,3,4,5,6,7,8,9,10,11,12]} />
                </div>
                <div className="content_section">
                    <div className="right_section">
                        {satisticsList.map((e, i) => <MainStatisticsListBox key={i} fixed={e.icon} icon={e.icon} list={e.list} title={e.title}/>)}
                    </div>
                    <div className="left_section">
                        <div className="satistics_boxs_section">
                        <MainStatisticsInfoBox title={'مجموع قيمة الحجوزات'} number={'15,000'} unit={'$'}/>
                        <MainStatisticsInfoBox title={'مجموع حجوزات المطاع'} number={150} unit={'حجز'}/>
                        </div>
                        <div className="chart_section">
                            <MainChart
                                chart_title="مخطط زيارات المطاعم"
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

export default SatisticsResturant