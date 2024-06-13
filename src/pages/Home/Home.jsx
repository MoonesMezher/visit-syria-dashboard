import { toast } from "react-toastify"
import MainButton from "../../components/Shared/MainButton/MainButton"
import MainChart from "../../components/Shared/MainChart/MainChart"
import MainStatisticsInfoBox from "../../components/Shared/MainStatisticsInfoBox/MainStatisticsInfoBox"
import MainStatisticsListBox from "../../components/Shared/MainStatisticsListBox/MainStatisticsListBox"
import MainTable from "../../components/Shared/MainTable/MainTable"
import { dataPage1, headers } from "../../constant/staticData"
import { MdOutlineArticle } from "react-icons/md";
import { TbCoin } from "react-icons/tb";
import MainInput from "../../components/Shared/MainInput/MainInput"
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput"
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput"
import { useState } from "react"
const Home = () => {
    const handleClick = () => {
        return toast.success('تمت العملية بنجاح');
    };

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

    const [img, setImg] = useState(null);
    const [img1, setImg1] = useState([]);

    return (
        <section>
            <span onClick={handleClick}>
                <MainButton text={'Add'}/>
            </span>
            <MainTable data={dataPage1} headers={headers}/>
            <MainInput label={'Name'} type={'text'}/>
            <MainInput label={'Name'} type={'textarea'}/>
            <MainInput label={'Name'} type={'select'} options={[1, 2, 3, 4]}/>
            <MainPhotoInput img={img} setImg={setImg}/>
            <MainPhotoGroupInput imgs={img1} setImgs={setImg1}/>
            <MainChart key={1} />
            <MainStatisticsInfoBox title={'sss'} number={40} unit={'Km'}/>
            <MainStatisticsInfoBox title={'sss'} number={40} unit={'Km'}/>
            <MainStatisticsListBox title="المستخدم صاحب اكبر عدد حجوزات" list={list} icon={<MdOutlineArticle/>} fixed="حجز"/>
            <MainStatisticsListBox title="المستخدم الذي دفع اكبر مبلغ" list={list} icon={<TbCoin />} fixed={<TbCoin />}/>
        </section>
    )
}

export default Home