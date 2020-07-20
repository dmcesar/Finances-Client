import LocalStorageService from './local-storage-service'

export const KEY = '_signed_user';

export default class AuthService {

    static isUserAuthenticated() {

        const user = LocalStorageService.getItem(KEY);

        return user && user.id;
    }

    static signUserOut() {

        LocalStorageService.removeItem(KEY);
    }

    static signUser(user) {

        LocalStorageService.addItem(KEY, user);
    }

    static getAuthenticatedUser() {

        return LocalStorageService.getItem(KEY);
    }
}