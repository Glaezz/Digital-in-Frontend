import { useEffect } from "react";
import { adminService, transactionService } from "../../services/api";
import { useState } from "react";
import Status from "../public/Status";
import { data, Link, useNavigate } from "react-router-dom";
import HeaderDrawer from "../public/HeaderDrawer";
import Footer from "../public/Footer";


const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

const FetchForm = ({update, setUpdate}) => {
    const [url, setUrl] = useState("");
    const [invalidMessage, setInvalidMessage] = useState({
        url: "",
    });
    const urlData = {
        url: url,
    };
    const [infoMessage, setInfoMessage] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);

    const validation = () => {
        const newInvalidMessage = { ...invalidMessage };
        let countNot = 0
        for (let [key, value] of Object.entries(urlData)) {
            if (value === "") {
                newInvalidMessage[key] = "The "+key + " field cannot be blank";
            } else {
                newInvalidMessage[key] = ""
                countNot++;
            }
        }
        
        
        if(countNot != 1){
            setInvalidMessage(newInvalidMessage);
            setIsLoading(false);
            return true;
        } else {
            return false;
        }
    };
    
    function handleUpdate(e){
        e.preventDefault();
        setIsLoading(true);
        setInvalidMessage({
            url: "",
        })
        setInfoMessage("");
        let validate = validation();
        if (validate == true){
            setIsLoading(false);
            return;
        }

        const pushUpdate = async () => {
            try {
                const response = await adminService.product.fetchProduct({
                    url: url,
                });
                if(response.status == 200){
                    setInfoMessage(response.data.message);
                    setUpdate(update + 1)
                }
                console.log(response);
                
            } catch (error) {
                if(error.response.status == 422){
                    setInvalidMessage({
                        category: error.response.data.message.category[0],
                    })
                }
                if(error.response.status == 500){
                    setInfoMessage(error.response.data.message);
                }
            }
            finally{
                setIsLoading(false);
            }
        }
        pushUpdate();


    }
    
    return (
        <dialog id="fetchProducts" className="modal">
        <div className="modal-box bg-[#181718] rounded-lg">
            <h3 className="font-bold text-lg">Fetch Products</h3>
            {infoMessage && (
        <div
        className="hs-removing:translate-x-5 hs-removing:opacity-0 border text-sm w-full my-2 rounded-lg bg-red-800/10 border-yellow-900 text-yellow-500"
        role="alert"
        tabIndex="-1"
        aria-labelledby="hs-toast-soft-color-yellow-label"
        id="errorToast"
        >
        <div className="flex p-4">
            {infoMessage}
        
            <div className="ms-auto">
            <button
                type="button"
                className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 text-yellow-200"
                aria-label="Close" data-hs-remove-element="#errorToast"
                onClick={() => setInfoMessage("")}
                
            >
                <span className="sr-only">Close</span>
                <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
                </svg>
            </button>
            </div>
        </div>
        </div>
        
    )}
            <form onSubmit={handleUpdate} >
            <div className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label htmlFor="Username" className="block text-sm font-medium text-gray-200">
              API Url
            </label>

            <input
              type="text"
              id="Username"
              name="name"
              value={url}
              onChange={(e) => {setUrl(e.target.value)}}
              className="mt-1 px-3 py-2 w-full rounded-md text-sm shadow-sm border-gray-700 bg-[#242424] text-gray-200"
            />
            {invalidMessage.url != "" && (
                <label  className="block mt-1 text-xs font-base text-red-500">
                {invalidMessage.name}
              </label>
            )}
          </div>
        </div>
            
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn rounded-md bg-[#242424] border-0 text-gray-300" >Cancel</button>
            </form>
            <button type="submit" className="inline-block shrink-0 sm:w-max rounded-md px-12 py-3 border-0 bg-[#6b0099] text-white hover:bg-[#242424] hover:ring-1 hover:ring-[#6b0099]"
            disabled={isLoading}
            >
            {isLoading ? "Loading..." : "Fetch"}
            </button>
            </div>
        </form>
        </div>
        </dialog>
    )
}

