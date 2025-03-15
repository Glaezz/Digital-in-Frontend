import { useEffect } from "react";
import { useState } from "react"
import { adminService } from "../../services/api";
import Footer from "../public/Footer";
import HeaderDrawer from "../public/HeaderDrawer";
import { useNavigate } from "react-router-dom";


function DashboardPage() {
    const [statistic, setStatistic] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reportType, setReportType] = useState('monthly');
    const [dateValue, setDateValue] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await adminService.statistic({
                type: reportType,
                date: dateValue
            });
            setStatistic(response.data);
            console.log(response);
        } catch (error) {
            if (error.response?.status === 403) {
                navigate("/403");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const currentDate = new Date();
        setDateValue(currentDate.toISOString().slice(0, 7));
        fetchData();
    }, []);

    const handlePeriodChange = (e) => {
        e.preventDefault();
        fetchData();
    };

    if (isLoading) {
        return (
            <div className="bg-[#070707] w-full min-h-screen xl:px-32 md:px-12 sm:px-9 px-5 mt-0"></div>
        );
    }

    return (
        <div className="bg-[#070707] w-full min-h-screen xl:px-32 md:px-12 sm:px-9 px-5 mt-0">
            <div className="py-8">
                <h2 className="font-title text-center text-[clamp(2rem,5.2vw,3rem)] font-black leading-none xl:text-start">
                    <span className="motion-reduce:!opacity-100" style={{ opacity: 1 }}>
                        Admin Dashboard
                    </span>
                </h2>
            </div>

            {/* Period Filter */}
            <form onSubmit={handlePeriodChange} className="mb-6">
                <div className="flex gap-4 bg-[#181718] p-4 rounded-lg">
                    <div>
                        <select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            className="bg-[#242424] text-white px-4 py-2 rounded-md"
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type={
                                reportType === 'daily' ? 'date' :
                                reportType === 'weekly' ? 'week' :
                                'month'
                            }
                            value={dateValue}
                            onChange={(e) => setDateValue(e.target.value)}
                            className="bg-[#242424] text-white px-4 py-2 rounded-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Apply Filter
                    </button>
                </div>
            </form>

            <div className="grid-cols-1 md:grid-cols-3 grid gap-4">
                <article className="rounded-lg p-6 bg-[#181718]">
                    <div>
                        <p className="text-sm text-gray-400">Accumulated Profit</p>
                        <p className="text-2xl font-medium text-white">
                            Rp{statistic?.profit?.toLocaleString("id-ID")}
                        </p>
                    </div>
                    {/* <span className="text-xs text-gray-400">
                        {statistic?.period?.start_date === statistic?.period?.end_date
                            ? `On ${statistic?.period?.start_date}`
                            : `${statistic?.period?.start_date} - ${statistic?.period?.end_date}`}
                    </span> */}
                </article>

                <article className="rounded-lg p-6 bg-[#181718]">
                    <div>
                        <p className="text-sm text-gray-400">Transaction Executed</p>
                        <p className="text-2xl font-medium text-white">{statistic.count_transaction}</p>
                    </div>
                    {/* <span className="text-gray-400 text-xs">
                        {statistic?.period?.type} report
                    </span> */}
                </article>

                <article className="rounded-lg p-6 bg-[#181718]">
                    <div>
                        <p className="text-sm text-gray-400">User Registered</p>
                        <p className="text-2xl font-medium text-white">{statistic.count_user}</p>
                    </div>
                    {/* <span className="text-gray-400 text-xs">
                        {statistic?.period?.type} report
                    </span> */}
                </article>
            </div>

            <div className="my-4">
                <article className="rounded-lg p-6 bg-[#181718]">
                    <div>
                        <p className="text-sm text-gray-400">Most Frequently Purchased Products</p>
                        <div className="mt-2 flex flex-col gap-2 mt-3">
                            {Object?.entries(statistic?.most_purchase || {})?.map(([product, value]) => (
                                <div key={product} className="flex justify-between items-center px-3 py-2 rounded-md bg-[#242424]">
                                    <p className="text-lg font-medium text-white">{product}</p>
                                    <div className="inline-flex min-w-[8%] justify-center gap-2 rounded bg-green-100 p-1 text-green-600 dark:bg-green-700 dark:text-green-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        <span className="text-xs font-medium"> {value} </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}

export default function Dashboard({authority}){

    return(
        <HeaderDrawer authority={authority}>
            <DashboardPage/>
            <Footer/>
        </HeaderDrawer>
    )
}