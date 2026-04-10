import { LightningElement, track } from 'lwc';
import saveCustomer from '@salesforce/apex/BankCustomerController.saveCustomer';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcBackendData extends LightningElement {
    customer = {};
    accountType = '';
    accountOptions = [
        { label: 'Saving', value: 'Saving' },
        { label: 'Current', value: 'Current' }
    ];

    connectedCallback(){
        console.log('Component connected');
    }

    handleChange(event) {
        // const field = event.target.name;
        this.customer[event.target.dataset.name] = event.target.value;
        console.log('18', this.customer);
    }
handleSave(){
    console.log('20', JSON.stringify(this.customer));

}
   
}