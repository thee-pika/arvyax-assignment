
import Api from "./api";

const UserService = {
    login: (formdata: {
        email: string;
        password: string;
    }) => {
        return Api.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/login`, formdata);
    },
    register: (formdata: {
        name: string
        email: string;
        password: string;
    }) => {
        return Api.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/register`, formdata);
    }
}

export default UserService;
