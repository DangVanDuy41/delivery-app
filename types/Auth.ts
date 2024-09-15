import { ROLE } from "@/constants/constains";

export interface AuthState {
    isAuthenticated: boolean,
    role: string,
    accessToken: string,
}
export const initialAuthState = {
    isAuthenticated: false,
    role: ROLE.USER,
    accessToken: "",
}