 import axios from "axios";

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }j
    async request({ endpoint, method = "GET", data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`;

        const headers = {
            "Content-Type": "application/json",
        };

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        try {
            const res = await axios({ url, method, data, headers });
            return { data: res.data, error: null };
        } catch (error) {
            console.error({ errorResponse: error.response });
            const message = error?.response?.data?.error?.message;
            return { data: null, error: message || String(error) };
        }
    }
    async login(credentials) {
        //send an http request to the auth/login endpoint
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials });
    }

    async signup(credentials) {
        //send an http request to the auth/register endpoint
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials });
    }

    // async fetchUserFromToken() {
    //     //use request method to send http request from auth/me endpoint
    //     console.log("api Client fetching token");
    //     return await this.request({ endpoint: `auth/me`, method: `GET` });
    // }

    async addSession(sessionInfo) {
        return await this.request({endpoint:`session/add`, method:`POST`, data:credentials})
    }

    async getSessions() {
        return await this.request({endpoint:`session/history`, method:`GET`})
    }
}

export default new ApiClient( "http://localhost:3001");