import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import Signin from "./components/Signin"
import Signout from "./components/Signout";
import Signup from "./components/Signup";
import Product from "./components/ProductDetail";
import Transactions from "./components/transaction/Transactions";
import TransactionDetail from "./components/transaction/TransactionDetail";
import Balance from "./components/balance/Balance";
import Deposit from "./components/balance/Deposit";
import DepositDetail from "./components/balance/DepositDetail";
import Dashboard from "./components/admin/Dashboard";
import Deposits from "./components/deposit/Deposits";
import Users from "./components/user/Users";
import Products from "./components/product/Products";
import NotFound from "./components/public/NotFound";
import Forbidden from "./components/public/Forbidden";
import Categories from "./components/product/Categories";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyAccount from "./components/VerifyAccount";



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signout" element={<Signout />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:enc" element={<ResetPassword />} />
                <Route path="/verify-email/:enc" element={<VerifyAccount />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/403" element={<Forbidden />} />


                <Route path="/transaction" element={<Transactions />} />
                <Route path="/transaction/:id" element={<TransactionDetail />} />
                
                <Route path="/balance" element={<Balance />} />
                <Route path="/balance/transaction" element={<Deposit />} />
                <Route path="/balance/transaction/:id" element={<DepositDetail />} />


                <Route path="product/:product" element={<Product />} />

                {/* admin */}
                <Route path="/admin" element={<Dashboard authority={"admin"}/>} />
                
                <Route path="/admin/transaction" element={<Transactions authority={"admin"}/>} />
                <Route path="/admin/transaction/:id" element={<TransactionDetail authority={"admin"}/>} />
                
                <Route path="/admin/deposit" element={<Deposits authority={"admin"}/>} />
                <Route path="/admin/deposit/:id" element={<DepositDetail authority={"admin"}/>} />

                <Route path="/admin/user" element={<Users authority={"admin"}/>} />

                <Route path="/admin/product" element={<Products authority={"admin"}/>} />

                <Route path="/admin/category" element={<Categories authority={"admin"}/>} />
            </Routes>
        </Router>
    );
};

export default App;
