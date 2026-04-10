import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import { LightningElement } from 'lwc';

export default class CustomValidation extends LightningElement {
    userInfo=[
        {label:'FirstName',
            id:1,
            isText: true,
            required: true
        },
        {label:'LastName',
            id:2,
        isText: true,
     required: false},

         {label:'Company',
            id:3,
        isText: true,
     required: true},
      
    ]

//     handleBlur(event){
//            let input = event.target;//this.template.querySelector('lightning-input');
//             input.setCustomValidity('');
//             if(!input.value){
//                 input.setCustomValidity('Please enter data');
//             }
//             input.reportValidity("");
//         // this.template.querySelectorAll('lightning-input').forEach(element => {
//         //      element.setCustomValidity('');
//         //       if(!element.value){
//         //     element.setCustomValidity('Please enter valid data');
//         //       }
//         //        element.reportValidity();
//         // })
// }

   validateField(input, required=true) {
        input.setCustomValidity('');
        if(!input.value && required== true) {
            input.setCustomValidity('Please enter data');
        }
        input.reportValidity();
    }

    // Blur handler → validates only the field being blurred
    handleBlur(event) {
        this.validateField(event.target);
    }

    // Save handler → validates all fields
    handleClick() {
        let allValid = true;

        this.template.querySelectorAll('lightning-input').forEach(input => {
            this.validateField(input);
            if (!input.checkValidity()) {
                allValid = false;
            }
        });

        if (allValid) {
            console.log('✅ All fields valid. Proceed with save...');
        }
    }

}