'use client';
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";


export const requireAuth = () => {
    const token = useSelector(selectCurrentToken);
    if(!token){
        throw new Error('Unauthorized');
    }
}



