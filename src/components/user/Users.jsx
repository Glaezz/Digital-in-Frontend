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

const EditForm = ({user, update, setUpdate}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [authority, setAuthority] = useState("");
    const [balance, setBalance] = useState("");
    const [password, setPassword] = useState("");
    const [invalidMessage, setInvalidMessage] = useState({
        username: "",
        email: "",
        password: "",
        authority: "",
        balance: "",
    });
    const userData = {
        username: username,
        email: email,
        password: password,
        authority: authority,
        balance: balance,
    };
    const [infoMessage, setInfoMessage] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);

    const validation = () => {
        const newInvalidMessage = { ...invalidMessage };
        let countNot = 0
        for (let [key, value] of Object.entries(userData)) {
            if (value === "") {
                newInvalidMessage[key] = "The "+key + " field cannot be blank";
            } else {
                newInvalidMessage[key] = ""
                countNot++;
            }
        }
        
        
        if(countNot != 5){
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
            username: "",
            email: "",
            password: "",
            authority: "",
            balance: "",
        })
        setInfoMessage("");
        let validate = validation();
        if (validate == true){
            setIsLoading(false);
            return;
        }

        const pushUpdate = async () => {
            try {
                const response = await adminService.user.editUser(user, {
                    username: username,
                    email: email,
                    password: password,
                    authority: authority,
                    balance: balance
                });
                if(response.status == 200){
                    setInfoMessage(response.data.message);
                    setUpdate(update+1);
                }
            } catch (error) {
                if(error.response.status == 422){
                    setInvalidMessage({
                        email: error.response.data.message.email[0],
                    })
                }
                if(error.response.status == 404){
                    setInfoMessage("Data not found");
                }
            }
            finally{
                setIsLoading(false);
            }
        }
        pushUpdate();


    }

    useEffect(() => {
        const fetchData = async () => {
                try {
                    setIsLoading(true);
                    const response = await adminService.user.showUser(user);
                    setUsername(response.data.data.username);
                    setEmail(response.data.data.email);
                    setAuthority(response.data.data.authority);
                    setBalance(response.data.data.balance);
                    console.log(response);
                } catch (error) {
                    console.log(error);
                    
                }
                finally{
                    setIsLoading(false);
                }

            }
        fetchData();
    },[user]);
    
    return (
        <dialog id="editModal" className="modal">
        <div className="modal-box bg-[#181718] rounded-lg">
            <h3 className="font-bold text-lg">Edit Data</h3>
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
              Username
            </label>

            <input
              type="text"
              id="Username"
              name="username"
              value={username}
              onChange={(e) => {setUsername(e.target.value)}}
              className="mt-1 px-3 py-2 w-full rounded-md text-sm shadow-sm border-gray-700 bg-[#242424] text-gray-200"
            />
            {invalidMessage.username != "" && (
                <label  className="block mt-1 text-xs font-base text-red-500">
                {invalidMessage.username}
              </label>
            )}
          </div>
          <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-200">
              Email
            </label>

            <input
              type="email"
              id="Email"
              name="email"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              className="mt-1 px-3 py-2 w-full rounded-md text-sm shadow-sm border-gray-700 bg-[#242424] text-gray-200"
            />
            {invalidMessage.email != "" && (
                <label className="block mt-1 text-xs font-base text-red-500">
                {invalidMessage.email}
              </label>
            )}
          </div>

          <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-200">
              Password
            </label>

            <input
              type="password"
              id="Password"
              name="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              className="mt-1 px-3 py-2 w-full rounded-md text-sm shadow-sm border-gray-700 bg-[#242424] text-gray-200"
            />
            {invalidMessage.password != "" && (
                <label className="block mt-1 text-xs font-base text-red-500">
                {invalidMessage.password}
              </label>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-200">
              Authority
            </label>
            <select name="authority" id="authority" value={authority} onChange={(e) => setAuthority(e.target.value)} className="mt-1 px-2 py-2 w-full rounded-md text-sm shadow-sm border-gray-700 bg-[#242424] text-gray-200" >
                <option value="user" className="mt-0 px-2 py-1 text-xs">User</option>
                <option value="admin" className="mt-0 px-2 py-1 text-xs">Admin</option>
            </select>
            {/* <input
              type=""
              id="Password"
              name="password"
              onChange={(e) => {setPassword(e.target.value)}}
              className="mt-1 px-3 py-2 w-full rounded-md text-sm shadow-sm border-gray-700 bg-[#242424] text-gray-200"
            /> */}
            {invalidMessage.authority != "" && (
                <label className="block mt-1 text-xs font-base text-red-500">
                {invalidMessage.authority}
              </label>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-200">
              Balance
            </label>

            <input
              type="number"
              id="confirmPassword"
              name="confirmPassword"
              value={balance}
              onChange={(e) => {setBalance(e.target.value)}}
              className="mt-1 px-3 py-2 w-full rounded-md text-sm shadow-sm border-gray-700 bg-[#242424] text-gray-200"
            />
            
            {invalidMessage.balance != "" && (
                <label className="block mt-1 text-xs font-base text-red-500">
                {invalidMessage.balance}
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
            {isLoading ? "Loading..." : "Edit User"}
            </button>
            </div>
        </form>
        </div>
        </dialog>
    )
}

function UsersPage(){ 
    const navigate = useNavigate();
    const [update, setUpdate] = useState(0);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [pagination, setPagination] = useState({
        total: 0,
        perPage: 10,
        currentPage: 1,
        lastPage: 1
    });
    const [selectedUser, setSelectedUser] = useState();
    const [successMessage, setSuccessMessage] = useState("");
    

    const fetchTransactions = async (page = 1) => {
        try {
            const response = await adminService.user.allUser({
                search: search,
                page: page,
            })
            
            if (response.status === 200 && response.data && response.data.data) {
                console.log(response);
                setUsers(response.data.data.data.data);
                setPagination({
                    total: response.data.data.data.total,
                    perPage: response.data.data.data.per_page,
                    currentPage: response.data.data.data.current_page,
                    lastPage: response.data.data.data.last_page
                });
            } else {
                setErrorMessage("Unable to fetch users");
            }
        } catch (error) {
            // console.error("Error fetching users:", error);
            // setErrorMessage("An error occurred while fetching users");
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
    }, [search, update]);

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

    const deleteData = async (id) => {
        try {
            const response = await adminService.user.deleteUser(id);
            console.log(response);
            if(response.status == 200){
                // setSuccessMessage(response.data.message);
                setUpdate(update+1);
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className="bg-[#070707] w-full min-h-screen xl:px-32 md:px-12 sm:px-9 px-5 mt-0">
        <EditForm user={selectedUser} update={update} setUpdate={setUpdate}/>
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
                    Users
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
                            <span>ID</span>
                        </div>
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Username
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Email
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Authority
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                        >
                        Balance
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
                    {users.map(data => (
                        <tr 
                            key={data.id} 
                            className="cursor-pointer"
                        >
                            <td className="px-4 py-4 text-sm font-medium text-gray-200">
                                <span>#{data.id}</span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {data.username}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {data.email}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {data.authority}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                {data.balance}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <span
                            className="inline-flex overflow-hidden rounded-md bg-[#242424] shadow-xs"
                            >
                                <button
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
                                </button>

                            <button
                                className="inline-block p-3 focus:relative text-gray-200 hover:bg-[#2b2b2b]"
                                title="Delete Data"
                                onClick={() => {
                                    deleteData(data.id);
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
                Users
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
                {users.map(data => (
                    <tr key={data.id} className="cursor-pointer">
                    <td className="px-4 py-4 text-sm font-medium text-gray-200 flex flex-col">
                        <span>#{data.id}</span>
                        <span className="font-normal text-gray-300">{data.username}</span>
                        <span className="font-normal text-gray-300">{data.email}</span>
                        <span className="font-normal text-gray-300">authority: {data.authority}</span>
                        <span className="font-normal text-gray-300">balance: {data.balance}</span>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <span
                            className="inline-flex overflow-hidden rounded-md bg-[#242424] shadow-xs"
                            >
                                <button
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
                                </button>

                            <button
                                className="inline-block p-3 focus:relative text-gray-200 hover:bg-[#2b2b2b]"
                                title="Delete Data"
                                onClick={() => {
                                    deleteData(data.id);
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

export default function Users({authority}){
    return(
        <>
            <HeaderDrawer authority={authority}>
                    <UsersPage/>
            </HeaderDrawer>
            <Footer />
        </>
    )
}