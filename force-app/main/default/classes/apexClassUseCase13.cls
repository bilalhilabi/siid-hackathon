public class apexClassUseCase13 {
    public static void getName(){
        //List<String> emptylist = new List<String>();
        List<Multiple_Email_Address__mdt> mdtList = [Select id, Email__c from Multiple_Email_Address__mdt];
        for(Multiple_Email_Address__mdt ppt:mdtlist){
            String emails= ppt.Email__c;
           String  beforePart = emails.substringBefore('@');
            List<String> splitList = beforePart.split('_');
            System.debug(splitList[0].capitalize()+ ' ' + splitList[1].capitalize());
        }
    }
}