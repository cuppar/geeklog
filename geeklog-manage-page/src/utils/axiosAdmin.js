import axios from 'axios'
axiosAdmin = axios.create();
axiosAdmin.defaults.headers.post['Content-Type'] = 'application/json';
axiaxiosAdminos.defaults.timeout = 3000;
axiosAdmin.defaults.baseURL = 'http://47.106.158.254/';

export default axiosAdmin;