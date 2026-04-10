import { LightningElement } from 'lwc';

export default class MdDesign extends LightningElement {
selectedStatus="";

statuses = [
        {
            label: 'Suggested',
            count: 4,
            icon: 'utility:light_bulb',
            className: 'card suggested'
        },
        {
            label: 'Shortlisted',
            count: 3,
            icon: 'utility:edit',
            className: 'card default'
        },
        {
            label: 'In Process',
            count: 2,
            icon: 'utility:record_update',
            className: 'card default'
        },
        {
            label: 'Final Choice',
            count: 1,
            icon: 'utility:check',
            className: 'card default'
        }
    ];

    handleCardClick(event) {
        console.log('event fired');
    const selected = event.currentTarget.dataset.label;
    console.log('123', selected);
    this.selectedStatus = selected;
}
}