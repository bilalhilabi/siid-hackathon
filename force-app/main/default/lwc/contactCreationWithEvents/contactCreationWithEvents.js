import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getRelatedEvents from '@salesforce/apex/EventController.getRelatedEvents';

export default class ContactCreationWithEvents extends LightningElement {
    @track events = { data: [], error: null };
    @track isLoading = false;
    contactId;

    // Columns for lightning-datatable
    eventColumns = [
        { label: 'Subject', fieldName: 'Subject', type: 'text' },
        { label: 'Start Date', fieldName: 'StartDateTime', type: 'date' },
        { label: 'End Date', fieldName: 'EndDateTime', type: 'date' },
        { label: 'Location', fieldName: 'Location', type: 'text' }
    ];

    // Called when the form is submitted
    handleSubmit() {
        this.isLoading = true;
    }

    // Called on successful contact creation
    handleSuccess(event) {
        this.isLoading = false;

        this.contactId = event.detail.id;

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Contact created successfully!',
                variant: 'success'
            })
        );

        this.fetchRelatedEvents();
    }

    // Called when the form submission fails
    handleError(event) {
        this.isLoading = false;

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error creating contact',
                message: event.detail.message || 'Unknown error',
                variant: 'error'
            })
        );
    }

    // Call Apex to fetch events related to the contact
    fetchRelatedEvents() {
        if (!this.contactId) return;

        this.isLoading = true;

        getRelatedEvents({ contactId: this.contactId })
            .then((result) => {
                this.events = { data: result, error: null };
            })
            .catch((error) => {
                this.events = { data: [], error };
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading events',
                        message: error.body.message || 'Unknown error',
                        variant: 'error'
                    })
                );
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
}