import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthProvider";

const ProtectedRouteForLogin = ({ children }) => {
    const { currentUser } = useAuth();

    // return userExists ? children : <Navigate to="/notfound" />;
    return currentUser ? <Navigate to="/" /> : children;
};

export default ProtectedRouteForLogin;
