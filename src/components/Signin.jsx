import { useEffect } from "react";
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { authService } from "../services/api";



const Loading = () => {
    
    return (
        <div className="absolute top-5 start-5 w-3/4 sm:w-2/4 lg:w-1/4 rounded-xl shadow-lg bg-neutral-800 border-neutral-700" role="alert" tabindex="-1" aria-labelledby="hs-toast-message-with-loading-indicator-label">
        <div className="flex items-center p-4">
            <div className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
            </div>
            <p id="hs-toast-message-with-loading-indicator-label" className="ms-3 text-sm text-gray-700 dark:text-neutral-400">
            Logging In
            </p>
        </div>
        </div>
    )
}

const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

export default function Signin(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // const [invalidMessage, setInvalidMessage] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (isAuthenticated()){
            navigate("/");
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        try{
            const response = await authService.signIn({ email, password });
            console.log(response);
            
            switch (response.status) {
                case 200:
                    const token = response.data?.token;
                    if (token) {
                        localStorage.setItem("token", token);
                        navigate("/")
                    }
                    break;
                case 400:
                    setErrorMessage("That address is invalid, not a verified or not associated with a user account.");
                    
                    break;
                case 422:
                    setErrorMessage("Invalid credentials. Please try again.");
                    break;
                default:
                    setErrorMessage("");
                    break;
            }
        } catch(error){
            switch (error.response.status) {
                case 400:
                    setErrorMessage("That address is invalid, not a verified or not associated with a user account.");
                    
                    break;
                case 422:
                    setErrorMessage("Invalid credentials. Please try again.");
                    break;
                default:
                    setErrorMessage("");
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    }
    

    return (
        
        <div className="bg-[#070707] flex w-full min-h-screen xl:px-32 md:px-12 sm:px-9 px-5 mt-0">
            
            {/* Auth Container */}
            <div className="w-full h-full flex flex-col items-center self-justify-center self-center">
                <div className="pt-8 pb-4">
                <h2 className="font-title text-center text-[clamp(2rem,1vw,3rem)] font-black leading-none xl:text-start">
                    <span
                    className="motion-reduce:!opacity-100"
                    style={{ opacity: 1 }}
                    id="pageTitle"
                    >
                    Sign-in to Digital-in
                    </span>
                </h2>
                </div>
                <div className="pb-8 text-lg text-center">
                <span>
                    Let's Sign In and enjoy the digital product with cheapest price, secure,
                    easy, and fast!
                </span>
                </div>
                <div className="w-full max-w-md">
                {errorMessage && (
                                <div
                                className="hs-removing:translate-x-5 hs-removing:opacity-0 border text-sm w-full my-2 rounded-lg bg-red-800/10 border-red-900 text-red-500"
                                role="alert"
                                tabIndex="-1"
                                aria-labelledby="hs-toast-soft-color-red-label"
                                id="errorToast"
                              >
                                <div className="flex p-4">
                                  {errorMessage}
                              
                                  <div className="ms-auto">
                                    <button
                                      type="button"
                                      className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 text-red-200"
                                      aria-label="Close" data-hs-remove-element="#errorToast"
                                      onClick={() => setErrorMessage("")}
                                      
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
                <div className="bg-[#181718] rounded-lg shadow-xl p-8">
                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                    <div className="col-span-6">
                        <label
                        htmlFor="Email"
                        className="block text-sm font-medium text-gray-200"
                        >
                        Email
                        </label>
                        <input
                        type="email" 
                        id="Email"
                        name="email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        className="mt-1 p-2 w-full rounded-md text-sm shadow-sm border-gray-700 bg-[#242424] text-gray-200"
                        />
                    </div>

                    <div className="col-span-6">
                        <label
                        htmlFor="Password"
                        className="flex justify-between text-sm font-medium text-gray-200"
                        >
                        Password <Link
                            to="/forgot-password"
                            className="font-medium text-[#74ae6e] hover:text-[#8bc185]"
                        >
                            Forgot password?
                        </Link>
                        </label> 
                        <input
                        type="password"
                        id="Password"
                        name="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        className="mt-1 p-2 w-full rounded-md text-sm shadow-sm border-gray-700 bg-[#242424] text-gray-200"
                        />
                    </div>
                    
                    

                    {/* Uncomment the section below if needed */}
                    
                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-800 bg-[#242424] focus:ring-[#74ae6e] text-[#74ae6e]"
                        />
                        <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-gray-300"
                        >
                            Remember me
                        </label>
                        </div>
                        <div className="text-sm">
                        <a
                            href="#"
                            className="font-medium text-[#74ae6e] hover:text-[#8bc185]"
                        >
                            Forgot password?
                        </a>
                        </div>
                    </div> */}
                   
                    <div className="w-full">
                    
                        <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn border-0 bg-[#6b0099] text-white hover:bg-[#242424] hover:ring-1 hover:ring-[#6b0099]"
                        >
                        {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                        <div className="mt-4 gap-4 text-center">
                            <span className="text-sm font-medium pe-1">
                                Don't have an account?
                            </span>
                            <Link
                                to="/signup"
                                className="text-sm font-medium text-[#74ae6e] hover:text-[#8bc185]"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>

    )
}