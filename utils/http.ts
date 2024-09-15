
import axios, { AxiosInstance } from "axios"
import Constants from 'expo-constants';

export const uri = `http://${Constants.manifest2?.extra?.expoGo?.debuggerHost.split(':').shift()}:8088`;
class Http {

    private http: AxiosInstance
    
    constructor() {
        this.http = axios.create({
            baseURL: uri +"/",
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    getInstance(): AxiosInstance {
        return this.http;
    }
}
export default new Http().getInstance();