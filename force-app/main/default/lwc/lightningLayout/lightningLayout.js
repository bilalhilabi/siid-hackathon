import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class LightningLayout extends LightningModal {
    @api content;

    handleOkay() {
        this.close('okay');
    }
}