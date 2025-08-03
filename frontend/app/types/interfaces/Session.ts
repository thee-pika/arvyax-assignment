import { UserT } from "./User";

export interface SessionT {
    id: string;
    title: string;
    tags: string[];
    json_file_url: string;
    status: string;
    userId: string;
    user: UserT;
    createdAt: string;
    updatedAt: string;
}

