import { LightningElement, api, track } from 'lwc';
import getObjectFields from '@salesforce/apex/formController.getObjectFields';
import saveCorporateData from '@salesforce/apex/formController.saveCorporateData';
import LightningAlert from 'lightning/alert';

export default class Deepu extends LightningElement {
    @api objectApiName = 'Form__c';
    @api childApiName = 'SubForm__c';
    @track fields = [];
    @track nomineeFields = [];
    @track nomineeData = [];
    @track shareholderData = {};
    @track nomineeRecord = {};
    @track recordId = null; // Store created record ID
    @track isUpdateMode = false; // Track if updating

    connectedCallback() {
        this.fetchFields();
    }

    fetchFields() {
        Promise.all([
            getObjectFields({ objectName: this.objectApiName }),
            getObjectFields({ objectName: this.childApiName })
        ])
        .then(([shareholderFields, nomineeFields]) => {
            this.fields = this.processFields(shareholderFields);
            this.nomineeFields = this.processFields(nomineeFields);
        })
        .catch(error => {
            console.error('Error fetching fields:', error);
        });
    }

    processFields(data) {
        return data.map(field => ({
            ...field,
            isText: field.fieldType.toLowerCase() === 'string' && field.fieldLabel !== 'Home/Permanent Address',
            isAddress: field.fieldType.toLowerCase() === 'string' && field.fieldLabel === 'Home/Permanent Address',
            isDate: field.fieldType.toLowerCase() === 'date',
            isNumber: ['integer', 'double', 'currency'].includes(field.fieldType.toLowerCase()),
            isPicklist: field.fieldType.toLowerCase().includes('picklist'),
            isCheckbox: field.fieldType.toLowerCase() === 'boolean',
            isPercentage: field.fieldType.toLowerCase() === 'percent', 
            isReference: field.fieldType.toLowerCase() === 'reference', 
            isEmail: field.fieldType.toLowerCase() === 'email'
        }));
    }

    handleChange(event) {
        const field = event.target;
        const fieldName = field.dataset.id;
        let value = field.type === 'checkbox' ? field.checked : field.value;

        if (field.type === 'number') {
            value = Number(value);
            if (isNaN(value)) {
                this.showToast('Error', `Invalid number for ${fieldName}`, 'error');
                return;
            }
        }

        if (field.classList.contains('dynamic-input')) {
            this.shareholderData = { ...this.shareholderData, [fieldName]: value };
        } else if (field.classList.contains('nominee-input')) {
            this.nomineeRecord = { ...this.nomineeRecord, [fieldName]: value };
        }

        if (value) {
            field.setCustomValidity('');
        }
        field.reportValidity();
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (!this.validateFields()) {
            await this.showToast('Error', 'Please fill in all required fields before proceeding.', 'error');
            return;
        }

        let nomineeRecords = [];
        if (this.nomineeRecord && Object.keys(this.nomineeRecord).length > 0) {
            nomineeRecords.push(this.nomineeRecord);
        }

        saveCorporateData({ shareholderValues: this.shareholderData, nomineeValues: nomineeRecords })
        .then(async (result) => {
            if (result) {
                this.recordId = result; // Store created record ID
                this.isUpdateMode = true; // Switch to update mode
                await this.showToast('Success', 'Records inserted successfully', 'success');
            }
        })
        .catch(async (error) => {
            let errorMessage = 'Unknown error occurred';
            if (error && error.body && error.body.message) {
                errorMessage = error.body.message;
            }
            await this.showToast('Error', `Failed to save records: ${errorMessage}`, 'error');
        });
    }

    validateFields() {
        let allValid = true;
        const inputs = this.template.querySelectorAll('lightning-input, lightning-combobox');
        inputs.forEach(input => {
            if (!input.value && input.type !== 'checkbox') {
                input.setCustomValidity('This field is required');
                input.reportValidity();
                allValid = false;
            } else {
                input.setCustomValidity('');
                input.reportValidity();
            }
        });
        return allValid;
    }

    async showToast(title, message, variant) {
        await LightningAlert.open({
            message: message,
            theme: variant === 'error' ? 'error' : 'success',
            label: title
        });
    }

    get buttonLabel() {
        return this.isUpdateMode ? 'Update' : 'Submit';
    }
}