import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";   

export const refreshAuthToken = async (): Promise<boolean> => {
  const token = Cookies.get("accessToken");
  
  try {
    const refreshToken = Cookies.get("refreshToken")
    if (!refreshToken) {
      return false
    }

  const response = await axios.post(
    `${BASE_URL}/api/Authentication/RefreshAccessToken`,
    {
      refreshToken: refreshToken
    },
    {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }
  )

  console.log("Response from refreshAuthToken:", response.data);
  console.log("response.data.accessToken:", response.data.data);


    if (response.data ) {
      Cookies.set("accessToken", response.data.data)
      console.log("refresh token success")
      // if (response.data.refreshToken) {
      //   Cookies.set("refreshToken", response.data.refreshToken)
      //   console.log("refresh token success again")
      // }
      return true
    }
    return false
  } catch (error) {
    console.error("Failed to refresh token:", error)
    return false
  }
}