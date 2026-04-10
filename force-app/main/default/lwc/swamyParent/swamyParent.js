import { LightningElement } from 'lwc';

export default class SwamyParent extends LightningElement {

    battu;

    //variable calling ptoc
    bottle="";
    handleChange(event){
        this.bottle= event.target.value;
    }


//method calling ptoc
    buttonClick(){
        const child=this.template.querySelector('c-k-child')
        child.childMethod("KS");
    }

dataClick(event){
  this.battu= event.detail.message;
}

}