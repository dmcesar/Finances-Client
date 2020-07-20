import APIService from '../api-service'
import validationError from '../exception/validation-error'

class UserService extends APIService {

    constructor() {

        super('/api/users')
    }

    authenticate(credentials) {

        return this.post('/authenticate', credentials)
    }

    getBalanceByUser(id) {

        return this.get(`/${id}/balance`)
    }

    register(user) {

        return this.post('/register', user)
    }

    validate(user) {

        const errors = []

        if(!user.name || user.email || user.password || user.passwordConfirmation) {

            errors.push('Please fill all mandatory fields.')
        }

        if(!user.email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]/)) {

            errors.push('Invalid email format.')
        }

        if(user.password !== user.passwordConfirmation) {

            errors.push('Passwords do not match.')
        }

        if(errors && errors.length > 0) {

            throw new validationError(errors);
        }
    }
}

export default UserService