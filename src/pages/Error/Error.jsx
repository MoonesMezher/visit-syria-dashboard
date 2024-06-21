import MainButton from "../../components/Shared/MainButton/MainButton"

const ErrorPage = () => {
    return (
        <div className="w-100">
            <MainButton text={'Go Home'} goTo={'/'}/>
        </div>
    )
}

export default ErrorPage