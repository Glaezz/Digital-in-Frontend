
import { useEffect,useState } from 'react';
import { productService } from '../services/api';
import { Link } from "react-router-dom";
import HeaderDrawer from './public/HeaderDrawer';
import Footer from './public/Footer';

const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

const HeroNotLogged = () => {
    return (
        <div>
            <div
            className="inline-flex w-full flex-col items-stretch justify-center gap-2 px-4 md:flex-row xl:justify-start xl:px-0"
            >
            <a
                data-sveltekit-preload-data=""
                href="#products"
                className="btn group bg-[#075400] text-white hover:text-white border-0 md:btn-lg rounded-full md:px-10"
                >Check it out
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="hidden size-9 mt-2 rotate-90 transition-transform duration-300 group-hover:translate-y-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 md:inline-block"
                >
                <path
                    fillRule="evenodd"
                    d="M 6.707 15.293 a 1 1 -90 0 1 0 -1.414 L 10 10.586 l -3.293 -3.293 a 1 1 -90 1 1 1.414 -1.414 l 4 4 a 1 1 -90 0 1 -0 1.414 l -4 4 a 1 1 -90 0 1 -1.414 -0 z"
                    clipRule="evenodd"
                />
                </svg>
            </a>
            <Link
                to="/signin"
                className="btn group bg-[#6b0099] text-white hover:text-white border-0 md:btn-lg grow rounded-full px-12"
                >Sign in
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="hidden h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 md:inline-block"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path></svg></Link>
            </div>
        </div>
    )
}

const HeroLogged = () => {
    return (
        <div>
            <div
            className="inline-flex w-full flex-col items-stretch justify-center gap-2 px-4 md:flex-row xl:justify-start xl:px-0"
            >
            <a
                href="#products"
                className="btn group bg-[#075400] text-white border-0 md:btn-lg grow rounded-full px-12 border-0 hover:text-white"
                >Check it out
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="hidden size-9 mt-2 rotate-90 transition-transform duration-300 group-hover:translate-y-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 md:inline-block"
                >
                <path
                    fillRule="evenodd"
                    d="M 6.707 15.293 a 1 1 -90 0 1 0 -1.414 L 10 10.586 l -3.293 -3.293 a 1 1 -90 1 1 1.414 -1.414 l 4 4 a 1 1 -90 0 1 -0 1.414 l -4 4 a 1 1 -90 0 1 -1.414 -0 z"
                    clipRule="evenodd"
                />
                </svg>
            </a>
            
            </div>
        </div>
    )
}



const Hero = () => {
    return (
        
            <section
              className="flex min-h-[calc(100vh-4rem)] text-center items-center justify-center xl:justify-start xl:pe-0 xl:ps-10 xl:text-start"
            >
              <div>
                <h1
                  className="font-title text-white text-center text-[clamp(2rem,6vw,4rem)] font-black leading-[1.1]  xl:text-start "
                >
                  <span
                    className=" brightness-150 contrast-150 "
                    >Digital needs?</span>
                  <br />
                  <span
                    className="brightness-150 contrast-150"
                    >Here, <span className="text-[#bdd059]">Digital-in</span> just
                    4u.</span>
                </h1>
                <div className="h-4"></div>
                <p
                  className="text-[#acacac] font-title py-4 font-light md:text-lg xl:text-2xl"
                >
                  #1 E-Wallet & PPOB top up platform <br />
                  Cheapest, Secure, Easy, and Fast!
                </p>
                <div className="h-10"></div>
                {isAuthenticated() ? <HeroLogged /> : <HeroNotLogged />}
              </div>
            </section>
        
    )
}

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProductLists = async () => {
            try {
                const response = await productService.getAvailableProduct();
                setProducts(response.data.data);
            } catch (err) {
                setError(true);
            }
        }
        fetchProductLists();
        
    }, [])
    if (!products?.length || error) {
        return <div className="text-gray-400">No products available</div>;
    }

    return (
        <>
          {products.map(product => (
            <Link to={`/product/${encodeURIComponent(product.title)}`} key={product.title} className='h-full'>
            <div
            className="cursor-pointer rounded-xl shadow h-full p-3 p-sm-3 p-md-3 p-xl-3 flex-column justify-self-between bg-[#181718]"
          >
            <div>
              <img
                className="rounded-lg w-full mx-auto"
                src={product.image}
                loader="Load.jpg"
                alt={product.title}
              />
            </div>
            <div
              className="mt-2 h-1/4 md:flex xl:block items-center justify-center"
            >
              <h1 className="text-center w-full text-sm font-bold text-white">
                {product.title}
              </h1>
            </div>
          </div>
          </Link>
          ))}
        </>
      );
}

const Product = () => {
    return (
        <section id="products" className="py-24">
            <div className="flex items-center justify-center xl:justify-start">
                <div>
                  <h2
                    className="font-title text-center text-[clamp(2rem,8vw,2rem)] font-black leading-none xl:text-start"
                  >
                    <span>Check it out!</span>
                  </h2>
                  <div className="h-2"></div>
                  <p
                    className="text-[#acacac] font-title text-center font-light md:text-xl xl:text-start"
                  >
                    Let's find something that suits your needs!
                  </p>
                  <div className="h-10"></div>
                </div>
              </div>

              {/* <h3 className="mb-3 text-lg font-semibold text-white">
                🔥 Most Popular
              </h3>
              <div id="popular-cards-container" className="cards-games">
                <div
                  className="cursor-pointer rounded-xl shadow p-3 p-sm-3 p-md-3 p-xl-3 flex-column justify-self-between bg-[#181718]"
                >
                  <div>
                    <img
                      className="rounded-lg w-full mx-auto"
                      src="image.png"
                    />
                  </div>
                  <div
                    className="mt-2 h-1/4 md:flex xl:block items-center justify-center"
                  >
                    <h1 className="text-center w-full text-sm font-bold text-white">
                      Honkai Star Rail
                    </h1>
                  </div>
                </div>
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
              </div> */}

              <div className="flex flex-col gap-3 mt-9">
                <h3 className="mb-3 text-lg font-semibold text-white">
                  💡 Digital Goods
                </h3>

                <div id="cards-container" className="cards-games cards-incategory">
                  <ProductList />
                </div>
            </div>
        </section>
    )
}

export default function Home() {
    
      return (
            <>
                <HeaderDrawer>
                    <div className="w-full xl:px-32 md:px-20 px-5 mt-0">
                        <Hero />
                        <Product />
                    </div>
                </HeaderDrawer>
                <Footer />
            </>
      )
}