import Loading from "../../components/Shared/Loading/Loading"
import MainButton from "../../components/Shared/MainButton/MainButton"

const ErrorPage = () => {
    return (
        <div className="w-100 d-flex justify-content-center align-items-center flex-column gap-2" style={{height: '80vh'}}>
            <h2>404</h2>
            <h3>Sorry :( - This Page Not Found</h3>
            <MainButton text={'Go Home'} goTo={'/'}/>
        </div>
    )
}

export default ErrorPage