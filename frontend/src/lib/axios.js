import axios from 'axios'

// const BASE_URL = "http://localhost:5001/api"

// const api = axios.create({
//     baseURL: BASE_URL, 
// })

// export default api

const BASE_URL = "https://chat-app-backend-itee.onrender.com/api";

const api = axios.create({
    baseURL: BASE_URL,
})

export default api;
