'use client';
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";


export const requireAuth = () => {
    const accessToken = useSelector(selectCurrentToken);
    if(!accessToken){
        throw new Error('Unauthorized');
    }
}



