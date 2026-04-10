import { LightningElement, track } from 'lwc';
import callExternalUser from '@salesforce/apex/CRestIntegration.callExternalUser';

const COLUMNS = [
    { label: 'ID', fieldName: 'id', type: 'number' },
    { label: 'Title', fieldName: 'title', type: 'text' },
    { label: 'User ID', fieldName: 'userId', type: 'number' }
];

const PAGE_SIZE = 10;

export default class RestIntegrationLWC extends LightningElement {
    @track albums = [];
    @track error;
    columns = COLUMNS;

    @track pagedData = [];
    @track currentPage = 1;
    totalPages = 0;

    connectedCallback() {
        this.fetchAlbums();
    }

    async fetchAlbums() {
        try {
            const data = await callExternalUser();
            this.albums = data;
            this.error = undefined;
            this.totalPages = Math.ceil(data.length / PAGE_SIZE);
            this.updatePagedData();
        } catch (error) {
            this.error = 'Error fetching albums';
            this.albums = undefined;
        }
    }

    updatePagedData() {
        const startIndex = (this.currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        this.pagedData = this.albums.slice(startIndex, endIndex);
    }

    handleNext() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePagedData();
        }
    }

    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePagedData();
        }
    }

    get disablePrevious() {
        return this.currentPage === 1;
    }

    get disableNext() {
        return this.currentPage === this.totalPages;
    }
}