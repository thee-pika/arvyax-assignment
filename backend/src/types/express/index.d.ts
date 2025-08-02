

import { Request } from "express"
import { User } from "../interfaces/User"

declare module "express" {
    export interface Request {
        user ?: User
    }
}

