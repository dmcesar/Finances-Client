export default class LocalStorageService {

    static addItem(key, value) {

        localStorage.setItem(key, value)
    } 

    static getItem(key) {

        return localStorage.getItem(key)
    }
}