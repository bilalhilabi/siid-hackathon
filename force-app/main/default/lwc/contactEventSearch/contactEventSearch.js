import { LightningElement, track } from 'lwc';
import getRelatedContactEvents from '@salesforce/apex/ContactEventController.getRelatedContactEvents';
import { getRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
 
export default class ContactEditor extends LightningElement {
    @track contactId = ''; // Store the user-entered ContactId
    @track recordId; // Store the record Id fetched based on the entered ContactId
    @track events = []; // List of related events to be displayed
    @track errorMessage = ''; // Store any error messages if the ContactId is invalid
 
    // Handle input change for ContactId
    handleContactIdChange(event) {
        this.contactId = event.target.value;
        this.errorMessage = ''; // Reset any previous error message
        if (this.contactId) {
            this.fetchContactRecord(this.contactId);
            this.fetchRelatedEvents(); // Fetch related events for valid ContactId
        }
    }
 
    // Fetch the Contact record based on the entered ContactId
    fetchContactRecord(contactId) {
        // Check if contactId is valid
        if (contactId.length === 15 || contactId.length === 18) {
            this.recordId = contactId; // Set the recordId for lightning-record-edit-form
            this.errorMessage = ''; // Clear any previous errors
        } else {
            this.errorMessage = 'Please enter a valid Contact ID.';
            this.recordId = null; // Clear recordId if invalid
        }
    }
 
    // Fetch related events based on the entered contactId
    fetchRelatedEvents() {
        if (this.contactId) {
            getRelatedContactEvents({ contactId: this.contactId })
                .then((result) => {
                    this.events = result; // Store events returned from Apex
                    this.errorMessage = ''; // Clear any previous error
                })
                .catch((error) => {
                    this.events = []; // Reset events if there is an error
                    this.errorMessage = 'Error fetching related events: ' + error.body.message; // Set error message
                });
        }
    }
 
    // Success handler for record edit form
    handleSuccess(event) {
        const updatedRecord = event.detail.id;
        console.log(`Contact record ${updatedRecord} was updated successfully!`);
    }
}