import './MainStatisticsInfoBox.css'


const MainStatisticsInfoBox = ({ unit, number, title }) => {
    return (
        <div className='BY_MainStatisticsInfoBox'>
            <div className='top'>
                <div className='right'>{number}</div>
                <div className='left'>{unit}</div>
            </div>
            <div className='bottom'>{title}</div>
        </div>
    )
}

export default MainStatisticsInfoBox