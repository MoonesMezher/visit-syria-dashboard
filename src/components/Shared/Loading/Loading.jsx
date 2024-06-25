import './Loading.css'
const Loading = ({ loading, style }) => {
    return (
        loading && <div className={`loading ${style}`}></div>
    )
}

export default Loading