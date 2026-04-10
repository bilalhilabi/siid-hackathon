import { LightningElement, track } from 'lwc';
import sample from '@salesforce/resourceUrl/AssignmentJSON';

export default class Assignment extends LightningElement {

   
    json;
    formdetails={};
    @track sourceOptions = [];


    @track selectedSources = [];
    @track pillItems = [];
    @track accordionData = [];

    // SAFETY GETTER
    get hasSelectedSources() {
        return this.selectedSources && this.selectedSources.length > 0;
    }

     connectedCallback(){
            fetch(sample)
            .then(response => response.json())
            .then(data => {
            this.json = data;
            if (data && data.length > 0) {
            this.sourceOptions = data[0].sourceOptions;
          }

    console.log('JSON Data => ', this.json);
    console.log('Source Options => ', this.sourceOptions);
})
            .catch(error => console.log(error))
         }


          handleChange(event){
        console.log('event',event.target.value);
        this.formdetails[event.target.dataset.name]= event.target.value;
        console.log('formdetails',this.formdetails);
     }

     
    // Dropdown select
    handlePicklistSelect(event) {

        const value = event.detail.value;

        if (!value) return;

        if (!this.selectedSources.includes(value)) {

            this.selectedSources = [...this.selectedSources, value];

            this.refreshPills();
            this.updateAccordion();
        }
    }

    // Remove pill
    handleRemovePill(event) {

        const removed = event.detail.item.name;

        this.selectedSources = this.selectedSources.filter(
            item => item !== removed
        );

        this.refreshPills();
        this.updateAccordion();
    }

    // Pill refresh (IMPORTANT)
    refreshPills() {

        this.pillItems = this.selectedSources.map(item => ({
            label: item,
            name: item
        }));
    }

    // Accordion sync
    updateAccordion() {

        if (!this.accordionData) {
            this.accordionData = [];
        }

        // Keep selected only
        let updated = this.accordionData.filter(sec =>
            this.selectedSources.includes(sec.name)
        );

        // Add new sections
        this.selectedSources.forEach(source => {

            let exists = updated.find(sec => sec.name === source);

            if (!exists) {
                updated.push({
                    name: source,
                    label: source,
                    items: this.addIndex([this.createNewItem()])
                });
            }
        });

        this.accordionData = [...updated];
    }

  handleAddAnother(event) {

    const sectionName = event.target.dataset.section;

    this.accordionData = this.accordionData.map(section => {

        if (section.name === sectionName) {

            const newItem = this.createNewItem();

            const updatedItems = this.addIndex([
                ...section.items,
                newItem
            ]);

            return {
                ...section,
                items: updatedItems
            };
        }

        return section;
    });
}

    

createNewItem() {
    return {
        id: Date.now() + Math.random(),
        DateReceived: '',
        Amount: '',
        Relationship: '',
        Country: ''
    };
}



addIndex(items) {

    return items.map((item, index) => ({
        ...item,
        displayIndex: index + 1,
        isLast: index === items.length - 1
    }));
}



handleDeleteRow(event) {

    const sectionName = event.currentTarget.dataset.section;
    const itemId = event.currentTarget.dataset.id;

    this.accordionData = this.accordionData.map(section => {

        if (section.name === sectionName) {

            const remainingItems = section.items.filter(item => {
                return String(item.id) !== itemId;   // ✅ FIX HERE
            });

            const finalItems =
                remainingItems.length > 0
                ? remainingItems
                : [this.createNewItem()];

            return {
                ...section,
                items: this.addIndex(finalItems)
            };
        }

        return section;
    });
}




    handleDeleteSection(event) {

    const sectionName = event.target.dataset.section;

    // Remove only UI section (keep logic untouched)
    this.accordionData = this.accordionData.filter(
        section => section.name !== sectionName
    );

    // Also remove pill selection
    this.selectedSources = this.selectedSources.filter(
        item => item !== sectionName
    );

    this.refreshPills();
}



}