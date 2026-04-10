import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/accController.getAccounts';
import updateAccounts from '@salesforce/apex/accController.updateAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountDataTable extends LightningElement {
    @track accountData = [];
    @track draftValues = []; // Stores all edited records
    isUpdateDisabled = false; // Button enabled initially
    showModal = false; // Controls confirmation modal

    connectedCallback() {
        this.fetchData();
    }

    // Columns definition
    get columns() {
        return [
            { label: 'Account Name', fieldName: 'Name', editable: true },
            { label: 'Site', fieldName: 'Site', editable: true },
            { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
            //{ label: 'Type', fieldName: 'Type', editable: true }
        ];
    }

    // Fetch data from Apex imperatively
    fetchData() {
        getAccounts()
            .then(result => {
                this.accountData = result;
            })
            .catch(error => {
                this.showToast('Error', 'Error fetching account data', 'error');
                console.error(error);
            });
    }

    // Capture all edited values (Merging edits)
    handleCellChange(event) {
        const updatedValues = event.detail.draftValues;
        this.draftValues = [...this.draftValues, ...updatedValues]; // Merge edits
    }

    // Open confirmation modal
    openConfirmationModal() {
        this.showModal = true;
    }

    // Close modal
    closeModal() {
        this.showModal = false;
    }

    // Save all changes to backend
    saveChanges() {
        if (this.draftValues.length === 0) {
            this.showToast('Warning', 'No changes to update', 'warning');
            return;
        }

        updateAccounts({ accounts: this.draftValues })
            .then(() => {
                this.showToast('Success', 'Accounts updated successfully', 'success');
                this.draftValues = [];
                this.fetchData(); // Refresh data
            })
            .catch(error => {
                this.showToast('Error', 'Update failed', 'error');
                console.error(error);
            })
            .finally(() => {
                this.closeModal();
            });
    }

    // Show toast messages
    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}