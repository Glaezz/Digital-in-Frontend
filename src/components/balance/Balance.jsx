import { useEffect } from "react";
import { useState } from "react";
import { balanceService } from "../../services/api";
import { Link } from "react-router-dom";
import HeaderDrawer from "../public/HeaderDrawer";
import Footer from "../public/Footer";


const BalanceStatus = ({status}) => {

    switch (status) {
        case "success":
            return (
                <svg
                fill="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 md:w-7 md:h-7"
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
            )
            break;
            
        case "pending":
            return(
                <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                className="w-6 h-6 md:w-7 md:h-7"
                >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier" fillRule="evenodd">
                    <path
                    id="clock1"
                    className="cls-1"
                    d="M1296,168a12,12,0,1,1,12-12A12,12,0,0,1,1296,168Zm0-22a10,10,0,1,0,10,10A10,10,0,0,0,1296,146Zm2.23,13.7-2.93-2.939a1.008,1.008,0,0,1-.3-0.774V151a1,1,0,0,1,2,0v4.531l2.7,2.7A1.039,1.039,0,1,1,1298.23,159.7Z"
                    transform="translate(-1284 -144)"
                    ></path>
                </g>
                </svg>
        )   
            break;
        case "expire":
            return (
                <svg
                fill="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 md:w-7 md:h-7"
                >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier" fillRule="evenodd">
                    <path
                    id="cancel"
                    className="cls-1"
                    d="M936,120a12,12,0,1,1,12-12A12,12,0,0,1,936,120Zm0-22a10,10,0,1,0,10,10A10,10,0,0,0,936,98Zm4.706,14.706a0.951,0.951,0,0,1-1.345,0l-3.376-3.376-3.376,3.376a0.949,0.949,0,1,1-1.341-1.342l3.376-3.376-3.376-3.376a0.949,0.949,0,1,1,1.341-1.342l3.376,3.376,3.376-3.376a0.949,0.949,0,1,1,1.342,1.342l-3.376,3.376,3.376,3.376A0.95,0.95,0,0,1,940.706,112.706Z"
                    transform="translate(-924 -96)"
                    ></path>
                </g>
                </svg>
        )
            break;

        case "cancel":
            return (
                <svg
                fill="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 md:w-7 md:h-7"
                >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier" fillRule="evenodd">
                    <path
                    id="cancel"
                    className="cls-1"
                    d="M936,120a12,12,0,1,1,12-12A12,12,0,0,1,936,120Zm0-22a10,10,0,1,0,10,10A10,10,0,0,0,936,98Zm4.706,14.706a0.951,0.951,0,0,1-1.345,0l-3.376-3.376-3.376,3.376a0.949,0.949,0,1,1-1.341-1.342l3.376-3.376-3.376-3.376a0.949,0.949,0,1,1,1.341-1.342l3.376,3.376,3.376-3.376a0.949,0.949,0,1,1,1.342,1.342l-3.376,3.376,3.376,3.376A0.95,0.95,0,0,1,940.706,112.706Z"
                    transform="translate(-924 -96)"
                    ></path>
                </g>
                </svg>
        )      
                break;
    
        default:
            break;
    }

}


