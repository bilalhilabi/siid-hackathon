import { LightningElement } from 'lwc';

export default class Form extends LightningElement {
    
    valuetitle = '';
    value = '';

    title='';
    sname='';
    fname='';
    radio='';
    radio1='';
    radio2='';
    email = '';
    add1 ='';
    add2 ='';
    add3 ='';
    add4 ='';
    postcode = '';
    country ='';
    dbirth='';
    pbirth='';
    primaryCode='';
    radio3='';
    radio4='';
    input1='';
    ldate='';
   

    handleChange(event){
      if(event.target.name === 'title'){
        this.title = event.target.value;
        console.log(this.title);
      }
      if(event.target.name === 'sname'){
        this.sname = event.target.value;
      }
      else if(event.target.name === 'fname'){
        this.fname = event.target.value;
      }
      else if(event.target.name === 'radio'){
        this.radio = event.target.value;
        console.log(this.radio);
      }
      else if(event.target.name === 'radio1'){
        this.radio1 = event.target.value;
        console.log(this.radio1);
      }
      else if(event.target.name === 'radio2'){
        this.radio2 = event.target.value;
        console.log(this.radio2);
      }
      else if(event.target.name === 'email'){
        this.email = event.target.value;
      }
      else if(event.target.name === 'add1'){
        this.add1 = event.target.value;
      }
      else if(event.target.name === 'add2'){
        this.add2 = event.target.value;
      }
      else if(event.target.name === 'add3'){
        this.add3 = event.target.value;
      }
      else if(event.target.name === 'add4'){
        this.add4 = event.target.value;
      }
      else if(event.target.name === 'postcode'){
        this.postcode = event.target.value;
      }
      else if(event.target.name === 'country'){
        this.country = event.target.value;
      }
      else if(event.target.name === 'dbirth'){
        this.dbirth = event.target.value;
      }
      else if(event.target.name === 'pbirth'){
        this.pbirth = event.target.value;
        console.log(this.pbirth);
      }
      else if(event.target.name === 'primaryCode'){
        this.primaryCode = event.target.value;
      }
      else if(event.target.name === 'radio3'){
        this.radio3 = event.target.value;
        console.log(this.radio3);
      }
      else if(event.target.name === 'radio4'){
        this.radio4 = event.target.value;
        console.log(this.radio4);
      }
      else if(event.target.name === 'input1'){
        this.input1 = event.detail.value;
        console.log(this.input1);
      }
      else if(event.target.name === 'ldate'){
        this.ldate = event.target.value;
      }
      
    }


    get optionstitle() {
        return [
            { label: 'Mr.', value: 'Mr.' },
            { label: 'Mrs.', value: 'Mrs.' },
            { label: 'Miss', value: 'Miss' },
        ];
    }

    get options() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
        ];
    }


    

}