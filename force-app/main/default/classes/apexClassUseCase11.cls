public class apexClassUseCase11 {
    public static String fullFormSearch(String acronym){
         List<Full_forms_with_Acronym__c> cusSetList = [ Select id, Name, Full_form__c from Full_forms_with_Acronym__c where Name =: acronym Limit 1];
        if(cusSetList.Size() == 1){
            return cusSetList[0].Full_form__c ;
        }
        return 'Not Found';
    }
}