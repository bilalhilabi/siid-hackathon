import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/accountController1.getAccounts';
import getRecordTypes from '@salesforce/apex/accountController1.getRecordTypes';
import getPicklistFields from '@salesforce/apex/accountController1.getPicklistFields';
import getPicklistValues from '@salesforce/apex/accountController1.getPicklistValues';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Industry', fieldName: 'Industry', type: 'text' },
    {
        label: 'Is Active', fieldName: 'IsActive', type: 'customImage',
        cellAttributes: { iconName: { fieldName: 'iconName' }, iconAlternativeText: 'Status' }
    }
];

export default class AccountDataTable1 extends LightningElement {
    @track accounts = [];
    @track recordTypes = [];
    @track picklistFields = [];
    @track picklistValues = [];
    selectedRecordType = '';
    selectedPicklistField = '';
    selectedPicklistValue = '';

    connectedCallback() {
        this.loadRecordTypes();
        this.loadPicklistFields();
        this.loadAccounts();
    }

    loadRecordTypes() {
        getRecordTypes()
            .then(data => {
                this.recordTypes = data.map(rt => ({ label: rt.Name, value: rt.Id }));
            })
            .catch(error => {
                console.error('Error fetching record types', error);
            });
    }

    loadPicklistFields() {
        getPicklistFields()
            .then(data => {
                this.picklistFields = data.map(field => ({ label: field, value: field }));
            })
            .catch(error => {
                console.error('Error fetching picklist fields', error);
            });
    }

    loadPicklistValues() {
        if (this.selectedRecordType && this.selectedPicklistField) {
            getPicklistValues({ recordTypeId: this.selectedRecordType, fieldName: this.selectedPicklistField })
                .then(data => {
                    this.picklistValues = data.map(val => ({ label: val, value: val }));
                })
                .catch(error => {
                    console.error('Error fetching picklist values', error);
                });
        }
    }

    loadAccounts() {
        getAccounts({ recordTypeId: this.selectedRecordType, picklistField: this.selectedPicklistField, picklistValue: this.selectedPicklistValue })
            .then(data => {
                this.accounts = data.map(acc => ({
                    ...acc,
                    iconName: acc.IsActive ? 'utility:success' : 'utility:error'
                }));
            })
            .catch(error => {
                console.error('Error fetching accounts', error);
            });
    }

    handleRecordTypeChange(event) {
        this.selectedRecordType = event.detail.value;
        this.selectedPicklistField = '';
        this.selectedPicklistValue = '';
        this.picklistValues = [];
        this.loadPicklistValues();
        this.loadAccounts();
    }

    handlePicklistFieldChange(event) {
        this.selectedPicklistField = event.detail.value;
        this.selectedPicklistValue = '';
        this.picklistValues = [];
        this.loadPicklistValues();
        this.loadAccounts();
    }

    handlePicklistValueChange(event) {
        this.selectedPicklistValue = event.detail.value;
        this.loadAccounts();
    }

    handleReset() {
        this.selectedRecordType = '';
        this.selectedPicklistField = '';
        this.selectedPicklistValue = '';
        this.picklistValues = [];
        this.loadAccounts();
    }
}





// // accountDataTable.js
// import { LightningElement, track } from 'lwc';
// import getAccounts from '@salesforce/apex/accountController1.getAccounts';
// import getRecordTypes from '@salesforce/apex/accountController1.getRecordTypes';
// import getPicklistFields from '@salesforce/apex/accountController1.getPicklistFields';
// import getPicklistValues from '@salesforce/apex/accountController1.getPicklistValues';

// const COLUMNS = [
//     { label: 'Name', fieldName: 'Name', type: 'text' },
//     { label: 'Industry', fieldName: 'Industry', type: 'text' },
//     {
//         label: 'Is Active', fieldName: 'IsActive', type: 'customImage',
//         cellAttributes: { iconName: { fieldName: 'iconName' }, iconAlternativeText: 'Status' }
//     }
// ];

// export default class AccountDataTable extends LightningElement {
//     @track accounts = [];
//     @track recordTypes = [];
//     @track picklistFields = [];
//     @track picklistValues = [];
//     selectedRecordType;
//     selectedPicklistField;
//     selectedPicklistValue;

//     connectedCallback() {
//         this.loadRecordTypes();
//         this.loadPicklistFields();
//         this.loadAccounts();
//     }

//     loadRecordTypes() {
//         getRecordTypes()
//             .then(data => {
//                 this.recordTypes = data.map(rt => ({ label: rt.Name, value: rt.Id }));
//             })
//             .catch(error => {
//                 console.error('Error fetching record types', error);
//             });
//     }

//     loadPicklistFields() {
//         getPicklistFields()
//             .then(data => {
//                 this.picklistFields = data.map(field => ({ label: field, value: field }));
//             })
//             .catch(error => {
//                 console.error('Error fetching picklist fields', error);
//             });
//     }

