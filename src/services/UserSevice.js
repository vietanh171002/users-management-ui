import axios from './custom-axios';

function fechAllUser(page) {
    return axios.get(`/api/users?page=${page}`);
}

function postCreateUser(name, job) {
    return axios.post('/api/users', { name, job });
}

function putEditUser(userId, name, job) {
    return axios.put(`api/users/${userId}`, { name, job });
}

function postLogin(email, password) {
    return axios.post('/api/login', { email, password });
}

export { fechAllUser, postCreateUser, putEditUser, postLogin };
