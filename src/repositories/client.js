import axios from 'axios'

export default new class {

    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:8080',
            headers: {
                'Content-type': 'application/json',
            }
        })
    }

    async get(url) {
        const { data } = await this.client.get(url);
        return data;
    }

    async post(url, requestBody) {
        const { data } = await this.client.post(url, requestBody);
        return data;
    }

}