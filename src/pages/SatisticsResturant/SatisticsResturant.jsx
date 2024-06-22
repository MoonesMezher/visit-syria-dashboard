import { useEffect, useState } from "react";
import MainSelect from "../../components/Shared/MainSelect/MainSelect"
import axios from "axios";
import MainStatisticsListBox from "../../components/Shared/MainStatisticsListBox/MainStatisticsListBox";
import { FaStar, FaUserAlt } from "react-icons/fa";
import MainChart from "../../components/Shared/MainChart/MainChart";
import MainStatisticsInfoBox from "../../components/Shared/MainStatisticsInfoBox/MainStatisticsInfoBox";

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

const SatisticsResturant = () => {
    const [cities , setCities] = useState([]);
    const [cityNames, setCityNames] = useState([]);

    useEffect (() => {
        axios.get('http://127.0.0.1:8000/api/cities')
        .then ( res => {
            setCities(res.data.data);
            // Extracting city names and setting them to state
            const names = res.data.data?.map(city => city.name);
            setCityNames(names);
        })
    },[]);

    return (
        <section>
            <div className="d-flex gap-5 justify-content-end">
                <MainSelect title={'حسب المحافظة'} options={cityNames}/>
                <MainSelect title={'خلال'} options={['شهر', 'اسبوع', 'يوم']}/>
            </div>
            <div className="bg-white d-flex gap-5 flex-row-reverse p-4 rounded-3 mt-4 justify-content-between">
                <div className="d-flex flex-column gap-5">
                    {satisticsList.map((e, i) => <MainStatisticsListBox key={i} title={e.title} icon={e.icon} list={e.list} fixed={e.icon}/>)}
                </div>
                <div className="bg-white d-flex gap-5 flex-column">
                    <div className="d-flex justify-content-between">
                        <MainStatisticsInfoBox title={'مجموع قيمة الحجوزات'} number={'15,000'} unit={'$'}/>
                        <MainStatisticsInfoBox title={'مجموع حجوزات المطاع'} number={150} unit={'حجز'}/>
                    </div>
                    <MainChart arrData={[1, 10, 90, 0]}/>
                </div>
            </div>
        </section>
    )
}

export default SatisticsResturant