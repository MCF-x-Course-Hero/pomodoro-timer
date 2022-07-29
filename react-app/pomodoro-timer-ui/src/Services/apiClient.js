import axios from "axios";

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = "null";
        this.tokenName = "pomozone_token";
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem(this.tokenName, token);
    }

    async request({ endpoint, method = "GET", data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`;

        const headers = {
            "Content-Type": "application/json",
        };

        if (this.token !== "null") {
            headers[`Authorization`] = `Bearer ${this.token}`;
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

    async addSession(sessionInfo) {
        return await this.request({ endpoint:`session/`, method:`POST`, data: sessionInfo })
    }

    async getSessions(credentials) {
        return await this.request({ endpoint:`session/::${credentials}`, method:`GET` })
    }

    async getTotalTime(credentials) {
        return await this.request({ endpoint:  `session/sum`, method: `GET`, data: credentials })
    }

    async deleteUser(credentials) {
        //deletes user from sql database
        return await this.request({ endpoint: `auth/::${credentials}`, method: `DELETE` })
    }

    async fetchUserFromToken() {
        //use request method to send http request from auth/me endpoint
        return await this.request({ endpoint: `auth/me`, method: `GET` });
    }

    async getCompletedTasks() {
        // http request to get completed tasks from task/complete endpoint
        return await this.request({endpoint:'task/me', method: 'GET'})
    }
}

export default new ApiClient( "http://localhost:3001");