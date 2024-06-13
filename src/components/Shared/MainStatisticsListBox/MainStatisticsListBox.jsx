import "./MainStatisticsListBox.css";
const MainStatisticsListBox = ({title,icon,fixed, list}) => {
    return (
        <div className="card main-statistic-ay" style={{ height: "159px" }}>
            <div className="card-header">
                <h6 className="title">{title}</h6>
                <span className="icon">{icon}</span>
            </div>
            <ul className="list-group list-group-flush">
                {list.map((e, i) => {
                    return (<li key={i} className="list-group-item">
                    <div className="user-name">{e.name}</div>
                    <div className="number">{e.number}<span className="fixed-ay">{fixed}</span></div>
                </li>)
                })}
                
            </ul>
        </div>
    )
}

export default MainStatisticsListBox