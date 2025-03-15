import { useEffect } from "react";
import { adminService, transactionService } from "../../services/api";
import { useState } from "react";
import Status from "../public/Status";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../public/Footer";
import HeaderDrawer from "../public/HeaderDrawer";


const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};


function DepositsPage({authority}){ 
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [pagination, setPagination] = useState({
        total: 0,
        perPage: 10,
        currentPage: 1,
        lastPage: 1
    });

    const fetchTransactions = async (page = 1) => {
        
        
        try {
            const service = authority === "admin"
                ? adminService.deposit.allDeposit
                : transactionService.getUserTransaction;

            const response = await service({
                search: search,
                page: page,
            })
            
            if (response.status === 200 && response.data && response.data.data) {
                console.log(response);
                setTransactions(response.data.data.data.data);
                setPagination({
                    total: response.data.data.data.total,
                    perPage: response.data.data.data.per_page,
                    currentPage: response.data.data.data.current_page,
                    lastPage: response.data.data.data.last_page
                });
            } else {
                setErrorMessage("Unable to fetch transactions");
            }
        } catch (error) {
            // console.error("Error fetching transactions:", error);
            // setErrorMessage("An error occurred while fetching transactions");
            if(error.response.status == 403){
                navigate("/403")
            }
        }
    };

    useEffect(() => {
        if (!isAuthenticated()){
            navigate("/signin");
        };

        fetchTransactions();
    }, [search]);

    const handleNextPage = () => {
        if (pagination.currentPage < pagination.lastPage) {
            fetchTransactions(pagination.currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (pagination.currentPage > 1) {
            fetchTransactions(pagination.currentPage - 1);
        }
    };

    return (
        <div className="bg-[#070707] w-full min-h-screen xl:px-32 md:px-12 sm:px-9 px-5 mt-0">
        <section className="hidden sm:block mx-auto">
            <div className="flex flex-col">
            <div className="w-full flex justify-between py-6">
                <div>
                <h2 className="font-title text-center text-[clamp(2rem,5.2vw,3rem)] font-black leading-none xl:text-start">
                    <span className="motion-reduce:!opacity-100" style={{ opacity: 1 }}>
                    Deposits
                    </span>
                </h2>
                </div>
                <div className="relative md:w-2/5 w-2/4 self-end">
                <label htmlFor="Search" className="sr-only"> Search for... </label>
                <input
                    type="text"
                    id="Search"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Data"
                    className="w-full rounded-3xl py-3 ps-4 pe-10 shadow-sm text-sm md:text-md border-gray-700 bg-[#242424] text-white"
                />
                <span className="absolute inset-y-0 end-3 grid w-10 place-content-center">
                    <button type="button" className="text-gray-400 hover:text-gray-300">
                    <span className="sr-only">Search</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                    </button>
                </span>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div className="w-full border border-gray-700 md:rounded-lg">
                <table className="w-full divide-y divide-gray-700">
                    <thead className="bg-[#242424]">
                    <tr>
                        <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        <div className="flex items-center gap-x-3">
                            <span>Invoice</span>
                        </div>
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Date
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Amount
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Payment
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        User
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Status
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 divide-gray-700 bg-[#181718]">
                    {transactions.map(transaction => (
                        <tr 
                            key={transaction.id} 
                            onClick={() => navigate(`${transaction.id}`)} 
                            className="cursor-pointer"
                        >
                            <td className="px-4 py-4 text-sm font-medium text-gray-200">
                                <span>#{transaction.id}</span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {transaction.transaction_time}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {transaction.amount}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {transaction.payment_method.name}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {transaction.user.username}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <Status status={transaction?.status} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            <div className="mt-6 sm:flex sm:items-center sm:justify-between">
                <div className="text-sm text-gray-400">
                    Page <span className="font-medium text-gray-100">{pagination.currentPage} of {pagination.lastPage}</span>
                </div>
                <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                    {/* Previous button */}
                    <button
                        className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 border-0 rounded-md sm:w-auto gap-x-2 
                            ${pagination.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-[#075400] hover:ring-1 hover:ring-[#075400]'} 
                            text-gray-200 hover:bg-[#181718]`}
                        onClick={handlePrevPage}
                        disabled={pagination.currentPage === 1}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 rtl:-scale-x-100"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>
                        <span> Previous </span>
                    </button>

                    {/* Next button */}
                    <button
                        className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 border-0 rounded-md sm:w-auto gap-x-2 
                            ${pagination.currentPage === pagination.lastPage ? 'opacity-50 cursor-not-allowed' : 'bg-[#6b0099] hover:ring-1 hover:ring-[#6b0099]'} 
                            text-gray-200 hover:bg-[#181718]`}
                        onClick={handleNextPage}
                        disabled={pagination.currentPage === pagination.lastPage}
                    >
                        <span> Next </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 rtl:-scale-x-100"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            </div>
        </section>
        <section className="block sm:hidden container">
        <div className="flex flex-col">
            <div className="py-4">
            <h2 className="font-title text-center text-[clamp(2rem,2rem,3rem)] font-black leading-none xl:text-start">
                <span className="motion-reduce:!opacity-100" style={{ opacity: 1 }}>
                Deposits
                </span>
            </h2>
            </div>
            <div className="relative w-full py-4 self-end">
            <label htmlFor="Search" className="sr-only"> Search for... </label>
            <input
                type="text"
                id="Search"
                placeholder="Search Data"
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full py-2 ps-4 pe-10 border-0 shadow-0 sm:text-sm bg-[#242424] text-white"
            />
            <span className="absolute inset-y-0 end-3 grid w-10 place-content-center">
                <button type="button" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Search</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
                </button>
            </span>
            </div>
            <div className="flex justify-center w-full">
            <div className="w-full border border-gray-700 rounded-lg">
                <table className="w-full divide-y divide-gray-700">
                <thead className="bg-[#242424]">
                    <tr>
                    <th
                        scope="col"
                        className="px-4 py-3.5 w-3/4 text-sm font-normal text-left rtl:text-right text-gray-400"
                    >
                        Detail
                    </th>
                    <th
                        scope="col"
                        className="px-4 py-3.5 w-1/4 text-sm font-normal text-left rtl:text-right text-gray-400"
                    >
                        Status
                    </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 divide-gray-700 bg-[#181718]">
                {transactions.map(transaction => (
                    <tr key={transaction.id}  onClick={() => window.location = `/transaction/${transaction.transaction_id}`} className="cursor-pointer">
                    <td className="px-4 py-4 text-sm font-medium text-gray-200 flex flex-col">
                        <span>#{transaction.id}</span>
                        <span className="font-normal text-gray-300">{transaction.transaction_time}</span>
                        <span className="font-normal text-gray-300">{transaction.amount}</span>
                        <span className="font-normal text-gray-300">{transaction.payment_method.name}</span>
                        <span className="font-normal text-gray-300">{transaction.user.username}</span>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <Status status={transaction.status}/>
                    </td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
            </div>
            <div className="mt-6 sm:flex sm:items-center sm:justify-between">
            <div className="text-sm text-gray-400">
                Page <span className="font-medium text-gray-100">{pagination.currentPage} of {pagination.lastPage}</span>
            </div>
            <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
            <button
                className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 border-0 rounded-md sm:w-auto gap-x-2 
                    ${pagination.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-[#075400] hover:ring-1 hover:ring-[#075400]'} 
                    text-gray-200 hover:bg-[#181718]`}
                onClick={handlePrevPage}
                disabled={pagination.currentPage === 1}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:-scale-x-100"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                </svg>
                <span> Previous </span>
            </button>
                <button
                    className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 border-0 rounded-md sm:w-auto gap-x-2 
                        ${pagination.currentPage === pagination.lastPage ? 'opacity-50 cursor-not-allowed' : 'bg-[#6b0099] hover:ring-1 hover:ring-[#6b0099]'} 
                        text-gray-200 hover:bg-[#181718]`}
                    onClick={handleNextPage}
                    disabled={pagination.currentPage === pagination.lastPage}
                >
                    <span> Next </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 rtl:-scale-x-100"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                    </svg>
                </button>
            </div>
            </div>
        </div>
        </section>
    </div>
    )
}

export default function Deposits({authority}){
    return(
        <>
            <HeaderDrawer authority={authority}>
                    <DepositsPage authority={authority}/>
            </HeaderDrawer>
            <Footer />
        </>
    )
}