import { FaUserGroup } from "react-icons/fa6";
import MainChart from "../../components/Shared/MainChart/MainChart";
import MainSelect from "../../components/Shared/MainSelect/MainSelect";
import MainStatisticsInfoBox from "../../components/Shared/MainStatisticsInfoBox/MainStatisticsInfoBox";
import MainStatisticsListBox from "../../components/Shared/MainStatisticsListBox/MainStatisticsListBox";
import "./SatisticsBlog.css";
import { IoMdStarOutline } from "react-icons/io";

const SatisticsBlog = () => {
  const options = ["خلال شهر", "خلال 6 اشهر", "خلال سنة"];

  const blogsatisticsList = [
    {
      title: "المقالات الاكثر زيارة",
      icon: <FaUserGroup />,
      list: [
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
      ],
    },
    {
      title: "المقالات الاعلى تقييما",
      icon: <IoMdStarOutline />,
      list: [
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
      ],
    },
  ];

  return (
    <section>
      <div className="blog-stat-header">
        <MainSelect
          title={"خلال شهر"}
          options={options}
          onSelect={(options) =>
            setSortBy(options === "خلال شهر" ? "" : options)
          }
        />
      </div>
      <div className="blog-stat-body">
        <div className="blog-stat-body-left">
          <div className="blog-stat-info">
            <MainStatisticsInfoBox
              number={"117K"}
              title={"عدد زيارات المدونة"}
              unit={"زيارة"}
            />
            <MainStatisticsInfoBox
              number={"106k"}
              title={"عدد مقالات المدونة"}
              unit={"مقالة"}
            />
          </div>

          <MainChart
            chart_title={"مخطط زيارات المدونة"}
            x_labels={["30", "22", "15", "7", "1"]}
            array={[130, 100, 90, 40, 20]}
            unit="K"
            y_steps={20}
          />
        </div>
        <div className="blog-stat-body-right">
          {blogsatisticsList.map((e, i) => (
            <MainStatisticsListBox
              key={i}
              fixed={e.icon}
              icon={e.icon}
              list={e.list}
              title={e.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SatisticsBlog;
