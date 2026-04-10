import { LightningElement } from 'lwc';

export default class IFrameYutube extends LightningElement {

    start=0;
    end=4;
    threeArray=[];

    cards =[
       {
        id:1,
        link:'https://www.youtube.com/embed/XZwBNDGuWGU?si=gTKojlLmRb3HRcod'
       },
       {
        id:2,
        link:'https://www.youtube.com/embed/1w7eWrowb1s?si=O_1Zd5t_NK7OhxZL'
       },
       {
        id:3,
        link:'https://www.youtube.com/embed/goK4hKZ742w?si=rVs0Kw4nahvquUyH'
       },
        {
        id:4,
        link:'https://www.youtube.com/embed/ZqQHEKDaFys?si=4BXuylalbHmw967l'
       },
        {
        id:5,
        link:'https://www.youtube.com/embed/lJCUC0mRkPo?si=81LbCvsYFG_7Tjx0'
       },
        {
        id:6,
        link:'https://www.youtube.com/embed/XZwBNDGuWGU?si=gTKojlLmRb3HRcod'
       },
        {
        id:7,
        link:'https://www.youtube.com/embed/1w7eWrowb1s?si=O_1Zd5t_NK7OhxZL'
       },
        {
        id:8,
        link:'https://www.youtube.com/embed/ZqQHEKDaFys?si=4BXuylalbHmw967l'
       },
        {
        id:9,
        link:'https://www.youtube.com/embed/goK4hKZ742w?si=rVs0Kw4nahvquUyH'
       },
        {
        id:10,
        link:'https://www.youtube.com/embed/lJCUC0mRkPo?si=81LbCvsYFG_7Tjx0'
       }

    ];

    threeArray= this.cards.slice(this.start, this.end);

    handleNext(){
        if(!this.cards.hasOwnProperty(this.end)){
           this.threeArray= this.cards.slice(this.start, this.end); 
        }else{
        this.start=this.end;
         this.end=this.end+4;
         this.threeArray= this.cards.slice(this.start, this.end);
        }
       
    }

    handleBack(){

        if(this.start==0 && this.end==4){
            this.start=0;
            this.end=4;
            this.threeArray= this.cards.slice(this.start, this.end);
        }else{
        this.start = this.start-4;
        this.end = this.end-4;
        this.threeArray= this.cards.slice(this.start, this.end);
        }
        
    }
 
}