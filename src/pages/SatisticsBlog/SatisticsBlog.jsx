import { FaUserGroup } from "react-icons/fa6";
import MainChart from "../../components/Shared/MainChart/MainChart";
import MainSelect from "../../components/Shared/MainSelect/MainSelect";
import MainStatisticsInfoBox from "../../components/Shared/MainStatisticsInfoBox/MainStatisticsInfoBox";
import MainStatisticsListBox from "../../components/Shared/MainStatisticsListBox/MainStatisticsListBox";
import "./SatisticsBlog.css";
import { IoMdStarOutline } from "react-icons/io";

const SatisticsBlog = () => {
  const options = ["خلال 6 اشهر", "خلال سنة"];
  const list1 = [
    {
      name: "مدرج بصرى",
      number: 15.265,
    },
    {
      name: "..مقالة",
      number: 10.568,
    },
    {
      name: "..مقالة",
      number: 9.524,
    },
    {
      name: "..مقالة",
      number: 8.544,
    },
    {
      name: "..مقالة",
      number: 8.125,
    },
  ];

  const list2 = [
    {
      name: "التكية السليمانية",
      number: 4.95,
    },
    {
      name: "مقالة",
      number: 4.92,
    },
    {
      name: "مقالة",
      number: 4.8,
    },
    {
      name: "مقالة",
      number: 4.78,
    },
    {
      name: "مقالة",
      number: 4.92,
    },
  ];
  return (
    <section>
      <div className="blog-stat-header">
        <MainSelect title={"خلال شهر"} option={options} />
      </div>
      <div className="blog-stat-body">
        <div className="blog-stat-body-left">
          <div className="blog-stat-info">
            <MainStatisticsInfoBox
              unit={"زيارة"}
              number={"117K"}
              title={"عدد زيارات المدونة"}
            />
            <MainStatisticsInfoBox
              unit={"مقالة"}
              number={"106k"}
              title={"عدد مقالات المدونة"}
            />
          </div>

          <MainChart title={"مخطط زيارة المدونة"} />
        </div>
        <div className="blog-stat-body-right">
          <MainStatisticsListBox
            title={"المقالات الاكثر زيارة"}
            icon={<FaUserGroup />}
            list={list1}
            fixed={<FaUserGroup />}
          />
          <MainStatisticsListBox
            title={"المقالات الاعلى تقييما"}
            icon={<IoMdStarOutline />}
            list={list2}
            fixed={<IoMdStarOutline />}
          />
        </div>
      </div>
    </section>
  );
};

export default SatisticsBlog;
