/**
 ***************************************************************************************
 * @Name of the LWC  	: ics_comp_acpicklist.js
 * @Description       	: Component used to display multipicklist values  SBO-UK
 * @Author            	: Ramya Gurram
 * @Created Date      	: 15-10-2023
 ***************************************************************************************
 * @Last Modified By 		: Shravani Ganta
 * @Last Modified On 		: 07-06-2024
 * @Modification description :  SFP-30254
 ***************************************************************************************
 */
import {
    LightningElement,
    track,
    api
} from 'lwc';

export default class IcsCompMultiPicklist extends LightningElement {
    @api options;
    @api selectedValue;
    @api placeholder;
    @api selectedValues = [];
    @api label;
    @api disabled;
    @api multiSelect = false;
    @track value;
    @track values = [];
    @track optionData;
    @track searchString;
    @track noResultMessage;
    @track showDropdown = false;
    @api valuesDefault;
    selectedNoneValue;
    isscreenLoaded;
    isSelectedItem;
    @api closePillValue;
    /**
     * @description Method to load picklist values
     */
    connectedCallback() {
        this.setValues();
    }
    /**
   * @description Method to et values
   */
    setValues() {
        this.showDropdown = false;
        let optionData = this.options ? (JSON.parse(JSON.stringify(this.options))) : [];
        this.handleSelectedValues(optionData);
        this.value = this.selectedValue ? (JSON.parse(JSON.stringify(this.selectedValue))) : [];
        this.values = this.selectedValues ? (JSON.parse(JSON.stringify(this.selectedValues))) : [];
        this.optionData = optionData;
        if (this.valuesDefault) {

            this.triggerValues();
            this.handleSelectedNoneValue(optionData);

        }
        this.filterOptionsWithNoneMethod(optionData);
    }
    /**
     * @description Method to handle Selected None Value
     */
    handleSelectedNoneValue(optionData) {
        for (let i in optionData) {
            if (optionData[i].selected === true && optionData[i].value != 'None') {
                this.selectedNoneValue = false;
                if (this.multiSelect) {
                    if (this.values?.includes(optionData[i].value)) {
                        this.values.splice(this.values.indexOf(optionData[i].value), 1);
                    } else {
                        this.values.push(optionData[i].value);
                    }
                }
            } else if (optionData[i].selected === true && optionData[i].value == 'None') {
                this.values = [];
                this.selectedNoneValue = true;
            } else {
                this.selectedNoneValue = false;
            }
        }
    }
    /**
     * @description Method to filter Options With None Method
     */
    filterOptionsWithNoneMethod(optionData) {
        optionData = optionData.sort((a, b) => (a.label > b.label) ? 1 : -1);
        let getNoneMethod = (currentValues = optionData, val = 'None') =>
            currentValues.filter(x => x.label !== val).concat(optionData.filter(x => x.label === val));
        let getOtherMethod = (currentValues = optionData, val = 'Other') =>
            currentValues.filter(x => x.label !== val).concat(optionData.filter(x => x.label === val));
        let getOthersMethod = (currentValues = optionData, val = 'Others') =>
            currentValues.filter(x => x.label !== val).concat(optionData.filter(x => x.label === val));
        optionData = getNoneMethod();
        optionData = getOtherMethod();
        optionData = getOthersMethod();
        this.optionData = optionData;
    }
    /**
    * @description Method to handle triggerOptionsFromParent
    */
    @api triggerOptionsFromParent() {
        this.setValues();
    }
    /**
     * @description Method to handle Selected Values
     */
    handleSelectedValues(optionData) {
        let searchString;
        let count = 0;
        optionData.forEach(option => {
            if (this.multiSelect) {
                if (this.values.includes(option.value)) {
                    option.selected = true;
                    count++;
                }
            } else {
                if (option.value == this.value) {
                    searchString = option.label;
                }
            }
        });
        this.searchString = this.multiSelect ? '' : searchString;
    }
    /**
     * @description Method to filter options
     */
    filterOptions(event) {
        this.searchString = event.target.value.trim().toLowerCase();
        if (!this.searchString || this.searchString.length < 2) {
            this.showDropdown = false;
            return;
        }
        this.noResultMessage = '';
        let flag = true;
        this.optionData.forEach(option => {
            const label = option.label.trim().toLowerCase();
            option.isVisible = label.startsWith(this.searchString);
            if (option.isVisible) {
                flag = false;
            }
        });
        if (flag) {
            this.noResultMessage = "No results found for '" + this.searchString + "'";
        }
        this.showDropdown = true;
    }
    /**
     * @description Method to handle selected item
     */