//     loadPicklistValues() {
//         if (this.selectedRecordType && this.selectedPicklistField) {
//             getPicklistValues({ recordTypeId: this.selectedRecordType, fieldName: this.selectedPicklistField })
//                 .then(data => {
//                     this.picklistValues = data.map(val => ({ label: val, value: val }));
//                 })
//                 .catch(error => {
//                     console.error('Error fetching picklist values', error);
//                 });
//         }
//     }

//     loadAccounts() {
//         getAccounts({ recordTypeId: this.selectedRecordType, picklistField: this.selectedPicklistField, picklistValue: this.selectedPicklistValue })
//             .then(data => {
//                 this.accounts = data.map(acc => ({
//                     ...acc,
//                     iconName: acc.IsActive ? 'utility:success' : 'utility:error'
//                 }));
//             })
//             .catch(error => {
//                 console.error('Error fetching accounts', error);
//             });
//     }

//     handleRecordTypeChange(event) {
//         this.selectedRecordType = event.detail.value;
//         this.selectedPicklistField = null;
//         this.selectedPicklistValue = null;
//         this.picklistValues = [];
//         this.loadPicklistValues();
//         this.loadAccounts();
//     }

//     handlePicklistFieldChange(event) {
//         this.selectedPicklistField = event.detail.value;
//         this.selectedPicklistValue = null;
//         this.picklistValues = [];
//         this.loadPicklistValues();
//         this.loadAccounts();
//     }

//     handlePicklistValueChange(event) {
//         this.selectedPicklistValue = event.detail.value;
//         this.loadAccounts();
//     }
// }








// // import { LightningElement, track, wire } from 'lwc';
// // import getAccounts from '@salesforce/apex/accountController1.getAccounts';
// // import getAccountRecordTypes from '@salesforce/apex/accountController1.getAccountRecordTypes';
// // import getPicklistValues from '@salesforce/apex/accountController1.getPicklistFieldsByRecordType';

// // const columns = [
// //     { label: 'Account Name', fieldName: 'Name', type: 'text' },
// //     {
// //         label: 'Active', fieldName: 'IsActive__c', type: 'boolean',
// //         cellAttributes: { iconName: { fieldName: 'iconName' }, iconPosition: 'right' }
// //     }
// // ];

// // export default class AccountDatatable1 extends LightningElement {
// //     @track accounts = [];
// //     @track filteredAccounts = [];
// //     @track recordTypes = [];
// //     @track picklistFields = ['Industry', 'Type']; // Example picklist fields
// //     @track picklistValues = [];
// //     @track selectedRecordType;
// //     @track selectedPicklistField;
// //     @track selectedPicklistValue;
// //     columns = columns;

// //     connectedCallback() {
// //         this.loadAccounts();
// //         this.loadRecordTypes();
// //     }

// //     loadAccounts() {
// //         getAccounts().then(data => {
// //             this.accounts = data.map(acc => ({
// //                 ...acc,
// //                 iconName: acc.Active__c ? 'utility:check' : 'utility:close'
// //             }));
// //             this.filteredAccounts = [...this.accounts];
// //             console.log('23',JSON.stringify(this.accounts));
// //            // console.log('3',JSON.stringify(this.filteredAccounts));
// //         });
// //     }

// //     loadRecordTypes() {
// //         getAccountRecordTypes().then(data => {
// //             this.recordTypes = data.map(rt => ({ label: rt.Name, value: rt.Id }));
// //             console.log('23',JSON.stringify(this.recordTypes));
// //         });
// //     }

// //     handleRecordTypeChange(event) {
// //         this.selectedRecordType = event.target.value;
// //         this.picklistValues = [];
// //         this.filterAccounts();
// //     }

// //     handlePicklistFieldChange(event) {
// //         this.selectedPicklistField = event.target.value;
// //         this.picklistValues = [];
// //         if (this.selectedRecordType) {
// //             getPicklistValues({ fieldName: this.selectedPicklistField, recordTypeId: this.selectedRecordType }).then(data => {
// //                 this.picklistValues = data.map(pv => ({ label: pv.label, value: pv.value }));
// //             });
// //         }
// //     }

// //     handlePicklistValueChange(event) {
// //         this.selectedPicklistValue = event.target.value;
// //         this.filterAccounts();
// //     }

// //     filterAccounts() {
// //         this.filteredAccounts = this.accounts.filter(acc => {
// //             let matchRecordType = this.selectedRecordType ? acc.RecordTypeId === this.selectedRecordType : true;
// //             let matchPicklist = this.selectedPicklistValue ? acc[this.selectedPicklistField] === this.selectedPicklistValue : true;
// //             return matchRecordType && matchPicklist;
// //         });
// //     }
// // }