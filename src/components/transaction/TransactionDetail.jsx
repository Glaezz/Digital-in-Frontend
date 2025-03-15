import { useEffect } from "react";
import { useState } from "react"
import { adminService, transactionService } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import Status from "../public/Status";
import HeaderDrawer from "../public/HeaderDrawer";
import Footer from "../public/Footer";


const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

function TransactionDetailPage({authority}){
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState([]);
    const {id} = useParams();
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated()){
            navigate("/signin");
        };

        const fetchTransactionDetails = async () => {
            setIsloading(true);
            try {
                const service = authority === "admin" ? adminService.transaction.showTransaction : transactionService.showUserTransaction;
                const response = await service(id);
                setTransaction(response.data.data)
                console.log(transaction);
                
            } catch (error) {
                if(error.response.status == 403){
                    navigate("/403")
                }
                if(error.response.status == 404){
                    navigate("/404")
                }
            }finally{
                setIsloading(false);
            }

        }
        fetchTransactionDetails();
    }, []);

    if(isLoading){
        return (
            <div className="bg-[#070707] w-full min-h-screen xl:px-32 md:px-12 sm:px-9 px-5 mt-0">

            </div>
        )
    }



    return (
        <div className="bg-[#070707] w-full min-h-screen xl:px-32 md:px-12 sm:px-9 px-5 mt-0">
            <div className="py-8">
            <h2 className="font-title text-center text-[clamp(2rem,5.2vw,3rem)] font-black leading-none">
                <span className="motion-reduce:!opacity-100" style={{ opacity: 1 }}>
                Transaction Details
                </span>
            </h2>
            </div>
            <div className="w-full flex justify-center items-center">
            <div className="bg-[#181718] w-full sm:w-2/3 md:w-3/5 xl:w-2/5 px-6 pt-8 pb-12 rounded-lg receipt">
                <h2 className="card-title">Transaction #{transaction.transaction_id}</h2>

                <div className="flex justify-between pt-4 text-sm font-light">
                <span>{transaction.time}</span>
                <span className="text-end"> {transaction?.user?.username}</span>
                </div>
                <div className="divider mt-0 mb-1"></div>
                <div className="flex justify-between items-center pb-3">
                <span>{transaction?.product?.detail}</span>
                {/* <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-[#242424]">
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
                </div> */}
                
                    < Status status={transaction?.status} />

                </div>
                <div className="flex justify-between items-center px-4 py-2 mb-3 bg-[#242424]">
                <span>Amount</span>
                <span className="text-end">Rp{transaction?.price?.toLocaleString('id-ID')}</span>
                </div>
                <div className="divider my-0"></div>
                <div className="flex flex-col font-light text-sm justify-between">
                <span className="font-normal text-base">Order Details</span>
                <div className="flex justify-between">
                    <span>Item</span>
                    <span className="text-end">{transaction?.product?.detail}</span>
                </div>
                <div className="flex justify-between">
                    <span>Destination</span>
                    <span className="text-end">{transaction?.destination}</span>
                </div>
                <div className="flex justify-between">
                    <span>Serial Number</span>
                    <span className="text-end">{transaction?.sn_id}</span>
                </div>
                {authority === "admin" && (
                    <div className="flex justify-between">
                    <span>OkeConnect ID</span>
                    <span className="text-end">{transaction?.ok_id}</span>
                </div>
                )}
                </div>
            </div>
            </div>
            </div>
    )
}

export default function TransactionDetail({authority}){

    return(
        <>
            <HeaderDrawer>
                    <TransactionDetailPage authority={authority} />
            </HeaderDrawer>
            <Footer />
        </>
    )
}