import './Loading.css'
const Loading = ({ loading }) => {
    return (
        loading && <div style={{
            "width": '60px',
            "height": "60px",
            "borderRadius": "50%",
            "backgroundColor": "transparent",
            "border": "5px solid",
            "borderColor": '#57deb0bf #57deb0bf #57deb0bf transparent',
        }} className="loading"></div>
    )
}

export default Loading