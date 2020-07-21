import axios from 'axios'

const httpClient = axios.create({

    baseURL: 'https://my-personal-finances-api.herokuapp.com'
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