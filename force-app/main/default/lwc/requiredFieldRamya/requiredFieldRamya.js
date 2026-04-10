import { LightningElement } from 'lwc';

export default class RequiredFieldRamya extends LightningElement {
    username = '';
     proofname='komal';
    companyName='Infotech'; 
    skj=[]; 
  mydetail= [
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "age": 28,
      "isActive": true,
      "address": {
        "street": "123 Maple Street",
        "city": "New York",
        "zip": "10001"
      },
      "skills": ["JavaScript", "React", "Node.js"]
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "email": "bob.smith@example.com",
      "age": 34,
      "isActive": false,
      "address": {
        "street": "456 Oak Avenue",
        "city": "San Francisco",
        "zip": "94107"
      },
      "skills": ["Python", "Django", "SQL"]
    },
    {
      "id": 3,
      "name": "Charlie Lee",
      "email": "charlie.lee@example.com",
      "age": 25,
      "isActive": true,
      "address": {
        "street": "789 Pine Road",
        "city": "Chicago",
        "zip": "60614"
      },
      "skills": ["Java", "Spring Boot", "Docker"]
    }
  ]

   

  connectedCallback(){
  //    const javaSkills = this.mydetail
  //   .flatMap(user => user.skills)
  //   .filter(skill => skill === 'JavaScript');

  // console.log('✅ Extracted Java skills:', javaSkills);

  const usersWithJava = this.mydetail.filter(user =>
    user.skills.includes('JavaScript')
  );

  const abc = usersWithJava[0].skills[0];
  console.log('abc', abc);
  
 

  console.log('✅ Users with Java skill:', usersWithJava);
   
  //   this.skj = this.mydetail.filter(user => user.skills.includes("Java"));
  //       console.log('Filtered users:', this.skj);
    //  this.skj = this.mydetail[0].skills[0];
    //  console.log('23',this.skj)
     

  }


    handleChange(event) {
        this.username = event.target.value;

        // Clear any previous custom errors
        event.target.setCustomValidity('');
        event.target.reportValidity();
    }

    handleSubmit() {
        const inputField = this.template.querySelector('lightning-input');

        if (!this.username) {
            inputField.setCustomValidity('Username is required.');
        } else if (this.username.length < 4) {
            inputField.setCustomValidity('Username must be at least 4 characters.');
        } else {
            inputField.setCustomValidity(''); // Clear error if valid
        }
        inputField.reportValidity();
        this.proofname='Swamy';
        this.companyName ='Conscendo';
        this.mydetail[0].name = 'Lenovo';
    }
}



// import { LightningElement } from 'lwc';


// export default class RequiredFieldRamya extends LightningElement {
//      firstInput = '';
//     secondInput = '';
//     thirdInput = '';

//     handleInput(event){
//         console.log('sdfs')
//         if(event.target.name=='firstname'){
//             this.firstInput = event.target.value;
//         }else  if(event.target.name=='lastname'){
//             this.secondInput = event.target.value;
//         }else  if(event.target.name== 'middlename'){
//             this.thirdInput = event.target.value;
//         }
//         console.log('23',this.firstInput, this.secondInput, this.thirdInput)

         
//     }

//     handleClick(){
//         console.log('clicked');
//        this.template.querySelectorAll('lightning-input[data-name]').forEach((input) => {
//         console.log('input',input)
//         //input.value = this.formDetails[input.dataset.name];
//         input.setCustomValidity('');
//         input.reportValidity('');
//     })
//     }
   
// }