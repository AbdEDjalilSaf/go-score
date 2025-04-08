import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';   
// process.env.NEXT_PUBLIC_API_URL


// --------------- log out -----------------

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/api/auth/logout`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.status === 200;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};

// ---------------- log in ---------------------------

export const loginUser = async (email,password,code) => {
  
    // const values = {
    //   email,
    //   password
    // };
  try {
    console.log("login started ===================== ", { email, password, code });
    const response = await axios.post(
      `${API_URL}/api/Authentication/SignIn`,
    {
      email,
      password
    },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "An error occurred during login" };
  }
};

// -------------- regester ---------------------------

export const registerUser = async (userData) => {
    try {
      console.log("send confirm code started ===================== ",  {userData} );
      const response = await axios.post(
        `${API_URL}/api/Authentication/StudentSignUp`,
        {userData},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("send confirm code response ===================== ", response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.response?.data?.message || "An error occurred during registration" };
    }
  };

// ---------------- Send Confirm Code ---------------------------

export const sendConfirmCode = async (email) => {
    try {
      console.log("send confirm code started ===================== ",  {email} );
      const response = await axios.post(
        `${API_URL}/api/ConfirmEmail/SendConfirmCode`,
        {email},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("send confirm code response ===================== ", response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Send confirm code error:", error);
      return { success: false, error: error.response?.data?.message || "An error occurred while sending the confirm code" };
    }
  }


// ---------------- Send Confirm Code ---------------------------

export const sendConfairmResetPassword = async (email) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/ConfirmEmail/SendConfairmResetPassword`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Send confirm code error:", error);
      return { success: false, error: error.response?.data?.message || "An error occurred while sending the confirm code" };
    }
  }