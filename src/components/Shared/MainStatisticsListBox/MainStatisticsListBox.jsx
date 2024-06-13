import "./MainStatisticsListBox.css";
const MainStatisticsListBox = ({title,icon,fixed}) => {
    return (
        <div className="card main-statistic-ay" style={{ height: "159px" }}>
            <div className="card-header">
                <h6 className="title">{title}</h6>
                <span className="icon">{icon}</span>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className="user-name">ayham</div>
                    <div className="number">20 <span className="fixed-ay">{fixed}</span></div>
                </li>
                <li className="list-group-item">
                    <div className="user-name">ayham</div>
                    <div className="number">20 <span className="fixed-ay">{fixed}</span></div>
                </li>
                <li className="list-group-item">
                    <div className="user-name">ayham</div>
                    <div className="number">20 <span className="fixed-ay">{fixed}</span></div>
                </li>
                <li className="list-group-item">
                    <div className="user-name">ayham</div>
                    <div className="number">20 <span className="fixed-ay">{fixed}</span></div>
                </li>
                <li className="list-group-item">
                    <div className="user-name">ayham</div>
                    <div className="number">20 <span className="fixed-ay">{fixed}</span></div>
                </li>
            </ul>
        </div>
    )
}

export default MainStatisticsListBox