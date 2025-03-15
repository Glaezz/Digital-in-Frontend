import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { balanceService } from "../../services/api";
import HeaderDrawer from "../public/HeaderDrawer";
import Footer from "../public/Footer";


const PaymentInfo = ({data}) => {
    switch (data?.status) {
        case "pending":
                switch (data.payment_details.type) {
                    case "e_wallet":
                            if(data.payment_details.name.toLowerCase() == "qris"){
                                return (
                                    <div className="flex flex-col gap-4 min-h-full w-full items-center md:w-2/5 lg:w-2/6 p-5 bg-[#181718] rounded-lg">
                                    <div className="text-center">
                                    <h6 className="mb-px text-red-400 text-lg font-semibold">
                                        Expire Date
                                    </h6>
                                    <h5 className="text-md text-red-400">{data.expiry_time}</h5>
                                    </div>
                                    <img
                                        src={data.payment_details.data}
                                        alt=""
                                        className="size-11/12 p-px bg-white rounded-lg"
                                    />
                                    <a
                                        href="#"
                                        className="w-11/12 flex items-center justify-center px-3 py-2 text-sm transition-colors duration-200 border-0 rounded-md gap-x-2 bg-[#075400] hover:ring-1 hover:ring-[#075400] text-gray-200 hover:bg-[#181718]"
                                    >
                                        <span className="text-base"> Download QR Code </span>
                                    </a>
                                    </div>
                                )
                            }else{
                                // other ewallet
                            }
                        break;
                    
                    case "virtual_account":
                        return(
                            <div className="flex flex-col gap-4 min-h-full w-full md:w-2/5 lg:w-2/6 p-5 bg-[#181718] rounded-lg">
                            <div className="text-center">
                            <h6 className="mb-px text-red-400 text-md font-semibold">
                                Expire Date
                            </h6>
                            <h5 className="text-sm text-red-400">{data.expiry_time}</h5>
                            </div>
                            <div>
                                <h6 className="font-semibold">Payment Details</h6>
                                <div className="mt-2 md:mt-3">
                                <div>
                                    <h5 className="mb-1 text-sm text-invoice-foreground">
                                    Virtual Account {data.payment_details.name} Number
                                    </h5>
                                    <div className="flex w-fit items-center gap-x-3">
                                    <h3 className="text-xl font-bold text-invoice-foreground md:text-base lg:text-xl">
                                        {data.payment_details.data}
                                    </h3>
                                    <button>
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-copy copy-icon text-xl text-primary-foreground !text-invoice-foreground"
                                        >
                                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                                        </svg>
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        )
                        break;
                    
                    case "over_counter":
                        return(
                            <div className="flex flex-col gap-4 min-h-full w-full md:w-2/5 lg:w-2/6 p-5 bg-[#181718] rounded-lg">
                            <div className="text-center">
                            <h6 className="mb-px text-red-400 text-md font-semibold">
                                Expire Date
                            </h6>
                            <h5 className="text-sm text-red-400">{data.expiry_time}</h5>
                            </div>

                            <div>
                                <h6 className="font-semibold">Payment Details</h6>
                                <div className="mt-2 md:mt-3">
                                <div>
                                    <h5 className="mb-1 text-sm text-invoice-foreground">
                                    Over Counter {data.payment_details.name} Number
                                    </h5>
                                    <div className="flex w-fit items-center gap-x-3">
                                    <h3 className="text-xl font-bold text-invoice-foreground md:text-base lg:text-xl">
                                        {data.payment_details.data}
                                    </h3>
                                    <button>
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-copy copy-icon text-xl text-primary-foreground !text-invoice-foreground"
                                        >
                                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                                        </svg>
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        )
                        break;

                    default:
                        break;
                }
            break;
        
        case "expire":
            return(
                <div className="flex flex-col items-center gap-4 min-h-full w-full md:w-2/5 lg:w-2/6 p-5 bg-[#181718] rounded-lg">
                <div className="flex flex-col gap-y-5 items-center">
                    <svg
                    fill="#D84040"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-2/6"
                    >
                    <path
                        d="M936,120a12,12,0,1,1,12-12A12,12,0,0,1,936,120Zm0-22a10,10,0,1,0,10,10A10,10,0,0,0,936,98Zm4.706,14.706a0.951,0.951,0,0,1-1.345,0l-3.376-3.376-3.376,3.376a0.949,0.949,0,1,1-1.341-1.342l3.376-3.376-3.376-3.376a0.949,0.949,0,1,1,1.341-1.342l3.376,3.376,3.376-3.376a0.949,0.949,0,1,1,1.342,1.342l-3.376,3.376,3.376,3.376A0.95,0.95,0,0,1,940.706,112.706Z"
                        transform="translate(-924 -96)"
                    />
                    </svg>

                    <div className="flex flex-col items-center">
                    <span className="text-lg font-medium">Deposit Expired</span>
                    <span>Expire, deposit can't processed</span>
                    </div>
                </div>
                </div>
            )
            break;

        case "cancel":
            return(
                <div className="flex flex-col items-center gap-4 min-h-full w-full md:w-2/5 lg:w-2/6 p-5 bg-[#181718] rounded-lg">
                <div className="flex flex-col gap-y-5 items-center">
                    <svg
                    fill="#D84040"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-2/6"
                    >
                    <path
                        d="M936,120a12,12,0,1,1,12-12A12,12,0,0,1,936,120Zm0-22a10,10,0,1,0,10,10A10,10,0,0,0,936,98Zm4.706,14.706a0.951,0.951,0,0,1-1.345,0l-3.376-3.376-3.376,3.376a0.949,0.949,0,1,1-1.341-1.342l3.376-3.376-3.376-3.376a0.949,0.949,0,1,1,1.341-1.342l3.376,3.376,3.376-3.376a0.949,0.949,0,1,1,1.342,1.342l-3.376,3.376,3.376,3.376A0.95,0.95,0,0,1,940.706,112.706Z"
                        transform="translate(-924 -96)"
                    />
                    </svg>

                    <div className="flex flex-col items-center">
                    <span className="text-lg font-medium">Deposit Expired</span>
                    <span>Expire, deposit can't processed</span>
                    </div>
                </div>
                </div>
            )
            break;

        case "success":
            return(
                <div className="flex flex-col items-center gap-4 min-h-full w-full md:w-2/5 lg:w-2/6 p-5 bg-[#181718] rounded-lg">
                <div className="flex flex-col gap-y-5 items-center">
                    <svg
                    fill="#74ae6e"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-2/6"
                    >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier" fillRule="evenodd">
                        <path
                        id="accept"
                        className="cls-1"
                        d="M1008,120a12,12,0,1,1,12-12A12,12,0,0,1,1008,120Zm0-22a10,10,0,1,0,10,10A10,10,0,0,0,1008,98Zm-0.08,14.333a0.819,0.819,0,0,1-.22.391,0.892,0.892,0,0,1-.72.259,0.913,0.913,0,0,1-.94-0.655l-2.82-2.818a0.9,0.9,0,0,1,1.27-1.271l2.18,2.184,4.46-7.907a1,1,0,0,1,1.38-.385,1.051,1.051,0,0,1,.36,1.417Z"
                        transform="translate(-996 -96)"
                        ></path>
                    </g>
                    </svg>

                    <div className="flex flex-col items-center">
                    <span className="text-lg font-medium">Deposit Success</span>
                    <span className="text-center">The deposit has been added to your balance</span>
                    </div>
                </div>
                </div>
            )
            break;
        
        default:
            break;
    }
}


