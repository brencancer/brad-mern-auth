import { ProgressBar } from 'react-loader-spinner'
function Loader() {
    return (
        <div className="flex justify-center items-center ">
            <ProgressBar
                visible={true}
                height="80"
                width="120"
                color="#4fa94d"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>

    )
}

export default Loader