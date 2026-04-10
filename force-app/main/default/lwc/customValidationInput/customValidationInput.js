import { LightningElement, api } from 'lwc';
 import sample from '@salesforce/resourceUrl/sample';

export default class CustomValidationInput extends LightningElement {
    // firstName;
    // isStudent;
    // company;
    // skills;
    json;
    @api pageName;

    // info=[
    //    {page:'loginpage',
    //     id:'1LoginPage',
    //     fields:[
    //         {isInput:true,
    //             label:'username',
    //             id:'usernameLogin'
    //         },
    //         {isInput:true,
    //             label:'Password',
    //             id:'passwordLogin'
    //         }

    //     ],
    //    },
    //    {page:'registrationpage',
    //     id:'2RegistrationPage',
    //      fields:[
    //         {isInput:true,
    //             label:'FirstName',
    //             id:'firstNameReg'
    //         },
    //         {isInput:true,
    //             label:'LastName',
    //             id:'lastNameReg'
    //         },
    //         {isInput:true,
    //             label:'Company',
    //             id:'comapanyReg'
    //         }

    //     ],
    //    } 
    // ];

//    userInfo=[
//         {label:'FirstName',
//             id:1,
//             isText: true
//         },

//         {label:'Company',
//             id:2,
//             isComboBox: true,
//             // defaultValue: 'tcs',
//             options: [
//             { label: 'Conscendo Technology', value: 'CT' },
//             { label: 'Tata Consultancy Services', value: 'tcs' },
//             { label: 'Infosys', value: 'infosys' },
//             { label: 'Wipro', value: 'wipro' },
//             { label: 'Tech Mahindra', value: 'techm' }
//                      ]
//         },
//         {label:'isStudent',
//             id:3,
//         isCheckBox: true},
        
//         {
//             label: 'Skills',
//             id: 4,
//             isMultiPicklist: true,
//             options: [
//                 { label: 'Apex', value: 'apex' },
//                 { label: 'LWC', value: 'lwc' },
//                 { label: 'Aura', value: 'aura' },
//                 { label: 'SOQL', value: 'soql' },
//                 { label: 'Integration', value: 'integration' }
//             ]
//         }
//     ]

connectedCallback(){
        console.log('Clicked');
        console.log(this.jsonString);
       
        fetch(sample)
            .then((response) => response.json())
            .then((data) => {
                this.json = data;
                this.json= data.filter(item=>item.page==this.pageName);
            })
            .catch((error) => {
                console.error('Error loading JSON:', error);
            });
    }

    // handleBlur(event){
    //     let input=event.target;
    //      if( input.dataset.type=='input'){
    //             !input.value? this.firstName=true: this.firstName=false;
    //         }

    //          if(input.dataset.type=='combobox'){
    //             !input.value? this.company=true:this.company=false;
    //         }

    //         if( input.dataset.type=='checkbox'){
    //             !input.checked?this.isStudent=true:this.isStudent=false;
    //         }
            
    //         if(input.dataset.type=='multipicklist'){
    //             !input.value? this.skills=true:this.skills=false;
 
    //         }
    // }

    //   handleClick(event){
    //     let inputs=this.template.querySelectorAll('input, lightning-combobox, checkbox');

    //     inputs.forEach(input=>{
    //         if( input.dataset.type=='input'){
    //             !input.value? this.firstName=true: this.firstName=false;
 
    //         }
    //         if(input.dataset.type=='combobox'){
    //             !input.value? this.company=true:this.company=false;
 
    //         }
    //         if( input.dataset.type=='checkbox'){
    //             !input.checked?this.isStudent=true:this.isStudent=false;
 
    //         }

    //         if(input.dataset.type=='multipicklist'){
    //             !input.value? this.skills=true:this.skills=false;
 
    //         }
                      
    //     })
    // }

}