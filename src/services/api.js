import axios from "axios";
import { data } from "react-router-dom";

const api_url = "https://light-easily-rat.ngrok-free.app/api/v1/";

const privateApi = axios.create({
    baseURL: api_url,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
    }
})

const publicApi = axios.create({
    baseURL: api_url,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
    }
})

privateApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    }
);


export const adminService = {
    statistic: (data) => privateApi.get("/admin/statistic", {
        params: {
            type: data.type,
            date: data.date
        }
    }),
    transaction: {
        allTransaction: (data) => privateApi.get("/admin/transaction", {
            params: {
                page: data.page,
                search: data.search
            }
        }),
        showTransaction: (id) => privateApi.get("/admin/transaction/"+id),
    },
    deposit: {
        allDeposit: (data) => privateApi.get("/admin/balance/transaction", {
            params: {
                page: data.page,
                search: data.search
            }
        }),
        showDeposit: (id) => privateApi.get("/admin/balance/transaction/"+id),
    },
    user:{
        allUser: (data) => privateApi.get("/admin/user", {
            params: {
                page: data.page,
                search: data.search
            }
        }),
        showUser: (id) => privateApi.get("/admin/user/"+id),
        editUser: (id, data) => privateApi.put("/admin/user/"+id, {
            username: data.username,
            email: data.email,
            password: data.password,
            authority: data.authority,
            balance: data.balance
        }),
        deleteUser: (id) => privateApi.delete("/admin/user/"+id),
    },
    product:{
        allProduct: (data) => privateApi.get("/admin/product", {
            params: {
                page: data.page,
                search: data.search
            }
        }),
        showProduct: (id) => privateApi.get("/admin/product/"+id),
        editProduct: (id, data) => privateApi.put("/admin/product/"+id, {
            username: data.username,
            email: data.email,
            password: data.password,
            authority: data.authority,
            balance: data.balance
        }),
        deleteProduct: (id) => privateApi.delete("/admin/product/"+id),
        fetchProduct: (data) => privateApi.patch("/admin/product/fetch", {
            url: data.url
        })
    },
    category:{
        allCategory: (data) => privateApi.get("/admin/category", {
            params: {
                page: data.page,
                search: data.search
            }
        }),
        showCategory: (id) => privateApi.get("/admin/category/"+id),
        editCategory: (id, data) => privateApi.put("/admin/category/"+id, {
            profit_type: data.profit_type,
            profit_value: data.profit_value,
        }),
    }
}


export const authService = {
    signIn: (credential) => publicApi.post("auth/signin", {
        email: credential.email,
        password: credential.password,
    })
,
    signUp: (data) => publicApi.post("auth/signup", {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
    }),
    signOut: () => privateApi.post("auth/signout"),

    forgotPassword: (data) => publicApi.post("auth/forgot", {
        email: data.email
    }),
    verifyAccount: (data) => publicApi.get("auth/verify/"+data.enc),
    verifyForgotPassword: (data) => publicApi.get("auth/forgot/"+data.enc),
    resetPassword: (data) => publicApi.put("auth/forgot/"+data.enc, {
        password: data.password,
        confirmPassword: data.confirmPassword
    }),

    userProfile: () => privateApi.get("/user"),
    editProfile: (data) => privateApi.put("/user", {
        username: data.username,
        email: data.email,
        password: data.password,
    })
}



export const productService = {
    getAvailableProduct: () => publicApi.get("/product", {
        params: {
            key: "product"
        }
    }),
    getItemProduct: (product) => publicApi.get("/product", {
        params: {
            key: "product",
            value: product
        }
    }),

}

export const balanceService = {
    getPayment: () => privateApi.get("/balance/transaction/payment"),
    // getBalance: () => privateApi.get("/balance"),
    // userDeposit: () => privateApi.get("/balance/transaction/"),
    userBalanceHistory: () => privateApi.get("/balance"),
    showDeposit: (id) => privateApi.get("/balance/transaction/"+id),
    chargeDeposit: (data) => privateApi.post("/balance/transaction", {
        amount: data.amount,
        payment_method: data.payment_method,
    }),
    
}

export const transactionService = {
    getUserTransaction: (data) => privateApi.get("/transaction", {
        params: {
            page: data.page,
            search: data.search
        }
    }),
    showUserTransaction: (id) => privateApi.get("/transaction/"+id),
    createTransaction: (data) => privateApi.post("/transaction", {
        product_code : data.product_code,
        destination : data.destination
        
    })

}