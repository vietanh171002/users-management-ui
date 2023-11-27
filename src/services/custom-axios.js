import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reqres.in',
});

instance.interceptors.response.use(
    function (response) {
        return response.data ? response.data : { statusCode: response.status };
    },
    function (error) {
        // console.log('check error: ', error);
        // return Promise.reject(error);
        return error;
    },
);

export default instance;
