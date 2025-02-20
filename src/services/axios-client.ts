import axios from 'axios';
import Cookie from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:12345/api/v1';

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use((config) => {
    const user = Cookie.get('links_user');
    const userId = user ? JSON.parse(user).id : null;
    if (userId) {
        config.headers['X-User-Id'] = userId;
    }
    return config;
});

export default axiosClient;
