import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class FlowShowToastMesaage extends LightningElement {

    isshow="Shravani";
//   abc;  
  
  
//     statusChangeHandler(event){
//          if(event.detail.status === "FINISHED"){
          
//         const event = new ShowToastEvent({
//             title: 'Success',
//             message:
//                 'Contact Record  {0} Create Successfully. {2} ',
//                 variant: 'fatal',
//              mode: 'dismissable',
//     messageData: [
//                 'Salesforce',
//                 {
//                     url: 'http://www.salesforce.com/',
//                     label: 'Click',
//                 },
//                 'Donkey',
//             ], 
//         });
//         this.dispatchEvent(event);
    
//          }
//     }
}


// import { LightningElement } from 'lwc';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import { NavigationMixin } from 'lightning/navigation';

// export default class FlowShowToastEvent extends NavigationMixin(
//     LightningElement
// ) {
//     handleButtonClick() {
//         const event = new ShowToastEvent({
//             title: 'Success!',
//             message: 'Record {2} created! See it {0}!',
//             messageData: [
//                 'Salesforce',
//                 {
//                     url: 'http://www.salesforce.com/',
//                     label: 'here',
//                 },
//                 'Komal Kalambe'
                
//             ],
//         });
//         this.dispatchEvent(event);
//     }

//     handleRecordClick() {
//         this[NavigationMixin.GenerateUrl]({
//             type: 'standard__recordPage',
//             attributes: {
//                 recordId: '003xx000000001eAAA',
//                 actionName: 'view',
//             },
//         }).then((url) => {
//             const event = new ShowToastEvent({
//                 title: 'Success!',
//                 message: 'Record {0} created! See it {1}!',
//                 messageData: [
//                     'Salesforce',
//                     {
//                         url,
//                         label: 'here',
//                     },
//                 ],
//             });
//             this.dispatchEvent(event);
//         });
//     }
// }