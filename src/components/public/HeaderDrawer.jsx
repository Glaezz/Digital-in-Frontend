import { useState, useEffect } from 'react';
import {adminService, authService} from '../../services/api'
import { Link, resolvePath, useNavigate } from 'react-router-dom';


const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

const UserNotLogged = () => {
    return (
        <div className="flex w-full items-stretch justify-center gap-2 px-4 pt-4 md:flex-row">
            <Link to="/signin" className="border-[#075400] px-4 text-white hover:text-white border-2 py-2 grow rounded-lg text-sm text-center font-medium">Sign In</Link>
            <Link to='/signup' className="bg-[#6b0099] px-4 text-white hover:text-white border-0 py-2 grow rounded-lg text-sm text-center font-medium">Sign Up</Link>
        </div>
    )
}

const useUserData = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated()) return;
        const fetchUserProfile = async () => {
            try {
                const response = await authService.userProfile();
                setUser(response.data.data);
                console.log(response);
            } catch (error) {
                // setError(err.message);
                if(error.response.status == 401){
                  localStorage.removeItem('token');
                  navigate("/")
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
        
    }, []);
    
    return { user, loading, error };
}

const UserLogged = ({user}) => {

    return (
        <>
        <li>
        <div href="#" className="flex items-center justify-between gap-2 p-2">
          <div className="flex items-center gap-2">
            <div className="avatar placeholder">
              <div className="bg-[#2a323c] text-neutral-content w-12 rounded-full">
                <span className="text-3xl text-gray-100">
                {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs">
                <strong className="block font-medium text-gray-100">
                  {user.username}
                </strong>
                <span className="text-gray-100"> {user.email} </span>
              </p>
            </div>
          </div>
          <div >
            <button
            className="btn bg-[#070707] border-0" 
              onClick={() => {
                document.getElementById('editProfile').showModal()
            }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fillRule="none"
                viewBox="0 0 24 24"
                stroke="#9da4b2"
                strokeWidth="{2}"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </li>
      <div>
        <Link
          className="btn bg-[#181718] border-0 w-full gap-2 lg:gap-3 flex items-center justify-between"
          to="/balance"
        >
          <div className="flex flex-col items-start pb-1">
            <span className="text-xs text-gray-300 font-normal">Balance</span>
            <span className="text-gray-100">Rp{user.balance.toLocaleString('id-ID')}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill="#9da4b2"
          >
            <path
              fillRule="evenodd"
              d="M 6.707 15.293 a 1 1 -90 0 1 0 -1.414 L 10 10.586 l -3.293 -3.293 a 1 1 -90 1 1 1.414 -1.414 l 4 4 a 1 1 -90 0 1 -0 1.414 l -4 4 a 1 1 -90 0 1 -1.414 -0 z"
              clipule="evenodd"
            />
          </svg>
        </Link>
      </div>
      </>
    )
}

const Navbar =  () => {
    return (
    <div className="navbar sticky rounded-md top-0 z-10 bg-[#070707] w-full">
      <Link to="/" className="mx-2 flex-1 px-2 text-lg font-bold font-title font-title">
        Digital-in
      </Link>
      <div className="flex-none">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>
    </div>
    );
}

const EditProfile = ({user}) => {
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [invalidMessage, setInvalidMessage] = useState({
      username: "",
      email: "",
      password: "",
  });
  const userData = {
      username: username,
      email: email,
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
      
      
      if(countNot != 2){
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
      })
      setInfoMessage("");
      let validate = validation();
      if (validate == true){
          setIsLoading(false);
          return;
      }

      const pushUpdate = async () => {
          try {
              const response = await authService.editProfile({
                  username: username,
                  email: email,
                  password: password,
              });
              if(response.status == 200){
                  setInfoMessage(response.data.message);
              }
              console.log(response);
              
          } catch (error) {
            console.log(error.response.data.message.username[0]);
              if(error.response?.status == 422){
                  setInvalidMessage({
                      username: error?.response?.data?.message?.username?.[0],
                      email: error?.response?.data?.message?.email?.[0],
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
    setUsername(user?.username);
    setEmail(user?.email);
  },[user]);
  
  return (
      <dialog id="editProfile" className="modal">
      <div className="modal-box bg-[#181718] rounded-lg">
          <h3 className="font-bold text-lg">Edit Profile</h3>
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

const Drawer = ({authority}) => {
    
    const { user, loading, error } = useUserData();

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    return (
      
<div className="drawer-side z-10">
  <EditProfile user={user}/>
  <label
    htmlFor="my-drawer-3"
    aria-label="close sidebar"
    className="drawer-overlay"
  ></label>

    
        

      <div className="divider"></div>
      {authority != "admin" ? (
        <ul className="space-y-1 bg-[#070707] text-base-content min-h-full w-80 p-2">
        
        
        {isAuthenticated() ? (
          user ? <UserLogged user={user}/> : <div>Loading...</div>
        ) : <UserNotLogged/>}

<li>
          <Link
            to="/transaction"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-5 opacity-75">
              <g
                id="SVGRepo_iconCarrier"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="M6.728 19.7c.82-.88 2.07-.81 2.79.15l1.01 1.35c.81 1.07 2.12 1.07 2.93 0l1.01-1.35c.72-.96 1.97-1.03 2.79-.15 1.78 1.9 3.23 1.27 3.23-1.39V7.04c0-4.03-.94-5.04-4.72-5.04h-7.56c-3.78 0-4.72 1.01-4.72 5.04V18.3c.01 2.67 1.47 3.29 3.24 1.4M9.25 10h5.5"></path>
              </g>
            </svg>
            <span className="text-sm font-medium"> Transactions </span>
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 opacity-75"
              fillRule="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="{2}"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-sm font-medium"> Contact </span>
          </a>
        </li>
         
        {user?.authority === 'admin' && (
            <li>
                <Link to="/admin" className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5 opacity-75" fillRule="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm font-medium">Admin Panel</span>
                </Link>
            </li>
        )}

        <div className="divider"></div>
        {isAuthenticated() && (<li>
            <Link
              to="/signout"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fillRule="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="{2}"
                className="size-5 opacity-75 rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <span className="text-sm font-medium"> Sign Out </span>
            </Link>
          </li>)}
    </ul>
      ) : (
        <ul className="space-y-1 bg-[#070707] text-base-content min-h-full w-80 p-2">
        
        
    {isAuthenticated() ? (
      user ? <UserLogged user={user}/> : <div>Loading...</div>
    ) : <UserNotLogged/>}
        

      <div className="divider"></div>
        <li>
          <Link
            to="/admin/transaction"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-5 opacity-75">
              <g
                id="SVGRepo_iconCarrier"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="M6.728 19.7c.82-.88 2.07-.81 2.79.15l1.01 1.35c.81 1.07 2.12 1.07 2.93 0l1.01-1.35c.72-.96 1.97-1.03 2.79-.15 1.78 1.9 3.23 1.27 3.23-1.39V7.04c0-4.03-.94-5.04-4.72-5.04h-7.56c-3.78 0-4.72 1.01-4.72 5.04V18.3c.01 2.67 1.47 3.29 3.24 1.4M9.25 10h5.5"></path>
              </g>
            </svg>
            <span className="text-sm font-medium"> Transactions </span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/deposit"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 opacity-75"
              fillRule="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="{2}"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <span className="text-sm font-medium"> Deposits </span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/product"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-5 opacity-75">
              <g id="SVGRepo_iconCarrier">
                <g
                  id="页面-1"
                  fill="none"
                  fillRule="evenodd"
                  stroke="none"
                  strokeWidth="1"
                >
                  <g id="导航图标" transform="translate(-325 -80)">
                    <g id="编组" transform="translate(325 80)">
                      <path
                        id="路径"
                        fill=""
                        fillOpacity="0.01"
                        fillRule="nonzero"
                        d="M24 0H0v24h24z"
                      ></path>
                      <path
                        id="路径"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M22 7 12 2 2 7v10l10 5 10-5z"
                      ></path>
                      <path
                        id="路径"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="m2 7 10 5M12 22V12M22 7l-10 5M17 4.5l-10 5"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <span className="text-sm font-medium"> Products </span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/user"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-5 opacity-75">
                <path
                  id="SVGRepo_iconCarrier"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 21a7 7 0 1 1 14 0M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0"
                ></path>
              </svg>
            <span className="text-sm font-medium"> Users </span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/category"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-5 opacity-75">
              <g
                id="SVGRepo_iconCarrier"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M6.5 3.571c-.717 0-1.724.172-2.41.31a.2.2 0 0 0-.16.17c-.137.879-.342 2.381-.342 3.449s.205 2.57.343 3.449c.014.09.079.154.16.17.685.138 1.692.31 2.409.31s1.724-.172 2.41-.31a.2.2 0 0 0 .16-.17c.137-.879.342-2.381.342-3.449s-.205-2.57-.343-3.449a.2.2 0 0 0-.16-.17c-.685-.138-1.692-.31-2.409-.31m-2.726-1.23C4.462 2.202 5.607 2 6.5 2s2.038.202 2.726.34a1.78 1.78 0 0 1 1.413 1.471c.137.877.361 2.487.361 3.689s-.224 2.812-.361 3.689a1.78 1.78 0 0 1-1.413 1.47C8.538 12.798 7.393 13 6.5 13s-2.038-.202-2.726-.34a1.78 1.78 0 0 1-1.413-1.471C2.224 10.312 2 8.702 2 7.5s.224-2.812.361-3.689a1.78 1.78 0 0 1 1.413-1.47M17.5 20.429c-.717 0-1.724-.172-2.41-.31a.2.2 0 0 1-.16-.17c-.136-.879-.342-2.381-.342-3.449s.206-2.57.343-3.449a.2.2 0 0 1 .16-.17c.685-.138 1.692-.31 2.409-.31s1.724.172 2.41.31c.08.016.145.08.16.17.136.879.342 2.381.342 3.449s-.206 2.57-.343 3.449a.2.2 0 0 1-.16.17c-.685.138-1.692.31-2.409.31m-2.726 1.23c.688.139 1.833.341 2.726.341s2.038-.202 2.726-.34a1.78 1.78 0 0 0 1.413-1.471c.137-.877.361-2.487.361-3.689s-.224-2.812-.361-3.689a1.78 1.78 0 0 0-1.413-1.47C19.538 11.202 18.393 11 17.5 11s-2.038.202-2.726.34a1.78 1.78 0 0 0-1.413 1.471c-.137.877-.361 2.487-.361 3.689s.224 2.812.361 3.689c.114.73.67 1.32 1.413 1.47M6.5 16.615c-.761 0-1.838.182-2.517.314a.17.17 0 0 0-.135.118c-.13.469-.26 1.052-.26 1.453 0 .4.13.984.26 1.453.014.053.06.103.135.118.68.132 1.756.314 2.517.314s1.838-.182 2.517-.314a.17.17 0 0 0 .135-.118c.13-.469.26-1.052.26-1.453 0-.4-.13-.984-.26-1.453a.17.17 0 0 0-.135-.118c-.68-.132-1.756-.314-2.517-.314m-2.817-1.272C4.362 15.21 5.572 15 6.5 15s2.138.21 2.817.343c.643.126 1.18.602 1.364 1.265.132.478.319 1.249.319 1.892s-.187 1.414-.32 1.892a1.77 1.77 0 0 1-1.363 1.265C8.638 21.79 7.428 22 6.5 22s-2.138-.21-2.817-.343a1.77 1.77 0 0 1-1.364-1.265C2.187 19.914 2 19.143 2 18.5s.187-1.414.32-1.892a1.77 1.77 0 0 1 1.363-1.265M17.5 7.385c-.761 0-1.838-.181-2.517-.314a.17.17 0 0 1-.135-.118c-.13-.469-.26-1.052-.26-1.453 0-.4.13-.984.26-1.453a.17.17 0 0 1 .135-.118c.68-.133 1.756-.314 2.517-.314s1.838.181 2.517.314c.076.015.12.065.135.118.13.469.26 1.052.26 1.453 0 .4-.13.984-.26 1.453a.17.17 0 0 1-.135.118c-.68.133-1.756.314-2.517.314m-2.817 1.272C15.362 8.79 16.572 9 17.5 9s2.138-.21 2.817-.343a1.77 1.77 0 0 0 1.364-1.265C21.813 6.914 22 6.143 22 5.5s-.187-1.414-.32-1.892a1.77 1.77 0 0 0-1.363-1.265C19.638 2.21 18.428 2 17.5 2s-2.138.21-2.817.343a1.77 1.77 0 0 0-1.364 1.265C13.187 4.086 13 4.857 13 5.5s.187 1.414.32 1.892a1.77 1.77 0 0 0 1.363 1.265"></path>
              </g>
            </svg>
            <span className="text-sm font-medium"> Categories </span>
          </Link>
        </li>
        
        <div className="divider"></div>
        {isAuthenticated() && (<li>
            <Link
              to="/signout"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fillRule="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="{2}"
                className="size-5 opacity-75 rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <span className="text-sm font-medium"> Sign Out </span>
            </Link>
          </li>)}
    </ul>
      )}
        
  
</div>

    )
}

export default function HeaderDrawer({children, authority}){
    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-[#070707] flex flex-col">
                <Navbar/>
                <main className="content">
                    {children}
                </main>
                </div>
            <Drawer authority={authority}/>
        </div>
    )
}