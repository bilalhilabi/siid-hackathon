public class ApexClassUseCase5 {

    public static boolean relationship(String AccountName, String ContactName){
       Boolean relation = false;
        	if(AccountName != null && ContactName != null){
          		List<Account> acclist =  [Select id from Account Where Name = :AccountName];
            		if( acclist.size() >0){
               			 List<Contact> conlist =[Select id,LastName from Contact Where AccountId = :acclist[0].id AND LastName = :ContactName];
                			if(conlist.size() ==1){
                   				 relation  = true;
             				}
           			}
        	}
       return relation;               
    }
}