import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api";

const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

const Submitted = () => {

}

const PreSubmitted = () => {
    
}

export default function ForgotPassword(){
    
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
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
            const response = await authService.forgotPassword({ email });
            console.log(response);
            
            switch (response.status) {
                case 200:
                    setSubmitted(true);
                    break;
                default:
                    setErrorMessage("");
                    break;
            }
        } catch(err){
            switch (err.response.status) {
                case 400:
                    setErrorMessage("That address is invalid, not a verified or not associated with a user account.");
                    
                    break;
                case 422:
                    setErrorMessage("That address is invalid, not a verified or not associated with a user account.");
                    break;
                case 500:
                    setErrorMessage("That address is invalid, not a verified or not associated with a user account.");
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
                    Digital in
                    </span>
                </h2>
                </div>
                <div className="pb-8 text-lg text-center">
                <span>
                    Forgot your password?, let's reset your password.
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

                {submitted ? (
                    <div className="bg-[#181718] rounded-lg shadow-xl p-8">
                    <label
                        htmlFor="Email"
                        className="block text-sm font-medium text-gray-200"
                        >
                        Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.
                    </label>
                   
                    <div className="w-full pt-5">
                    
                        <Link
                        to="/signin"
                        className="w-full btn border-0 bg-[#2b2b2b] text-white hover:bg-[#242424] "
                        >
                        back to sign in
                        </Link>
                        
                    </div>
                </div>
                ) : (
                    <div className="bg-[#181718] rounded-lg shadow-xl p-8">
                    {/*  Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                    <div className="col-span-6">
                        <label
                        htmlFor="Email"
                        className="block text-sm font-medium text-gray-200"
                        >
                        Enter your user account's verified email address and we will send you a password reset link.
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
                   
                    <div className="w-full">
                    
                        <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn border-0 bg-[#6b0099] text-white hover:bg-[#242424] hover:ring-1 hover:ring-[#6b0099]"
                        >
                        {isLoading ? "Sending Email" : "Send password reset email"}
                        </button>
                        {/* <div className="mt-4 gap-4 text-center">
                            <span className="text-sm font-medium pe-1">
                                Don't have an account?
                            </span>
                            <Link
                                to="/signup"
                                className="text-sm font-medium text-[#74ae6e] hover:text-[#8bc185]"
                            >
                                Sign up
                            </Link>
                        </div> */}
                    </div>
                    </form>
                </div>
                )}
                
                </div>
            </div>
        </div>

    )
}