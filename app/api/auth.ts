import axios from 'axios';
import Cookies from 'js-cookie';

// const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';   
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";   
// process.env.NEXT_PUBLIC_API_URL


// --------------- log out -----------------

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/api/auth/logout`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.status === 200;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};

// ---------------- log in ---------------------------

export const loginUser = async (email: string, password: string): Promise<any> => {
        const token = Cookies.get("accessToken") || ""

    // const values = {
    //   email,
    //   password
    // };
  try {
    // console.log("login started ===================== ", { email, password });
    const response = await axios.post(
      `${API_URL}/api/Authentication/StudentSignIn`,
    {
      email,
      password,
    },
      {
        headers: {
            Authorization: `Bearer ${token}`,
           "Content-Type": "application/json" 
          },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return { succeeded: false, error: "An error occurred during login" };
  }
};

// -------------- regester ---------------------------

// interface UserData {
//   name: string;
//   email: string;
//   password: string;
//   code: string;
//   [key: string]: any; // Add additional fields as needed
// }

export const registerUser = async (firstName: string,lastName: string,email: string,password: string, code: string, whatsUpNumber: string | null) => {
          const token = Cookies.get("accessToken") || ""
    try { 
      // console.log("send confirm code started ===================== ", { name, password, email, code });
      const response = await axios.post(
        `${API_URL}/api/Authentication/StudentSignUp`,
        { firstName,lastName,email, password, code,whatsUpNumber },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" },
        }
      );
      // console.log("send confirm code response ===================== ", response.data);
      return response.data;
    } catch (error) {
      console.error("Look error:", error);
      const err = error as any;
      return { succeeded: false, error: err.response?.data?.message || "An error occurred during registration" };
    }
  };

// ---------------- Send Confirm Code ---------------------------

export const sendConfirmCode = async (email: string) => {
        const token = Cookies.get("accessToken") || ""

    try {
      console.log("send confirm code started ===================== ",  {email} );
      const response = await axios.post(
        `${API_URL}/api/ConfirmEmail/SendConfirmCode`,
        {email},
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" },
        }
      );
      console.log("send confirm code response ===================== ", response.data);
      return { succeeded: true, data: response.data };
    } catch (error) {
      console.error("Send confirm code error:", error);
      const err = error as any;
      return { succeeded: false, error: err.response?.data?.message || "An error occurred while sending the confirm code" };
    }
  }


// ---------------- Send Confairm Code ---------------------------

export const sendConfairmResetPassword = async (email: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/ConfirmEmail/SendConfairmResetPassword`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return { succeeded: true, data: response.data };
    } catch (error) {
      console.error("Send confirm code error:", error);
      const err = error as any;
      return { succeeded: false, error: err.response?.data?.message || "An error occurred while sending the confirm code" };
    }
  }

// ----------------- Reset Forgotten Password ---------------------------
export const resetForgottenPassword = async (email: string, newPassword: string, code: string) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/Authentication/ResetForgottenPassword`,
        { email, newPassword, code },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return { succeeded: true, data: response.data };
    } catch (error) {
      console.error("Reset password error:", error);
      const err = error as any;
      return { succeeded: false, error: err.response?.data?.message || "An error occurred while resetting the password" };
    }
  }

// -------------------- change Password -----------------------------
export const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/Authentication/ChangePassword`,
        { oldPassword, newPassword },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return { succeeded: true, data: response.data };
    } catch (error) {
      console.error("Change password error:", error);
      const err = error as any;
      return { succeeded: false, error: err.response?.data?.message || "An error occurred while changing the password" };
    }
  }
