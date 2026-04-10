import { LightningElement, api } from 'lwc';
import {
    FlowAttributeChangeEvent
} from 'lightning/flowSupport';

export default class FlowIntegration extends LightningElement {
     @api inputNumber1='';
      @api inputNumber2='';
     @api output='';

    handleclick(event){
        let name= event.target.name;
        if(name==='Add'){
            this.output = parseInt(this.inputNumber1) + parseInt(this.inputNumber2);
        } else if(name==='Sub'){
            this.output = parseInt(this.inputNumber1) - parseInt(this.inputNumber2);
        } else if(name==='Mul'){
            this.output = parseInt(this.inputNumber1) * parseInt(this.inputNumber2);
        }else if(name==='Div'){
            this.output = parseInt(this.inputNumber1) / parseInt(this.inputNumber2);
        }
        const AttributeChangeEvent = new FlowAttributeChangeEvent('output', this.output);
        this.dispatchEvent(AttributeChangeEvent);

    }
}