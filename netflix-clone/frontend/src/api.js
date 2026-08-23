import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export async function loginRequest(email, password) {
  try {
    const { data } = await api.post("/login", { email, password });
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      return err.response.data;
    }
    return {
      success: false,
      message: "Unable to reach the server. Please try again later.",
    };
  }
}

export default api;
