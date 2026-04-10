import { LightningElement, wire } from 'lwc';
import USER_ID from '@salesforce/user/Id';
import getAccounts from '@salesforce/apex/accountController.getAccounts';
import welcomeMsg from '@salesforce/label/c.Welcome_Message';
import lang from '@salesforce/i18n/lang';

export default class MultiLanguage extends LightningElement {
islanguageSelected = false;
showPopup = true ;
accounts;
userId = USER_ID;
 label = {
        welcomeMsg
    };

columns = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Type', fieldName: 'Type' }
];
    

//    connectedCallback() {
//      console.log('User Language:', lang);

//       //const savedLang = localStorage.getItem('siteLang');

//       const langSelected = sessionStorage.getItem('langSelected');

//     if(!langSelected){
//         this.showPopup = true;
//     } else{
//         this.showPopup = false;
//     }

//     // const currentUrl = window.location.pathname;

//     // if(lang.startsWith('fr') && !currentUrl.includes('/fr/')) {
//     //     window.location.href = '/digital/fr/';
//     // }
// }


handleLanguageSelect(event){

    const selectedLang = event.detail;

    localStorage.setItem('langSelected',selectedLang);

    this.showPopup = false;

  const base = window.location.origin;

if(selectedLang === 'fr'){
    window.location.href = base + '/multiLanguage/fr/';
} else{
    window.location.href = base + '/multiLanguage/';
}

}

  @wire(getAccounts, { userId: '$userId' })
wiredAccounts({ error, data }) {
    if(data){
        this.accounts = data;
    } else if(error){
        console.error(error);
    }
}


    
   

 
}