function DepositDetailPage(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [depositData, setDepositData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await balanceService.showDeposit(id);
                setIsLoading(true);
                setDepositData(response.data.data);
            } catch (error) {
                if(error.response.status == 403){
                    navigate("/403")
                }
                if(error.response.status == 404){
                    navigate("/404")
                }
            }finally{
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])

    if(isLoading) {
        return (
            <div className="bg-[#070707] w-full min-h-screen xl:px-32 md:px-12 sm:px-9 px-5 mt-0">

            </div>
        )
    }



    return (
        <div className="bg-[#070707] w-full min-h-screen xl:px-32 md:px-12 sm:px-9 px-5 mt-0">
        <div className="py-8">
            <h2 className="font-title text-center text-[clamp(2rem,5.2vw,3rem)] font-black leading-none xl:text-start">
            <span className="motion-reduce:!opacity-100" style={{ opacity: 1 }}>
                Deposit Details
            </span>
            </h2>
        </div>

        <div className="pt-4 mb-10">
            <div>
            <div className="overflow-hidden rounded-full bg-gray-800">
                <div className={`h-2 rounded-full bg-[#74ae6e] ${depositData?.status == "pending" && ("w-1/2")}`}></div>
            </div>

            <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">
                <li className="flex items-center justify-start text-[#74ae6e] sm:gap-1.5">
                <span className="hidden sm:inline"> Created </span>
                <svg
                    className="size-6 sm:size-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M17 13.0001H21V19.0001C21 20.1047 20.1046 21.0001 19 21.0001M17 13.0001V19.0001C17 20.1047 17.8954 21.0001 19 21.0001M17 13.0001V5.75719C17 4.8518 17 4.3991 16.8098 4.13658C16.6439 3.90758 16.3888 3.75953 16.1076 3.72909C15.7853 3.6942 15.3923 3.9188 14.6062 4.368L14.2938 4.54649C14.0045 4.71183 13.8598 4.7945 13.7062 4.82687C13.5702 4.85551 13.4298 4.85551 13.2938 4.82687C13.1402 4.7945 12.9955 4.71183 12.7062 4.54649L10.7938 3.45372C10.5045 3.28838 10.3598 3.20571 10.2062 3.17334C10.0702 3.14469 9.92978 3.14469 9.79383 3.17334C9.64019 3.20571 9.49552 3.28838 9.20618 3.45372L7.29382 4.54649C7.00448 4.71183 6.85981 4.7945 6.70617 4.82687C6.57022 4.85551 6.42978 4.85551 6.29383 4.82687C6.14019 4.7945 5.99552 4.71183 5.70618 4.54649L5.39382 4.368C4.60772 3.9188 4.21467 3.6942 3.89237 3.72909C3.61123 3.75953 3.35611 3.90758 3.1902 4.13658C3 4.3991 3 4.8518 3 5.75719V16.2001C3 17.8803 3 18.7203 3.32698 19.3621C3.6146 19.9266 4.07354 20.3855 4.63803 20.6731C5.27976 21.0001 6.11984 21.0001 7.8 21.0001H19M7 13.0001H9M7 9.0001H13M7 17.0001H9M13 17.0001H13.01M13 13.0001H13.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                </svg>
                </li>

                <li className="flex items-center justify-center text-[#74ae6e] sm:gap-1.5">
                <span className="hidden sm:inline"> Payment </span>
                <svg
                    className="size-6 sm:size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                </svg>
                </li>

                <li className="flex items-center justify-end sm:gap-1.5">
                <span className="hidden sm:inline"> Success </span>
                <svg
                    className="size-6 sm:size-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M6 8H4M6 16H4M6 12H3M7 4.51555C8.4301 3.55827 10.1499 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C10.1499 21 8.4301 20.4417 7 19.4845M14 9.49991C13.5 9.37589 12.6851 9.37133 12 9.37589M12 9.37589C11.7709 9.37742 11.9094 9.36768 11.6 9.37589C10.7926 9.40108 10.0016 9.73666 10 10.6874C9.99825 11.7002 11 11.9999 12 11.9999C13 11.9999 14 12.2311 14 13.3124C14 14.125 13.1925 14.4811 12.1861 14.599C12.1216 14.599 12.0597 14.5991 12 14.5994M12 9.37589L12 8M12 14.5994C11.3198 14.6022 10.9193 14.6148 10 14.4999M12 14.5994L12 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                </svg>
                </li>
            </ol>
            </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-2 items-start">
            <PaymentInfo data={depositData}/>
            <div className="w-full md:w-3/5 lg:w-4/6 py-3 relative overflow-hidden rounded-lg bg-[#181718]">
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 px-6 py-5 lg:grid-cols-4 lg:gap-y-0 lg:bg-invoice-background">
                <div>
                <h6 className="mb-1 text-xs">Deposit Date</h6>
                <h5 className="text-sm font-semibold">{depositData?.transaction_time}</h5>
                </div>
                <div className="lg:col-span-2">
                <h6 className="mb-1 text-xs">Deposit ID</h6>
                <div className="flex w-fit items-center gap-x-3">
                    <h5 className="text-sm font-semibold">
                    {depositData?.midtrans_id}
                    </h5>
                    <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-copy copy-icon text-xl"
                    >
                        <rect
                        width="14"
                        height="14"
                        x="8"
                        y="8"
                        rx="2"
                        ry="2"
                        ></rect>
                        <path
                        d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                        ></path>
                    </svg>
                    </button>
                </div>
                </div>
                <div>
                <h6 className="mb-1 text-xs">Payment Method</h6>
                <h5 className="line-clamp-1 text-sm font-semibold">{depositData?.payment_details?.name}</h5>
                </div>
            </div>
            <div>
                <div className="divider my-0"></div>

                <div className="px-6 py-2">
                <h6 className="font-semibold">Deposit Details</h6>
                <div className="mt-3 md:mt-5">
                    <div className="flex flex-col gap-y-2">
                    <div className="flex w-full items-center justify-between">
                        <span className="mb-1 w-full text-sm">Amount</span>
                        <p className="w-full break-all text-xs font-semibold">
                        Rp{depositData?.item_details[0].price.toLocaleString("id-ID")}
                        </p>
                    </div>
                    <div className="flex w-full items-center justify-between">
                        <span className="mb-1 w-full text-sm">Payment fee</span>
                        <p className="w-full break-all text-xs font-semibold">
                        Rp{depositData?.item_details[1].price.toLocaleString("id-ID")}
                        </p>
                    </div>
                    </div>
                </div>
                </div>

                <div className="divider my-0"></div>

                <div className="px-6 py-5 item flex justify-between md:grid md:grid-cols-2">
                <h6 className="font-semibold">Total Payment</h6>
                <div className="flex w-fit items-center gap-x-3">
                    <div className="flex font-extrabold">
                    <span>Rp{depositData?.total.toLocaleString("id-ID")}</span>
                    </div>
                    <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-copy copy-icon text-xl"
                    >
                        <rect
                        width="14"
                        height="14"
                        x="8"
                        y="8"
                        rx="2"
                        ry="2"
                        ></rect>
                        <path
                        d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                        ></path>
                    </svg>
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default function DepositDetail({authority}){
    return(
        <HeaderDrawer>
            <DepositDetailPage authority={authority}/>
            <Footer/>
        </HeaderDrawer>
    )
}