    selectItem(event) {
        this.isSelectedItem = true;
        const selectedVal = event.currentTarget.dataset.id;
        if (!selectedVal) return;
        this.updateOptionSelection(selectedVal);
        this.dispatchSelectionEvent();
        this.handleSearchStringAndDropdown(event);
    }
    /**
     * @description Method to updateOptionSelection
     */
    updateOptionSelection(selectedVal) {
        const options = this.optionData;
        this.selectedNoneValue = false;

        if (selectedVal === 'None') {
            this.handleNoneSelection(options);
        } else {
            this.handleRegularSelection(selectedVal, options);
        }

        this.optionData = options;
    }
    /**
     * @description Method to handleNoneSelection
     */
    handleNoneSelection(options) {
        this.values = [];
        this.selectedNoneValue = true;
        options.forEach(option => {
            option.selected = option.value === 'None';
        });
    }
    /**
     * @description Method to handleRegularSelection
     */
    handleRegularSelection(selectedVal, options) {
        options.forEach(option => {
            if (option.value === selectedVal) {
                this.updateSelectedOption(option);
            } else if (option.value === 'None') {
                option.selected = false;
            }
        });
    }
    /**
     * @description Method to updateSelectedOption
     */
    updateSelectedOption(option) {
        if (this.multiSelect) {
            this.toggleMultiSelectOption(option);
        } else {
            this.setSingleSelectOption(option);
        }
    }
    /**
     * @description Method to toggleMultiSelectOption
     */
    toggleMultiSelectOption(option) {
        const index = this.values.indexOf(option.value);
        if (index !== -1) {
            this.values.splice(index, 1);
        } else {
            this.values.push(option.value);
        }

        option.selected = !option.selected;
    }
    /**
     * @description Method to setSingleSelectOption
     */
    setSingleSelectOption(option) {
        this.value = option.value;
        this.searchString = option.label;
    }
    /**
     * @description Method to dispatchSelectionEvent
     */

    dispatchSelectionEvent() {
        const ev = new CustomEvent('selectoption', {
            detail: {
                value: this.values,
                name: this.label,
                noneValue: this.selectedNoneValue
            }
        });
        this.dispatchEvent(ev);
    }
    /**
     * @description Method to handleSearchStringAndDropdown
     */
    handleSearchStringAndDropdown(event) {
        if (this.multiSelect) {
            this.searchString = ' ';
            event.preventDefault();
        } else {
            this.showDropdown = false;
        }
    }
    /**
     * @description Method to show options
     */
    showOptions() {
        if (!this.disabled && this.options) {
            this.noResultMessage = '';
            this.searchString = '';
            let options = JSON.parse(JSON.stringify(this.optionData));
            Object.keys(options).forEach(key => {
                options[key].isVisible = true;
            });
            if (options.length > 0) {
                this.showDropdown = true;
            }
            this.optionData = options;
        }
    }
    /**
     * @description Method to clear the options
     */
    @api clearAll() {
        this.values = [];
        let optionData = this.options ? (JSON.parse(JSON.stringify(this.options))) : null;
        for (let i in optionData) {
            if (this.multiSelect) {
                optionData[i].selected = false;
            }
        }
        this.searchString = ' '
        this.selectedValues = [];
        this.optionData = optionData;
    }
    /**
     * @description Method to close pills
     */
    @api closePill(event) {
        let value;
        if (this.closePillValue) {
            value = this.closePillValue
        } else {
            value = event.currentTarget.name;
        }
        let count = 0;
        let options = this.optionData;
        for (let i in options) {
            if (options[i].value === value) {
                options[i].selected = false;
                this.values.splice(this.values.indexOf(options[i].value), 1);
            }
            if (options[i].selected) {
                count++;
            }
        }
        this.optionData = options;
        if (this.multiSelect) {
            this.searchString = ' '

            let ev = new CustomEvent('selectoption', {
                detail: {
                    value: this.values,
                    name: this.label
                }
            });
            this.dispatchEvent(ev);
            this.closePillValue = null;
        }
    }
    /**
     * @description Method to handle blur
     */
    handleBlur() {
        let previousLabel;
        let count = 0;

        for (let i in this.optionData) {
            if (this.optionData[i].value === this.value) {
                previousLabel = this.optionData[i].label;
            }
            if (this.optionData[i].selected) {
                count++;
            }
        }

        if (this.multiSelect) {
            this.searchString = ' '
        } else {
            this.searchString = previousLabel;
        }

        this.showDropdown = false;
    }
    /**
     * @description Method to load icons
     */
    handleMouseOut() {
        this.showDropdown = false;
    }
    /**
     * @description Method to load icons
     */
    handleMouseIn() {
        this.showDropdown = true;
    }
    /**
     * @description Method to load input value
     */
    renderedCallback() {
        this.isscreenLoaded = false;
        if (this.valuesDefault && !this.isscreenLoaded) {
            this.isscreenLoaded = true;
        }
    }
    /**
     * @description Method to load options
     */
    @api triggerValues() {
        if (!this.isSelectedItem && this.valuesDefault && typeof this.valuesDefault == 'string') {
            this.values = [];
            const valuesSplit = this.valuesDefault?.split(';');

            this.optionData.forEach(option => {
                option.selected = false;
                if (this.isOptionSelected(option, valuesSplit)) {
                    this.updateValues(option);
                    option.selected = true;
                }
            });
        }
    }
    /**
     * @description Method to load isOptionSelected
     */
    isOptionSelected(option, valuesSplit) {
        return valuesSplit.includes(option.value) && this.multiSelect;
    }
    /**
     * @description Method to updateValues
     */
    updateValues(option) {
        const validLabels = [
            'Select multi combobox',
            'How do you intend to fund the future deposits?',
            'What is the reason for opening an account in this location?',
            'What is the reason for opening an account in this jurisdiction?',
            'What is the purpose of opening your account?',
            'Select multi combobox of assests',
            'Please select one or more countries'
        ];

        if (validLabels.includes(this.label)) {
            if (this.values.includes(option.value)) {
                this.values.splice(this.values.indexOf(option.value), 1);
            } else {
                this.values.push(option.value);
            }
        }
    }



}