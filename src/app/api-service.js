import axios from 'axios'

const httpClient = axios.create({

    baseURL: 'http://localhost:8080'
})

class APIService {

    constructor(apiURL) {

        this.apiURL = apiURL
    }

    post(url, object) {

        const requestURL = `${this.apiURL}${url}`

        return httpClient.post(requestURL, object)
    }

    put(url, object) {

        const requestURL = `${this.apiURL}${url}`

        return httpClient.put(requestURL, object)
    }

    delete(url) {

        const requestURL = `${this.apiURL}${url}`

        return httpClient.delete(requestURL)
    }

    get(url) {

        const requestURL = `${this.apiURL}${url}`

        return httpClient.get(requestURL)
    }
}

export default APIService