import { LightningElement,api } from 'lwc';
import getAccountId from '@salesforce/apex/RefreshController.getAccountId';
import {registerRefreshHandler} from 'lightning/refresh';


export default class RefreshPage extends LightningElement {
//    ratingValue;
//   @api recordId;
//     connectedCallback(){
      
//       registerRefreshHandler(this, this.refreshHandler); //ContextElement, ProviderMethod

//         this.fetchAccount();
//     }

// refreshHandler(){
//    console.log('changed');
//    return new Promise((resolve) => {
//       this.fetchAccount();
//       resolve(true);
//     });
// }

//     fetchAccount(){
//     getAccountId({"accountId": this.recordId})
//       .then( response=>{
//         console.log('res',response);
//        this.ratingValue = response[0].Rating;
//       })
//       .catch(error=>{
//         console.error(error); 
//       })
      
//     } 
}