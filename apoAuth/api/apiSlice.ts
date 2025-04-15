'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCardentials, logout } from '@/features/auth/authSlice';

interface AuthState {
    auth: {
        accessToken: string;
        name: string;
    };
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as AuthState).auth.accessToken; // Custom type assertion
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});



const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) =>{

    let result = await baseQuery(args, api, extraOptions);
    if(result?.error?.status === 403){
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        // const refreshResult = await baseQuery('/refresh', api, {
        //     method: 'POST',
        //     credentials: 'include'
        // });
        if(refreshResult?.data){
            const user = api.getState().auth.name as { name: string; accessToken: string };
            // store the new token 
            api.dispatch(setCardentials({ ...(refreshResult.data as object), user }));
            // retry the original request with the new access token
            return baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout({}));
        }
    }
    return result;
}



export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),

});