import axios from "axios";
import Api from "./api";

const sessionService = {
    create: async (
        token: string,
        payload: {
            title: string;
            tags: string[];
            json_file_url: string;
            status: string;
        }
    ) => {
        return Api.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/session/create`, payload, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },

    getMySessions: (token: string) => {
        return Api.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/session/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },

    getAllSessions: () => {
        return Api.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/session/all`);
    },

    updateSession: (token: string, id: string, payload: any) => {
        return Api.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/session/${id}`, payload, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },

    delete: (token: string, id: string) => {
        return Api.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/session/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
    ,
    getSession: (token: string, id: string) => {
        return Api.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/session/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
}

export default sessionService;