function ProductsPage(){ 
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [update, setUpdate] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [pagination, setPagination] = useState({
        total: 0,
        perPage: 10,
        currentPage: 1,
        lastPage: 1
    });
    const [selectedProduct, setSelectedUser] = useState();
    const [successMessage, setSuccessMessage] = useState("");
    

    const fetchProducts = async (page = 1) => {
        try {
            const response = await adminService.product.allProduct({
                search: search,
                page: page,
            })
            
            if (response.status === 200 && response.data && response.data.data) {
                console.log(response);
                setProducts(response.data.data.data.data);
                setPagination({
                    total: response.data.data.data.total,
                    perPage: response.data.data.data.per_page,
                    currentPage: response.data.data.data.current_page,
                    lastPage: response.data.data.data.last_page
                });
            } else {
                setErrorMessage("Unable to fetch products");
            }
        } catch (error) {
            // console.error("Error fetching products:", error);
            // setErrorMessage("An error occurred while fetching products");
            if(error.response.status == 403){
                navigate("/403")
            }
        }
    };

    useEffect(() => {
        if (!isAuthenticated()){
            navigate("/signin");
        };

        fetchProducts();
    }, [search, update]);

    const handleNextPage = () => {
        if (pagination.currentPage < pagination.lastPage) {
            fetchProducts(pagination.currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (pagination.currentPage > 1) {
            fetchProducts(pagination.currentPage - 1);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await adminService.product.deleteProduct(id);
            if(response.status == 200){
                // setSuccessMessage(response.data.message);
                setUpdate(update + 1);
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className="bg-[#070707] w-full min-h-screen xl:px-32 md:px-12 sm:px-9 px-5 mt-0">
        <FetchForm update={update} setUpdate={setUpdate}/>
        {successMessage && (
                                <div
                                className="hs-removing:translate-x-5 hs-removing:opacity-0 border text-sm w-full my-2 rounded-lg bg-red-800/10 border-green-900 text-green-500"
                                role="alert"
                                tabIndex="-1"
                                aria-labelledby="hs-toast-soft-color-red-label"
                                id="errorToast"
                              >
                                <div className="flex p-4">
                                  {successMessage}
                              
                                  <div className="ms-auto">
                                    <button
                                      type="button"
                                      className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 text-green-200"
                                      aria-label="Close" data-hs-remove-element="#errorToast"
                                      onClick={() => setSuccessMessage("")}
                                      
                                    >
                                      <span className="sr-only">Close</span>
                                      <svg
                                        className="shrink-0 size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              
                            )}
        <section className="hidden sm:block mx-auto">
            <div className="flex flex-col">
            <div className="w-full flex justify-between py-6">
                <div>
                <h2 className="font-title text-center text-[clamp(2rem,5.2vw,3rem)] font-black leading-none xl:text-start">
                    <span className="motion-reduce:!opacity-100" style={{ opacity: 1 }}>
                    Products
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
            
            <button className="inline-block shrink-0 my-3 rounded-md px-12 py-3 border-0 bg-[#075400] text-white hover:bg-[#242424] hover:ring-1 hover:ring-[#075400]" onClick={() => {document.getElementById("fetchProducts").showModal()}}
            
            >Fetch Products</button>

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
                            <span>Code</span>
                        </div>
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Name
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Category
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Supply
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Price
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Status
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Action
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 divide-gray-700 bg-[#181718]">
                    {products.map(data => (
                        <tr 
                            key={data.product_code} 
                            className="cursor-pointer"
                        >
                            <td className="px-4 py-4 text-sm font-medium text-gray-200">
                                <span>#{data.product_code}</span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {data.detail}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {data.category.name}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {data.supply_price}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {data.price}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {data.status}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <span
                            className="inline-flex overflow-hidden rounded-md bg-[#242424] shadow-xs"
                            >
                                {/* <button
                                    className="inline-block  p-3 focus:relative text-gray-200 hover:bg-[#2b2b2b]"
                                    title="Edit Data"
                                    onClick={() => {
                                        setSelectedUser(data.id);
                                        document.getElementById('editModal').showModal()
                                    }}
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-4"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                    </svg>
                                </button> */}

                            <button
                                className="inline-block p-3 focus:relative text-gray-200 hover:bg-[#2b2b2b]"
                                title="Delete Data"
                                onClick={() => {
                                    deleteData(data.product_code);
                                }}
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                                </svg>
                            </button>
                            </span>
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
                Products
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
                        Action
                    </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 divide-gray-700 bg-[#181718]">
                {products.map(data => (
                    <tr key={data.id} className="cursor-pointer">
                    <td className="px-4 py-4 text-sm font-medium text-gray-200 flex flex-col">
                        <span>#{data.product_code}</span>
                        <span className="font-normal text-gray-300">{data.detail}</span>
                        <span className="font-normal text-gray-300">{data.category.name}</span>
                        <span className="font-normal text-gray-300">supply: {data.supply_price}</span>
                        <span className="font-normal text-gray-300">price: {data.price}</span>
                        <span className="font-normal text-gray-300">status: {data.status}</span>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <span
                            className="inline-flex overflow-hidden rounded-md bg-[#242424] shadow-xs"
                            >
                                {/* <button
                                    className="inline-block  p-3 focus:relative text-gray-200 hover:bg-[#2b2b2b]"
                                    title="Edit Data"
                                    onClick={() => {
                                        setSelectedUser(data.id);
                                        document.getElementById('editModal').showModal()
                                    }}
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-4"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                    </svg>
                                </button> */}

                            <button
                                className="inline-block p-3 focus:relative text-gray-200 hover:bg-[#2b2b2b]"
                                title="Delete Data"
                                onClick={() => {
                                    deleteData(data.product_code);
                                }}
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                                </svg>
                            </button>
                            </span>
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

export default function Products({authority}){
    return(
        <>
            <HeaderDrawer authority={authority}>
                    <ProductsPage/>
            </HeaderDrawer>
            <Footer />
        </>
    )
}