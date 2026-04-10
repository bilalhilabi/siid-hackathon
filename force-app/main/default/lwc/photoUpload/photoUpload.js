import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PhotoUpload extends LightningElement {
     @track uploadedImageUrl = '';
    handleUploadClick() {
        this.template.querySelector('.file-input').click();
    }

    handleFileChange(event) {
        const file = event.target.files[0];

        if (!file) return;

        const MAX_SIZE = 4 * 1024 * 1024; // 4MB

          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            this.showToast('Invalid File Type', 'Only JPEG images are allowed.', 'error');
            return;
        }

        if (file.size > MAX_SIZE) {
            this.showToast('File Too Large', 'Max file size is 4MB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const image = new Image();
            image.src = reader.result;

            image.onload = () => {
                const isCutoff = image.width === 0 || image.height === 0;
                if (isCutoff) {
                    this.showToast('Image Error', 'The uploaded image appears to be cut off.', 'error');
                    return;
                }

                this.uploadedImageUrl = reader.result;
                this.showToast('Success', 'ID uploaded successfully!', 'success');

                // Optional: further handling logic (e.g., send to Apex)
            };
        };

        reader.readAsDataURL(file);
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}