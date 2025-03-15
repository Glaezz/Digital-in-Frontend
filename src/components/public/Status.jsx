

export default function Status({status}){
    
    switch (status) {
        case "success":
            return (

                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-[#242424]">
            <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                d="M10 3L4.5 8.5L2 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
            <h2 className="text-sm font-normal">success</h2>
            </div>
        )
            break;
            
        case "process":
            return(
                
                <div
                    className="inline-flex items-center px-3 py-1 text-blue-500 rounded-full gap-x-2 bg-[#242424]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.01"
                        viewBox="0 0 1024 1024"
                        className="size-4 pt-px"
                    >
                        <path
                        id="SVGRepo_iconCarrier"
                        d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
                        ></path>
                    </svg>
            <h2 className="text-sm font-normal">process</h2>
            </div>
        )   
            break;
        case "pending":
            return(
                
                <div
                    className="inline-flex items-center px-3 py-1 text-blue-500 rounded-full gap-x-2 bg-[#242424]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.01"
                        viewBox="0 0 1024 1024"
                        className="size-4 pt-px"
                    >
                        <path
                        id="SVGRepo_iconCarrier"
                        d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
                        ></path>
                    </svg>
            <h2 className="text-sm font-normal">pending</h2>
            </div>
        )   
            break;
            case "refund":
                return (

                    <div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-[#242424]">
            <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10"
                stroke="#667085"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
            <h2 className="text-sm font-normal">refund</h2>
            </div>
        )
            break;

        case "cancel":
            return(
                <div
                    className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-[#242424]"
                >
                    <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M9 3L3 9M3 3L9 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
            <h2 className="text-sm font-normal">cancel</h2>
            </div>
        )   
            break;
        case "expire":
                return(
                    <div
                        className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-[#242424]"
                    >
                        <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M9 3L3 9M3 3L9 9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        </svg>
                <h2 className="text-sm font-normal">expire</h2>
                </div>
            )   
                break;
            
        default:
            break;
    }
}