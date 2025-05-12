import axios from 'axios'
export const axiosClient = axios.create({
    baseURL:"https://nest-blog-app.onrender.com/api/v1"
})
