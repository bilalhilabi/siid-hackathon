import { LightningElement, api } from 'lwc';
import uploadFile from '@salesforce/apex/FileUploaderController.uploadFile';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class UploadPdfOnAccount extends LightningElement {
    @api recordId; // Automatically gets Account Id
    uploadSuccess = false;

    openFileSelector() {
        const fileInput = this.template.querySelector('.file-input');
        fileInput.click();
    }

    handleFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file.type !== 'application/pdf') {
                this.showToast('Error', 'Please select a PDF file.', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(',')[1]; // remove metadata part
                this.uploadFileToServer(base64, file.name);
            };
            reader.readAsDataURL(file);
        }
    }

    uploadFileToServer(base64Data, fileName) {
        uploadFile({ base64Data: base64Data, fileName: fileName, recordId: this.recordId })
            .then(result => {
                console.log('File uploaded with ContentVersion Id: ', result);
                this.uploadSuccess = true;
                this.showToast('Success', 'PDF uploaded successfully.', 'success');
            })
            .catch(error => {
                console.error('Error uploading file', error);
                this.showToast('Error', 'Error uploading file.', 'error');
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        }));
    }
}