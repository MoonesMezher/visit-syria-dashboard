import MainStatisticsListBox from '../../components/Shared/MainStatisticsListBox/MainStatisticsListBox'
import MainSelect from '../../components/Shared/MainSelect/MainSelect';
import MainStatisticsInfoBox from "../../components/Shared/MainStatisticsInfoBox/MainStatisticsInfoBox"
import MainChart from "../../components/Shared/MainChart/MainChart"
import { GoPersonAdd } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { RiGroupLine } from "react-icons/ri";
import { useFetchCities } from '../../constant/api/FetchData';
const SatisticsHotel = () => {
    const list1 = [
        {
            name: 'داما روز',
            number: 70
        },
        {
            name: 'شيراتون',
            number: 60
        },
        {
            name: 'بيسام',
            number: 58
        },
        {
            name: 'السفير',
            number: 54
        },
        {
            name: 'الأمير',
            number: 50
        },
    ]
    const list2 = [
        {
            name: 'داما روز',
            number: 4.9
        },
        {
            name: 'شيراتون',
            number: 4.8
        },
        {
            name: 'بيسام',
            number: 4.2
        },
        {
            name: 'السفير',
            number: 4
        },
        {
            name: 'الأمير',
            number: 3.5
        },
    ]
    const month = [
        'خلال شهر',
        'خلال شهرين',
        'خلال عام'
    ]
    const { cities, cityNames, isLoadingCities } = useFetchCities();

    return (
        <section className="BY_SatisticsLandMark">
            <div className='BY_container'>
                <div className="top_section">
                    <MainSelect title="خلال شهر" options={month} />
                    <MainSelect title="المحافظات" options={['كامل القطر',...cityNames]} />
                </div>
                <div className="content_section">
                    <div className="right_section">
                        <MainStatisticsListBox title="الفنادق الأكثر حجزاًَ" list={list1} icon={<GoPersonAdd />} fixed={<RiGroupLine />} />
                        <MainStatisticsListBox title="الفنادق الأعلى تقييماً" list={list2} icon={<CiStar />} fixed={<CiStar />} />
                    </div>
                    <div className="left_section">
                        <div className="satistics_boxs_section">
                            <MainStatisticsInfoBox title={'مجموع قيمة الحجوزات'} number={15000} unit={"s"} />
                            <MainStatisticsInfoBox title={'  مجموع حجوزات الفنادق'} number={"950"} unit={'حجز'} />
                        </div>
                        <div className="chart_section">
                            {/* <MainChart arrData={[1, 10,4,5,10]} label="مخطط زيارات المعالم السياحية" /> */}
                            <MainChart
                                chart_title="مخطط الحجوزات"
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

export default SatisticsHotel