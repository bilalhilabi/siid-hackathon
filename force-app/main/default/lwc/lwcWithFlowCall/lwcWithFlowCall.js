import { LightningElement } from 'lwc';

export default class LwcWithFlowCall extends LightningElement {

    firstName;
    lastName;
    flowVariable=[];
    isShowFlow=false;

    handleChange(event) {
        if (event.target.name === 'firstName') {
            this.firstName = event.target.value;
        } else if (event.target.name === 'lastName') {
            this.lastName = event.target.value;
        }
    }

    

    ShowFlowhandle(){
            
            this.flowVariable=[

                {
                    name:"firstName",
                    type:"String",
                    value:this.firstName
                },
        
                {
                    name:"lastName",
                    type:"String",
                    value:this.lastName
                }
            ];
            this.isShowFlow=true;
    }

    handleFlowStatusChange(event){
   if(event.detail.status?.toLowerCase()=='finished'){
    this.isShowFlow=false;
    this.firstName='';
    this.lastName='';
    

   }
        
    }

   

};