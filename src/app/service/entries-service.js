import ApiService from '../api-service'

import validationError from '../exception/validation-error'

export default class EntriesService extends ApiService {

    constructor() {
        super('/api/entries');
    }

    getMonthsList() {

        return [
            {label: 'Select a month', value: ''},
            {label: 'January', value: '1'},
            {label: 'February', value: '2'},
            {label: 'March', value: '3'},
            {label: 'April', value: '4'},
            {label: 'May', value: '5'},
            {label: 'June', value: '6'},
            {label: 'July', value: '7'},
            {label: 'August', value: '8'},
            {label: 'September', value: '9'},
            {label: 'October', value: '10'},
            {label: 'November', value: '11'},
            {label: 'December', value: '12'}
        ];
    }

    getTypesList() {

        return [
            {label: 'Select a type', value: ''},
            {label: 'Expense', value: 'EXPENSE'},
            {label: 'Revenue', value: 'REVENUE'}
        ];
    }

    consult(filter) {
        
        let params = `?year=${filter.year}`;

        if(filter.month) {
            params = `${params}&month=${filter.month}`;
        }
        
        if(filter.type) {
            params = `${params}&type=${filter.type}`;
        }
        
        if(filter.status) {
            params = `${params}&status=${filter.status}`;
        }
        
        if(filter.user) {
            params = `${params}&user=${filter.user}`;
        }

        if(filter.description) {
            params = `${params}&description=${filter.description}`;
        }
    
        return this.get(params);
    }

    remove(id) {

        return this.delete(`/${id}`);
    }

    create(entry) {

        return this.post(`/`, entry);
    }

    update(entry) {

        return this.put(`/${entry.id}`, entry);
    }

    validate(entry) {

        const errors = [];

        if(!entry.year) {

            errors.push('Must insert an year.');
        }

        if(!entry.month) {

            errors.push('Must select a month.');
        }

        if(!entry.description) {

            errors.push('Must insert a description.');
        }

        if(!entry.value) {

            errors.push('Must insert a value.');
        }

        if(!entry.type) {

            errors.push('Must select a type.');
        }

        if(errors && errors.length > 0) {

            throw new validationError(errors);
        }
    }

    getByID(id) {

        return this.get(`/${id}`);
    }

    updateStatus(id, status) {

        return this.put(`/${id}/update-status`, {status});
    }
}