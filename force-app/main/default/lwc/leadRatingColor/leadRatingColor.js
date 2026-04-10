import { LightningElement,wire } from 'lwc';
import fetchLeads from '@salesforce/apex/LeadFetching.fetchLeads';

const COLUMNS = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Company', fieldName: 'Company' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Status', fieldName: 'Status' },
    { label: 'Rating', fieldName: 'Rating' }
];

export default class LeadRatingColor extends LightningElement {

    columns = COLUMNS;
    leads;
    error;

    @wire(fetchLeads)
    wiredLeads({ data, error }) {
        if (data) {
            this.leads = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.leads = undefined;
        }
    }

}