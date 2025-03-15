import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";



const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

export default function Signout(){
    const navigate = useNavigate();
    

    useEffect(() => {
        if (!isAuthenticated()){
            navigate("/");
        }
        const logout = async () => {
            try {
                const response = await authService.signOut();
                localStorage.removeItem('token');
                navigate("/");
            } catch (error) {
                navigate("/");
                // console.log(error);
            }
        }
        logout();
    }, [])
}