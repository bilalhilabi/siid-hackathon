import { LightningElement, api } from 'lwc';

export default class KChild extends LightningElement {
    @api chairTable='';

   @api
   childMethod(val){
    alert(' Child method called');
        console.log("child method called from parent", this.chairTable);
        this.chairTable=val;
   } 

   handleclickFromParent(){
        const eve = new CustomEvent('message',{
            detail: {
                message: 'from child'
            }
        }
        );
        this.dispatchEvent(eve);
   }
}