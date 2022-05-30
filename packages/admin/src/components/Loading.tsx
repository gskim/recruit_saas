import Spinner from './Spinner'

const Loading = () => {
    return (
        <div className="d-flex justify-content-center">
            <Spinner className="text-primary m-2" color="primary" size={'lg'} />
        </div>
    )
}

export default Loading
