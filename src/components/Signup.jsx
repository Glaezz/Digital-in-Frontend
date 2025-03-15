import { useEffect } from "react";
import { useState } from "react"
import { authService } from "../services/api";
import { Link, useNavigate } from "react-router-dom";


const SuccessPopUp = () => {
    
    return (
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-[#181718] rounded-lg">
            <h3 className="font-bold text-lg">Success</h3>
            <p className="py-4">We have sent email verification to your email, please verify to use any services.</p>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <Link to="/signin">
                <button className="btn bg-[#242424] border-0 text-gray-300">Sign in</button>
                </Link>
            </form>
            </div>
        </div>
        </dialog>
    )
}

const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

export default function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const userData = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    };
    const [invalidMessage, setInvalidMessage] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    
    useEffect(() => {
        if (isAuthenticated()){
            navigate("/");
        }
    }, [])

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
        
        
        if(countNot != 4){
            setInvalidMessage(newInvalidMessage);
            setIsLoading(false);
            return true;
        } else {
            return false;
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let validate = validation();
        console.log(validate);
        if (validate == true){
            setIsLoading(false);
            return;
        }
        setInvalidMessage({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setErrorMessage("");

        try {
            const response = await authService.signUp({username, email, password, confirmPassword});

            if (response.status == 201){
                // setSuccessMessage(response.data.message);
                document.getElementById('my_modal_1').showModal()
            }
            
        } catch (error) {
            if (error.response.status == 422){
                const newInvalidMessage = { ...invalidMessage };
                const message = error.response.data.message;
                for (let [key, value] of Object.entries(message)) {
                    newInvalidMessage[key] = value[0];
                }
                setInvalidMessage(newInvalidMessage);
            }
            
            if(error.response.status == 400){
              setErrorMessage(error.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    

    return (
        
        <section className="bg-[#070707]">
            <SuccessPopUp/>
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="10497.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <a className="block text-white" href="#">
          <span className="sr-only">Home</span>
          <svg
            className="h-8 sm:h-10"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
              fill="currentColor"
            />
          </svg>
        </a>

        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to Digital-in
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
        #1 E-Wallet & PPOB top up platform <br />
        Cheapest, Secure, Easy, and Fast!
        </p>
      </div>
    </section>

    <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          <a
            className="inline-flex size-16 items-center justify-center rounded-full text-blue-600 sm:size-20 bg-[#070707]"
            href="#"
          >
            <span className="sr-only">Home</span>
            <svg
              className="h-8 sm:h-10"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
                fill="currentColor"
              />
            </svg>
          </a>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl text-white">
            Welcome to Digital-in
          </h1>

          <p className="mt-4 leading-relaxed text-gray-400">
          #1 E-Wallet & PPOB top up platform <br />
          Cheapest, Secure, Easy, and Fast!
          </p>
        </div>

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

        <form onSubmit={handleSignup} className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label htmlFor="Username" className="block text-sm font-medium text-gray-200">
              Username*
            </label>

            <input
              type="text"
              id="Username"
              name="username"
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
              Email*
            </label>

            <input
              type="email"
              id="Email"
              name="email"
              onChange={(e) => {setEmail(e.target.value)}}
              className="mt-1 px-3 py-2 w-full rounded-md text-sm shadow-sm border-gray-700 bg-[#242424] text-gray-200"
            />
            {invalidMessage.email != "" && (
                <label className="block mt-1 text-xs font-base text-red-500">
                {invalidMessage.email}
              </label>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-200">
              Password*
            </label>

            <input
              type="password"
              id="Password"
              name="password"
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
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-200">
              Password Confirmation*
            </label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => {setConfirmPassword(e.target.value)}}
              className="mt-1 px-3 py-2 w-full rounded-md text-sm shadow-sm border-gray-700 bg-[#242424] text-gray-200"
            />
            
            {invalidMessage.confirmPassword != "" && (
                <label className="block mt-1 text-xs font-base text-red-500">
                {invalidMessage.confirmPassword}
              </label>
            )}
          </div>

          <div className="col-span-6">
            <p className="text-sm text-gray-400">
              By creating an account, you agree to our
              <a href="#" className="underline text-gray-200"> terms and conditions </a>
              and
              <a href="#" className="underline text-gray-200"> privacy policy </a>.
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button type="submit" className="inline-block shrink-0 w-full sm:w-max rounded-md px-12 py-3 border-0 bg-[#6b0099] text-white hover:bg-[#242424] hover:ring-1 hover:ring-[#6b0099]"
            disabled={isLoading}
            >
            {isLoading ? "Signing Up..." : "Create an account"}
            </button>

            <p className="mt-4 text-sm sm:mt-0 text-gray-400">
              Already have an account?
              <Link to="/signin" className="text-[#74ae6e] hover:text-[#8bc185] ps-1">Sign in</Link>.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</section>
    )
}