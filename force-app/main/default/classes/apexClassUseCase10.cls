public class apexClassUseCase10 {
    public static String identifyPlant(String plantName){
          List<Plant_Information__mdt> mdtList = [Select id, MasterLabel,Plant_Type__c from Plant_Information__mdt where MasterLabel =: plantName Limit 1];
        if(mdtList.size() ==1){
            /*for(Plant_Information__mdt ppt:mdtList){
                 return ppt.Plant_Type__c;
            }*/
            return mdtlist[0].Plant_Type__c;
        }
        return 'Plant does not Exist';
    }
}