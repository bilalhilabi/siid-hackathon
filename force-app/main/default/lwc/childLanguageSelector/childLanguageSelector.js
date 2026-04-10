import { LightningElement } from 'lwc';

export default class ChildLanguageSelector extends LightningElement {

    selectedLanguage = '';

languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' }
];

handleLanguageChange(event){
    this.selectedLanguage = event.detail.value;
}

handleContinue(){

    const languageEvent = new CustomEvent('languageselect',{
        detail:this.selectedLanguage
    });

    this.dispatchEvent(languageEvent);
}
}