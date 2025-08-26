import axios, { AxiosResponse } from "axios"
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = "http://localhost:5037/api/";

// Enable sending cookies with requests
axios.defaults.withCredentials = true;

//axios interceptor
axios.interceptors.response.use(response =>{
    return response;
}, error => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if(data.errors) {
                const modelStateErrors : string[] = [];

                for (const key in data.errors) {
                    modelStateErrors.push(data.errors[key]);
                }
                throw modelStateErrors;
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 404:
            router.navigate("/not-found", {state: {error: data, status: status}});
            break;
        case 500:
            router.navigate("/server-error", {state: {error: data, status: status}});
            break;
        default:
            break;
    }
    return Promise.reject(data); // Log the error and reject the promise
});


const queries = {
    get: (url: string) => axios.get(url).then((response: AxiosResponse) => response.data), 
    post: (url: string, body: object) => axios.post(url, body).then((response: AxiosResponse) => response.data), 
    put: (url: string, body: object) => axios.put(url, body).then((response: AxiosResponse) => response.data),
    delete: (url: string) => axios.delete(url).then((response: AxiosResponse) => response.data),
}

const Errors = {
    get400Error: () => queries.get("error/bad-request"),
    get401Error: () => queries.get("error/unauthorized"),
    get404Error: () => queries.get("error/not-found"),
    get500Error: () => queries.get("error/server-error"),
    getValidationError: () => queries.get("error/validation-error"),
}

const Catalog = {
    list: () => queries.get("products"),
    details: (id: string) => queries.get(`products/${id}`),
}

const Cart = {
    get: () => queries.get("cart"),
    addItem: (productId: number, quantity: number) => queries.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
    deleteItem: (productId: number, quantity: number) => queries.delete(`cart?productId=${productId}&quantity=${quantity}`),
}

const request = {
    Catalog,
    Errors,
    Cart
}

export default request;