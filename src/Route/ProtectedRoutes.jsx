import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoutes = ({ children, roles }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(" ");
    const [role, setRole] = useState("");

    useEffect(() => {
        const tokenLogin = sessionStorage.getItem("token");
        const roleLogin = sessionStorage.getItem("role");
        setToken(tokenLogin);
        setRole(roleLogin);

        if (!tokenLogin || roleLogin !== roles) {
            navigate("/");
        }

    }, [navigate]);

    return token && (children ? children : <Outlet />)
};

export default ProtectedRoutes;