function BalancePage(){
    const [balance, setBalance] = useState();
    const [deposit, setDeposit] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await balanceService.userBalanceHistory();
                setBalance(response.data.data.balance);
                setDeposit(response.data.data.transaction);
                
                
                
            } catch (error) {
                
            }finally{
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])



    // function formatRupiah(input) {
    //     const originalValueInput = document.getElementById("original-value");
      
    //     const max = parseInt(input.max, 10); // Ambil nilai max dari atribut
    //     const min = parseInt(input.min, 10); // Ambil nilai min dari atribut
      
    //     // Simpan nilai sebelum perubahan
    //     const previousValue = input.dataset.previousValue || "";
      
    //     // Hapus angka awal 0 (kecuali angka 0 saja)
    //     let value = input.value.replace(/^0+(?!$)/, "");
    //     let originalValue;
      
    //     // Hapus karakter non-numerik (untuk berjaga-jaga jika ada)
    //     value = value.replace(/\D/g, "");
      
    //     // Jika melebihi max, kembalikan ke nilai sebelumnya
    //     if (value && parseInt(value, 10) > max) {
    //       value = previousValue;
    //     }
      
    //     // Jika kurang dari min, set ke min
    //     if (value && parseInt(value, 10) < min) {
    //       value = min.toString();
    //     }
      
    //     // Perbarui nilai input dan simpan nilai sebelumnya
    
    //     input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Format angka dengan titik
    //     input.dataset.previousValue = value; // Simpan nilai terbaru sebagai referensi
      
    //     // Update nilai asli tanpa format ke input tersembunyi
    //     originalValueInput.value = value;
    // }  

    if(isLoading){
        return(
            <div className="bg-[#070707] w-full min-h-screen xl:px-32 md:px-12 sm:px-9 px-5 mt-0"></div>
        )
    }


    return(
        <div className="bg-[#070707] w-full min-h-screen xl:px-32 md:px-12 sm:px-9 px-5 mt-0">
        <div className="py-8">
        <h2 className="font-title text-center text-[clamp(2rem,5.2vw,3rem)] font-black leading-none xl:text-start">
            <span className="motion-reduce:!opacity-100" style={{ opacity: 1 }}>
            Balance
            </span>
        </h2>
        </div>
        <div className="w-full items-center">
        <div className="flex justify-between items-center md:items-start bg-[#181718] w-full px-6 pt-6 pb-7 rounded-lg">
            <div>
            <p className="text-base xl:text-xl">Balance IDR</p>
            <span className="text-2xl md:text-3xl xl:text-4xl font-[640]">Rp{balance?.toLocaleString("id-ID")}</span>
            </div>
            <div className="w-max flex gap-2">
            <Link
                to="/balance/transaction"
                className="flex items-center justify-center px-3 py-2 text-sm transition-colors duration-200 border-0 rounded-md gap-x-2 bg-[#075400] hover:ring-1 hover:ring-[#075400] text-gray-200 hover:bg-[#181718]"
            >
                <svg
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="w-4 h-4"
                >
                <path
                    fill="white"
                    fillRule="evenodd"
                    d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm14 .069a1 1 0 01-1 1h-2.931V14a1 1 0 11-2 0v-2.931H6a1 1 0 110-2h3.069V6a1 1 0 112 0v3.069H14a1 1 0 011 1z"
                />
                </svg>
                <span className="text-base"> Deposit </span>
            </Link>
            <Link
                to="/"
                className="hidden md:flex items-center justify-center px-3 py-2 text-sm transition-colors duration-200 border-0 rounded-md gap-x-2 bg-[#6b0099] hover:ring-1 hover:ring-[#6b0099] text-gray-200 hover:bg-[#181718]"
            >
                <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                >
                <path
                    d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                </svg>
                <span className="text-base"> Let's Spend!</span>
            </Link>
            </div>
        </div>
        </div>
        <div>
        <div className="pt-8 pb-4 px-6">
            <h2 className="text-start text-2xl font-bold">
            <span className="motion-reduce:!opacity-100" style={{ opacity: 1 }}>
                History
            </span>
            </h2>
        </div>

        {deposit.map(data => (
            <div key={data.id}>
                <Link to={`transaction/${data.id}`}>
                <div className="flex justify-between rounded-md py-4 px-6 hover:bg-[#242424]">
                    <div className="flex items-center gap-4">
                    <BalanceStatus status={data?.status}/>
                    <div className="flex flex-col">
                        <span className="text-base md:text-xl font-semibold">Deposit</span>
                        <span className="text-sm md:text-base">{data?.transaction_time}</span>
                    </div>
                    </div>
                    <div className="flex flex-col text-end">
                    <span className="text-base md:text-xl font-semibold">Rp{data?.amount?.toLocaleString("id-ID")}</span>
                    <span className="text-sm md:text-base">{data?.payment_method?.name}</span>
                    </div>
                </div>
                </Link>
                <div className="divider my-0"></div>
            </div>
        ))}
        
        </div>
        </div>
    )
}

export default function Balance(){

    return(
        <HeaderDrawer>
            <BalancePage/>
            <Footer/>
        </HeaderDrawer>
    )
}