import { useEffect } from "react";
import { useState } from "react";
import { productService, transactionService } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import HeaderDrawer from "./public/HeaderDrawer";
import Footer from "./public/Footer";

const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

const ProductItems = ({ name, selectedProduct, setSelectedProduct }) => {
    const navigate = useNavigate();
    const [productItems, setProductItems] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProductItems = async () => {
            setIsLoading(true); // Set loading state
            try {
                const response = await productService.getItemProduct(name);
                setProductItems(response.data.data);
            } catch (error) {
                console.log(error.response);
                if(error.response.status == 404){
                    navigate(-1);
                }
                setError(true);
            } finally {
                setIsLoading(false); // Reset loading state
            }
        };
        fetchProductItems();
    }, [name]); // Tambahkan name ke dependency array
    
    if (isLoading) {
        return <div className="text-gray-400">Loading...</div>; // Tampilkan loading
    }

    if (!productItems.length || error) {
        return <div className="text-gray-400">No product items available</div>;
    }


    return (
        <fieldset className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <legend className="sr-only">Delivery</legend>
            {productItems.map(item => (

                <div key={item.product_code}> {/* Tambahkan key */}
                <label
                    htmlFor={item.product_code}
                    className="block h-full cursor-pointer rounded-lg border bg-[#242424] p-4 text-sm font-medium shadow-sm has-[:checked]:border-[#74ae6e] has-[:checked]:ring-1 has-[:checked]:ring-[#74ae6e] border-gray-800 hover:border-gray-700"
                >
                    <div className="flex flex-col justify-evenly h-full">
                        <p className="text-gray-200 h-full">{item.detail}</p>
                        <p className="mt-1 text-white font-light">Rp{item.price.toLocaleString('id-ID')}</p>
                    </div>
                    <input
                        type="radio"
                        name="product_code"
                        value={item.product_code} // Gunakan product_code sebagai value
                        id={item.product_code} // Gunakan product_code sebagai id
                        className="sr-only"
                        checked={selectedProduct === item.product_code}
                        onChange={() => setSelectedProduct(item.product_code)} // Set selected product
                    />
                </label>
                </div>
                
                // if (item.status === 1) { // Gunakan if untuk memeriksa status
                    
                //     return (
                        
                //     );
                // }
                   // Pastikan untuk mengembalikan null jika status bukan 1
            ))}
        </fieldset>
    );
};

function ProductPage(){
    const { product } = useParams();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const data = {
        phoneNumber: phoneNumber,
        selectedProduct: selectedProduct,  
    };
    const [invalidMessage, setInvalidMessage] = useState({
        phoneNumber: "",
        selectedProduct: "",
    });
    const [errorMessage, setErrorMessage] = useState("");


    const validation = () => {
        const newInvalidMessage = { ...invalidMessage };
        let countNot = 0
        for (let [key, value] of Object.entries(data)) {
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
            phoneNumber: "",
            selectedProduct: "",
        })
        setErrorMessage("")
        let validate = validation();
        if (validate == true){
            setIsLoading(false);
            return;
        }


        try {
            if (!isAuthenticated()){
                navigate("/signin");
                return
            }
            const response = await transactionService.createTransaction({
                product_code: selectedProduct,
                destination: phoneNumber
            });
            if(response.status == 200){
                const url = "/transaction/"+response.data.data;
                console.log("Navigating to:", url); // tambahkan ini
                navigate(url);
            }
            

        } catch (error) {
            setErrorMessage(error.response.data.message);
            
            if (error.response.status == 500){
            }
            
        } finally {
            setIsLoading(false);
        }
        
    };


    
    
    return (
        <div className="w-full min-h-[100vh] bg-[#070707] xl:px-32 md:px-12 sm:px-9 px-5 mt-0">
  <div className="py-8">
    <h2 className="font-title text-center text-[clamp(2rem,5.2vw,3rem)] font-black leading-none xl:text-start">
      <span className="motion-reduce:!opacity-100" style={{ opacity: 1 }}>
        { String(product).charAt(0).toUpperCase() + String(product).slice(1) }
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
  <form onSubmit={handleSubmit} className="flex gap-4">
    <div className="w-full flex flex-col gap-y-4">
      <div className="bg-[#181718] h-min shadow-xl rounded-lg px-6 py-6">
        <h2 className="text-lg">Phone Number</h2>
        <label className="form-control w-full">
          <div className="w-full flex font-bold text-3xl md:text-4xl">
            <input
              type="number"
              placeholder="08xxx"
              name="destination"
              max="99999999999999"
              maxLength="14"
              min="0"
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input placeholder:text-3xl placeholder:md:text-4xl placeholder:font-bold text-3xl md:text-4xl ps-1 w-full border-0 ring-0 focus:outline-none bg-[#181718] caret-[#74ae6e]"
            />
          </div>
          
          {invalidMessage.phoneNumber != "" && (
                <label  className="block mt-1 text-xs font-base text-red-500">
                {invalidMessage.phoneNumber}
              </label>
            )}
        </label>
      </div>
      <div className="bg-[#181718] h-min shadow-xl rounded-xl px-6 py-6">
        <h2 className="card-title">Choose Item</h2>
        {invalidMessage.selectedProduct != "" && (
                <label  className="block mt-1 text-xs font-base text-red-500">
                {invalidMessage.selectedProduct}
              </label>
            )}
        <div className="divider mt-0 mb-4"></div>
        
        <ProductItems name={product} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />

      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="btn w-full border-0 bg-[#6b0099] text-lg text-white hover:bg-[#242424] hover:ring-1 hover:ring-[#6b0099]"
      >
        {isLoading ? "Requesting Order..." : "Order"}
      </button>
    </div>
  </form>
</div>
    )
}

export default function Product(){
    
    return (
        <>
            <HeaderDrawer>
                <ProductPage />
            </HeaderDrawer>
            <Footer />
        </>
    )
}