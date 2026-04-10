import { LightningElement, api } from 'lwc';

export default class FlowIntegrationInputB extends LightningElement {

 
    @api recordId ;
    get inputVariables(){
        return[
            { name:"AccountId" , type:"String" , value:this.recordId},
            { name: "OperationType" ,  type:"String" , value:"Create Record"}
        ];
    }

    handleStatusChange(event){
       
       if(event.detail.status === "FINISHED"){
         let outputValue = event.detail.outputVariables;

         for(let i=0;i<=outputValue.length;i++){
              let outputItem = outputValue[i];
              if(outputItem.name == 'AccountIdOutput'){
                   console.log('AccountId', outputItem.value);
              }
              if(outputItem.name == 'OperationTypeOutput'){
                   console.log('OperationType', outputItem.value);
              }
         }
        
       }
    }
}