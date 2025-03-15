import { useState } from "react";
import { balanceService } from "../../services/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderDrawer from "../public/HeaderDrawer";
import Footer from "../public/Footer";


function DepositPage(){

    const [payments, setPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [amount, setAmount] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');
    const navigate = useNavigate();
    const depositData = {
        amount: amount,
        selectedPayment: selectedPayment,
    };
    
    const [invalidMessage, setInvalidMessage] = useState({
        amount: "",
        selectedPayment: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const validation = () => {
        const newInvalidMessage = { ...invalidMessage };
        let countNot = 0
        for (let [key, value] of Object.entries(depositData)) {
            if (value === "") {
                newInvalidMessage[key] = "The "+key + " field cannot be blank";
            } else {
                newInvalidMessage[key] = ""
                countNot++;
            }
        }
        
        
        if(countNot != 2){
            setInvalidMessage(newInvalidMessage);
            setIsLoading(false);
            return true;
        } else {
            return false;
        }
    };



    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setIsLoading(true);
            setInvalidMessage({
                nominal: "",
                selectedPayment: ""
            })
            setErrorMessage("");
            let validate = validation();
            if (validate == true){
                setIsLoading(false);
                return;
            }
        
        
        try {
            const response = await balanceService.chargeDeposit({
                amount: amount,
                payment_method: selectedPayment
            });
            console.log(response);
            
            if(response.status == 201){
                navigate("/balance/transaction/"+response.data.data)
            }

        } catch (error) {
            setErrorMessage(error.response.data.message);
            if (error.response.status == 500){
            }
            console.log(error);
            
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await balanceService.getPayment();
                setPayments(response.data.data);
                console.log(response);
                
                
            } catch (error) {
                console.log(error);
                
            }finally{

            }
        }
        fetchPayments();
    }, [])



    function formatRupiah(input) {
        const originalValueInput = document.getElementById("original-value");
        
        
        
        const max = parseInt(input.max, 10); // Ambil nilai max dari atribut
        const min = parseInt(input.min, 10); // Ambil nilai min dari atribut
      
        // Simpan nilai sebelum perubahan
        const previousValue = input.dataset.previousValue || "";
        
        // Hapus angka awal 0 (kecuali angka 0 saja)
        let value = input.value.replace(/^0+(?!$)/, "");
        let originalValue;
      
        // Hapus karakter non-numerik (untuk berjaga-jaga jika ada)
        value = value.replace(/\D/g, "");
      
        // Jika melebihi max, kembalikan ke nilai sebelumnya
        if (value && parseInt(value, 10) > max) {
          value = previousValue;
        }
      
        // Jika kurang dari min, set ke min
        if (value && parseInt(value, 10) < min) {
            value = min.toString();
        }
        
        // Perbarui nilai input dan simpan nilai sebelumnya
        
        input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Format angka dengan titik
        input.dataset.previousValue = value; // Simpan nilai terbaru sebagai referensi
        
        // Update nilai asli tanpa format ke input tersembunyi
        originalValueInput.value = value;
        setAmount(value);
        console.log(value);
        
    }  



    return(
        <div className="bg-[#070707] w-full min-h-screen xl:px-32 md:px-12 sm:px-9 px-5 mt-0">
        <div className="py-8">
            <h2 className="font-title text-center text-[clamp(2rem,5.2vw,3rem)] font-black leading-none xl:text-start">
            <span className="motion-reduce:!opacity-100" style={{ opacity: 1 }}>
                Deposit
            </span>
            </h2>
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
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-y-4">
            <div className="bg-[#181718] h-min shadow-xl rounded-lg px-6 py-6">
                <h2 className="text-lg">Deposit Amount</h2>
                <label className="form-control w-full">
                <div className="w-full flex font-bold text-3xl md:text-4xl">
                    <span className="text-gray-100">Rp</span>
                    <input
                    type="number"
                    onInput={(e) => formatRupiah(e.target)}
                    placeholder="50.000"
                    max="1000000"
                    min="0"
                    className="input placeholder:text-3xl placeholder:md:text-4xl placeholder:font-bold text-3xl md:text-4xl ps-1 w-full border-0 ring-0 focus:outline-none bg-[#181718] caret-[#74ae6e]"
                    />
                    <input type="hidden" id="original-value" name="amount" />
                </div>
                {invalidMessage.amount != "" && (
                    <label  className="block mt-1 text-xs font-base text-red-500">
                    {invalidMessage.amount}
                </label>
                )}
                </label>
            </div>
            <div className="bg-[#181718] px-6 py-4 rounded-lg">
                <div className="pb-3">
                <h2 className="text-start text-xl md:text-2xl font-medium">
                    <span className="motion-reduce:!opacity-100" style={{ opacity: 1 }}>
                    Payment Method
                    </span>
                </h2>
                    {invalidMessage.selectedPayment != "" && (
                        <label  className="block mt-1 text-xs font-base text-red-500">
                        {invalidMessage.selectedPayment}
                    </label>
                    )}
                </div>
                <fieldset>
                <div>
                    <div className="flex justify-between items-center pt-2 pb-1">
                    <span className="text-medium md:text-lg font-normal">Virtual Account</span>
                    <span className="text-xs md:text-sm font-light px-2 py-1 border rounded-md border-slate-800">Up to Rp4.000 Fee</span>
                    </div>

                    <div className="space-y-2">
                    <legend className="sr-only">Payment</legend>

                    {payments?.virtual_account?.map(data => (
                        <div>
                        <label
                        htmlFor={data.name}
                        className="flex items-center justify-between cursor-pointer rounded-lg bg-[#242424] hover:bg-[#2b2b2b] p-4 text-sm font-medium shadow-sm has-[:checked]:bg-[#2b2b2b] has-[:checked]:border-[#74ae6e] has-[:checked]:ring-[1px] has-[:checked]:ring-[#74ae6e] border-gray-800 hover:border-gray-700"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                alt=""
                                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                className="size-6 md:size-8 rounded-full object-cover"
                                />
                                <span className="text-sm md:text-base font-medium">{data.name}</span>
                            </div>
                            <p className="text-white text-sm md:text-base">
                                {(() => {
                                if (data.fee_type === 'fixed') { // Use '===' for comparison
                                    return "Rp" + parseInt(data.fee_value).toLocaleString("id-ID"); // Use return statement
                                } else {
                                    return data.value + "%"; // Use return statement
                                }
                                })()}
                            </p>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={data.name}
                                id={data.name}
                                checked={selectedPayment === data.name}
                                onChange={() => setSelectedPayment(data.name)}
                                className="sr-only"
                            />
                            </label>
                        </div>
                    ))}
                    
                    </div>
                    <div className="divider my-3"></div>
                </div>
                <div>
                    <div className="flex justify-between items-center pb-1">
                    <span className="text-base md:text-lg font-normal">E-Wallet</span>
                    <span className="text-xs md:text-sm font-normal px-2 py-1 border rounded-md border-slate-800">Up to 1.5% Fee</span>
                    </div>
                    <div className="space-y-2">
                    <legend className="sr-only">Payment</legend>

                    {payments?.e_wallet?.map(data => (
                        <div>
                        <label
                        htmlFor={data.name}
                        className="flex items-center justify-between cursor-pointer rounded-lg bg-[#242424] hover:bg-[#2b2b2b] p-4 text-sm font-medium shadow-sm has-[:checked]:bg-[#2b2b2b] has-[:checked]:border-[#74ae6e] has-[:checked]:ring-[1px] has-[:checked]:ring-[#74ae6e] border-gray-800 hover:border-gray-700"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                alt=""
                                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                className="size-6 md:size-8 rounded-full object-cover"
                                />
                                <span className="text-sm md:text-base font-medium">{data.name}</span>
                            </div>
                            <p className="text-white text-sm md:text-base">
                                {(() => {
                                if (data.fee_type === 'fixed') {
                                    return "Rp" + parseInt(data.fee_value).toLocaleString("id-ID"); // Use return statement
                                } else {
                                    return data.fee_value + "%"; // Use return statement
                                }
                                })()}
                            </p>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={data.name}
                                id={data.name}
                                checked={selectedPayment === data.name}
                                onChange={() => setSelectedPayment(data.name)}
                                className="sr-only"
                            />
                            </label>
                        </div>
                    ))}
                    </div>

                    <div className="divider my-3"></div>
                </div>
                <div>
                    <div className="flex justify-between items-center pb-1">
                    <span className="text-base md:text-lg font-normal">Over Counter</span>
                    <span className="text-xs md:text-sm font-normal px-2 py-1 border rounded-md border-slate-800">Up to Rp6.000 Fee</span>
                    </div>
                    <div className="space-y-2">
                    <legend className="sr-only">Payment</legend>

                    {payments?.over_counter?.map(data => (
                        <div>
                        <label
                        htmlFor={data.name}
                        className="flex items-center justify-between cursor-pointer rounded-lg bg-[#242424] hover:bg-[#2b2b2b] p-4 text-sm font-medium shadow-sm has-[:checked]:bg-[#2b2b2b] has-[:checked]:border-[#74ae6e] has-[:checked]:ring-[1px] has-[:checked]:ring-[#74ae6e] border-gray-800 hover:border-gray-700"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                alt=""
                                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                className="size-6 md:size-8 rounded-full object-cover"
                                />
                                <span className="text-sm md:text-base font-medium">{data.name}</span>
                            </div>
                            <p className="text-white text-sm md:text-base">
                                {(() => {
                                if (data.fee_type === 'fixed') {
                                    return "Rp" + parseInt(data.fee_value).toLocaleString("id-ID"); // Use return statement
                                } else {
                                    return data.fee_value + "%"; // Use return statement
                                }
                                })()}
                            </p>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={data.name}
                                id={data.name}
                                checked={selectedPayment === data.name}
                                onChange={() => setSelectedPayment(data.name)}
                                className="sr-only"
                            />
                            </label>
                        </div>
                    ))}
                    </div>

                    <div className="divider my-3"></div>
                </div>
                </fieldset>
            </div>
            </div>
            <div>
            <button
                type="submit"
                disabled={isLoading}
                className="btn w-full border-0 bg-[#6b0099] text-lg text-white hover:bg-[#242424] hover:ring-1 hover:ring-[#6b0099]"
            >
                {isLoading ? "Loading" : "Deposit"}
            </button>
            </div>
        </form>
        </div>

    )
}

export default function Deposit(){

    return(
        <HeaderDrawer>
            <DepositPage/>
            <Footer/>
        </HeaderDrawer>
    )
}