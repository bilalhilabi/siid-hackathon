import { LightningElement, api } from 'lwc';
import sample from '@salesforce/resourceUrl/sample';
export default class RSendDatatoBackend extends LightningElement {
     json;
     @api pageName;
     formdetails={};

     connectedCallback(){
        fetch(sample)
        .then(response => response.json())
        .then(data => {
            this.json= data;
            this.json=data.filter(item => item.page == this.pageName);
            console.log('abc',this.json);
        })
        .catch(error => console.log(error))
     }

     handleChange(event){
        console.log('event',event.target.value);
        this.formdetails[event.target.dataset.name]= event.target.value;
        console.log('formdetails',this.formdetails);
     }
     handleSubmit(event){
         console.log('formdetails',JSON.stringify(this.formdetails));
         localStorage.setItem('formdetails',JSON.stringify(this.formdetails));
     }

}