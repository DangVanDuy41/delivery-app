

import axios, { AxiosInstance } from "axios"
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export const uri = `http://${Constants.manifest2?.extra?.expoGo?.debuggerHost.split(':').shift()}:8080`;
class Http {

    private http: AxiosInstance
    private token: string | null = null;

    constructor() {
        this.http = axios.create({
            baseURL: uri + "/",
            headers: {
                'Content-Type': 'application/json',
            },

        })
        this.http.interceptors.request.use(
            async (config) => {
                
                if (!this.token) {
                    this.token = await this.getToken();
                }
                if (this.token) {
                    config.headers['Authorization'] = `Bearer ${this.token}`;
                }
                return config;
            },
            (error) => {
                console.log(error)
                return
            }
        );
    }
    private async getToken(): Promise<string | null> {
        return await SecureStore.getItemAsync("accessToken");
    }
    
    getInstance(): AxiosInstance {
        return this.http;
    }
}
export default new Http().getInstance();