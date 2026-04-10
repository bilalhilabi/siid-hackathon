import { LightningElement } from 'lwc';

export default class CssPractice extends LightningElement {
    x='1,2';
    get hello(){
        return this.x=='1,2'?'slds-grid slds-grid_align-spread slds-wrap':'deepu';
    }
    
}