import { LightningElement } from 'lwc';

export default class StepperMdDesign extends LightningElement {
    selectedStatus = 'Suggested';

    statuses = [
        { label: 'Suggested', icon: 'utility:light_bulb' },
        { label: 'Shortlisted', icon: 'utility:edit' },
        { label: 'In Process', icon: 'utility:record_update' },
        { label: 'Final Choice', icon: 'utility:check' }
    ];

    get computedStatuses() {
        return this.statuses.map((item, index) => {
            return {
                ...item,
                className: `step ${item.label === this.selectedStatus ? 'active' : ''}`,
                isLast: index === this.statuses.length - 1
            };
        });
    }

    handleStepClick(event) {
        const selected = event.currentTarget.dataset.label;
        this.selectedStatus = selected;
    }

    handleClick() {
        console.log('Query button clicked');
    }
}