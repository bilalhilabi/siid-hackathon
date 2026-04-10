import { LightningElement } from 'lwc';
import uiImage from '@salesforce/resourceUrl/uiImage';
import fblogo from '@salesforce/resourceUrl/fblogo';
import twilogo from '@salesforce/resourceUrl/twilogo';


export default class UiDesign extends LightningElement {
    backgroundImageUrl = `background-image: url(${uiImage});`;
    logoUrl = fblogo;
    logoUrl1 = twilogo;

    cards = [
        {
            icon: 'utility:cart',
            iconColor: '#9b59b6',
            category: 'E-COMMERCE',
            title: 'Finding jeans that fit',
            description: 'Shopping for jeans and other form-fitting apparel online could be tricky.',
            buttonLabel: 'DETAILS'
        },
        {
            icon: 'utility:home',
            iconColor: '#e74c3c', 
            category: 'SMART HOME',
            title: 'When pets are home alone',
            description: 'We still need to leave home to go to work or run errands.',
            buttonLabel: 'DETAILS'
        },
        {
            icon: 'utility:travel_and_places',
            category: 'TRANSPORTATION',
            title: 'Wake up, this is your stop',
            description: 'Have you ever tried to take a short nap on the train only to wake up and miss your',
            buttonLabel: 'DETAILS'
        },
        // Add more cards as needed

        {
            icon: 'utility:checklist',
            category: 'PRODUCTIVITY',
            title: 'Distraction is everywhere!',
            description: 'We’re constantly fighting distractions and procrastinations when we’re',
            buttonLabel: 'DETAILS'
        },
        {
            icon: 'utility:heart',
            category: 'HEALTH & FITNESS',
            title: 'Go out and make a new friend',
            description: 'Friends keep us company through the ups and downs of our lives and help',
            buttonLabel: 'DETAILS'
        },
        {
            icon: 'utility:knowledge_based',
            category: 'EDUCATION',
            title: 'Survival language lessons',
            description: 'Ever need to travel to a country where you don’t even know how to speak the',
            buttonLabel: 'DETAILS'
        },

        {
            icon: 'utility:chat',
            category: 'COMMUNICATION',
            title: 'A safe place to go through darkness together',
            description: 'Sometimes strangers who have gone through similar situations can give the',
            buttonLabel: 'DETAILS'
        },
        {
            icon: 'utility:home',
            category: 'FINTECH',
            title: 'Stop unwanted subscription fees together',
            description: 'It’s hard to keep track of all the products and services that we have',
            buttonLabel: 'DETAILS'
        },
        {    
            icon: 'utility:plane',
            category: 'TRAVEL',
            title: 'Acclimatize me now!',
            description: 'It’s one thing to know what the weather is like in your travel',
            buttonLabel: 'DETAILS'
        },


        {
            icon: 'utility:news',
            category: 'NEWS & MEDIA',
            title: 'Reading articles on the go',
            description: 'When we’re reading on the go, we often get interrupted by events such',
            buttonLabel: 'DETAILS'
        },
        {
            icon: 'utility:home',
            category: 'EDUCATION',
            title: 'Acing college entrance exams',
            description: 'Preparing for a test as important as college entrance exams can be',
            buttonLabel: 'DETAILS'
        },
        {
            icon: 'utility:plane',
            category: 'TRAVEL',
            title: 'Planning a multi-city vacation',
            description: 'A multi-city vacation sounds exciting to almost anyone. However, the',
            buttonLabel: 'DETAILS'
        },


        {
            icon: 'utility:cart',
            category: 'FINTECH',
            title: 'Overdue invoices suck!',
            description: 'Managing multiple clients and projects is a part of running a',
            buttonLabel: 'DETAILS'
        },
        {
            icon: 'utility:home',
            category: 'PRODUCTIVITY',
            title: 'Help job seekers create a glowing resume',
            description: 'It takes hours of editing for job seekers to create a layout for their',
            buttonLabel: 'DETAILS'
        },
        {
            icon: 'utility:cart',
            category: 'E-Commerce',
            title: 'Save sea turtles by reducing single-use packaging from online shopping',
            description: 'Every time someone orders a product online, a sea turtle dies ',
            buttonLabel: 'DETAILS'
        }

    ];

}