import { LightningElement } from 'lwc';

export default class ShowTextpicklistValue extends LightningElement {
label ='';
value = '';
swamy;
isOne = false;
isTwo = false;
isThree = false;

    get options() {
        return [
            { label: 'choose quantity...', value: '' },
            { label: 'one', value: '1' },
            { label: 'two', value: '2' },
            { label: 'three', value: '3' },
        ];
    }

    handleChange(event) {
        this.label = event.target.label;
        this.value = event.target.value;
        console.log('value', this.value);
         console.log('label', this.label);
         console.log('data', event.target.dataset.label);

         // 1st method
        // if(this.value == '1' &&  event.target.dataset.label == 'How many tickets?'  ){
        //     this.isOne = true;
        //     this.isTwo = false;
        //     this.isThree = false;
        // }else if(this.value == '2'  &&  event.target.dataset.label == 'How many tickets?'){
        //     this.isOne = false;
        //      this.isTwo = true;
        //      this.isThree = false;
        // }else if(this.value == '3'  &&  event.target.dataset.label == 'How many tickets?'){
        //      this.isOne = false;
        //      this.isTwo = false;
        //      this.isThree = true;
         //}
         this.setAddressOption(this.value);
    
    }

       setAddressOption(selection) {
        // 2nd method
        //  this.isOne = selection === '1';
        // this.isTwo = selection === '2';
        // this.isThree = selection === '3';


        // 3rd method
        this.isOne = false;
        this.isTwo = false;
        this.isThree = false;
        switch (selection) {
            case '1':
                this.isOne = true;
                break;
            case '2':
                this.isTwo = true;
                break;
            case '3':
                this.isThree = true;
                break;
        }
    }

    handleChangeText(event) {
          this.swamy= event.target.value;
        console.log('value',  this.swamy);
}
}