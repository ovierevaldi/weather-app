import { IoReload } from "react-icons/io5";

type ErrorApiProp = {
    handleBtnClick: () => void
}

const ErrorApi = ({handleBtnClick} : ErrorApiProp) => {
    const onBtnClick = () => {
        handleBtnClick();
    }

    return (
        <div>
            <p className="text-red">
                Cannot Fetch Api...
            </p>
            <button 
                onClick={onBtnClick}
                className='bg-white text-black p-2 rounded px-6 flex items-center gap-x-2'>
                <span>Retry</span>
                <IoReload />
            </button>
        </div>
    )
}

export default ErrorApi