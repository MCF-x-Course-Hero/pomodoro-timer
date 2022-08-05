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

// USER ENDPOINTS
    async login(credentials) {
        //send an http request to the auth/login endpoint
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials });
    }

    async signup(credentials) {
        //send an http request to the auth/register endpoint
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials });
    }
    
    async deleteUser(credentials) {
        //deletes user from sql database
        return await this.request({ endpoint: `auth/::${credentials}`, method: `DELETE` })
    }

    async fetchUserFromToken() {
        //use request method to send http request from auth/me endpoint
        return await this.request({ endpoint: `auth/me`, method: `GET` });
    }

// SESSION ENDPOINTS
    async addSession(sessionInfo) {
        return await this.request({ endpoint:`session/`, method:`POST`, data: sessionInfo })
    }

    async getSessions(credentials) {
        return await this.request({ endpoint:`session/::${credentials}`, method:`GET` })
    }
    
    async getTotalTime() {
        return await this.request({ endpoint:  `session/sum`, method: `GET` })
    }

// TASKS ENDPOINTS
    async getCompletedTasks() {
        // http request to get completed tasks from task/complete endpoint
        return await this.request({endpoint:'task/complete', method: 'GET'})
    }
    async getPendingTasks() {
        // http request to get completed tasks from task/complete endpoint
        return await this.request({endpoint:'task/pending', method: 'GET'})
    }
    async addTask(todo){
        // http request to add a task to the database.
        return await this.request({endpoint:"task/", method:"POST", data: todo})
    }

    async removeTask(taskId){
        // deletes a task from the database by providing its id
        return await this.request({endpoint:`task/${taskId}`, method:"DELETE"})
    }

    async updateTask(task){
        return await this.request({endpoint:"task/update", method:"POST", data:task})
    }
}

export default new ApiClient("http://localhost:3001");